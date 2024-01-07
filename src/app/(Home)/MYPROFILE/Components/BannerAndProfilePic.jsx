"use client";
import CustomToast from "@/Components/CustomizedToast/CustomToast";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import { FiSave } from "react-icons/fi";
import { useSWRConfig } from "swr";
const BannerAndProfilePic = () => {
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_KEY}`;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { mutate } = useSWRConfig();

  const [editShow, setEditShow] = useState(false);
  const [bannerImageShow, setBannerImageShow] = useState(null);
  const [ProfileImageShow, setProfileImageShow] = useState(null);
  const [BannerImageWillBeUploaded, setBannerImageWillBeUploaded] =
    useState(null);
  const [ProfileImageWillBeUploaded, setProfileImageWillBeUploaded] =
    useState(null);
  const onImageChange = (event) => {
    setBannerImageWillBeUploaded(event.target.files);
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      setBannerImageShow(URL.createObjectURL(event.target.files[0]));
    }
  };
  const onImageChange2 = (event) => {
    console.log(event.target.files);
    setProfileImageWillBeUploaded(event.target.files);
    if (event.target.files && event.target.files[0]) {
      setProfileImageShow(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [imgCoverloader, seImgCoverLoader] = useState(false);
  // const [loader, serLoader] = useState(false);

  let newData;
  let newData2 = {
    email: user?.email,
    profileId: user?._id,
    name: user?.userName,
    userId: user?.userId,
    uploadTime: moment().format("MMM Do"),
  };
  const handleImgCHange = () => {
    const formData = new FormData();
    if (
      BannerImageWillBeUploaded !== null &&
      ProfileImageWillBeUploaded === null
    ) {
      formData.append("image", BannerImageWillBeUploaded[0]);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const CoverimgUrl = data.data.url;
          newData = {
            coverImg: CoverimgUrl,
            profileImg: user?.profileImg,
          };
          const newData3 = {
            ...newData2,
            postImg: CoverimgUrl,
            profileImg: user?.profileImg,
            postText: "updated cover picture",
            category: "postImage",
          };
          fetch("/api/Post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData3),
          })
            .then((res) => res.json())
            .then((data) => {});
          uploadNowImg();
        });
    }
    if (
      ProfileImageWillBeUploaded !== null &&
      BannerImageWillBeUploaded === null
    ) {
      formData.append("image", ProfileImageWillBeUploaded[0]);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const ProfileImgUrl = data.data.url;
          newData = { profileImg: ProfileImgUrl, coverImg: user?.coverImg };
          const newData3 = {
            ...newData2,
            postImg: ProfileImgUrl,
            postText: "updated profile picture",
            category: "postImage",
            profileImg: ProfileImgUrl,
          };
          fetch("/api/Post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData3),
          })
            .then((res) => res.json())
            .then((data) => {});
          console.log(data);
          uploadNowImg();
        });
      console.log(newData);
    }
    if (
      ProfileImageWillBeUploaded !== null &&
      BannerImageWillBeUploaded !== null
    ) {
      formData.append("image", BannerImageWillBeUploaded[0]);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const CoverimgUrl = data.data.url;
          newData = { coverImg: CoverimgUrl };
          const newData3 = {
            ...newData2,
            postImg: CoverimgUrl,
            postText: "updated cover picture",
            category: "postImage",
            profileImg: user?.profileImg,
          };
          fetch("/api/Post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData3),
          })
            .then((res) => res.json())
            .then((data) => {});
          console.log(data);
        });
      formData.append("image", ProfileImageWillBeUploaded[0]);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const ProfileImgUrl = data.data.url;
          newData = { ...newData, profileImg: ProfileImgUrl };
          console.log(data);
          console.log(newData);
          const newData4 = {
            ...newData2,
            postImg: ProfileImgUrl,
            postText: "updated profile picture",
            category: "postImage",
            profileImg: ProfileImgUrl,
          };
          fetch("/api/Post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData4),
          })
            .then((res) => res.json())
            .then((data) => {});
          uploadNowImg();
        });
    }

    if (
      newData === undefined &&
      ProfileImageShow === null &&
      bannerImageShow === null
    ) {
      toast.error("Nothing Changed", {
        id: "nothingChanged",
      });
      return setEditShow(false);
    }
  };
  const uploadNowImg = () => {
    fetch(`/api/ProfilePic?email=${user?.email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Profile and Cover Image Updated", {
          id: "profileAndCoverImageUpdated",
        });

        setBannerImageShow(null);
        setBannerImageWillBeUploaded(null);
        setProfileImageShow(null);
        setProfileImageWillBeUploaded(null);
        setEditShow(false);
        mutate("/api/NewUser");
        newData = null;
      });
  };
  return (
    <div className=" relative">
      <div>
        <div className="h-[110px] md:h-[177px] object-cover object-center mt-4 relative">
          {user?.coverImg && user?.coverImg !== "" ? (
            <Image
              alt="coverImage"
              src={user?.coverImg !== null && user?.coverImg}
              width={500}
              height={500}
              className="rounded-[1rem] h-full w-full object-cover"
            ></Image>
          ) : (
            <>
              <div
                className={`h-[110px] md:h-[177px] absolute w-full ${
                  bannerImageShow !== null && "bg-purpleLightC"
                } bg-opacity-40 rounded-[1rem] top-0 z-10`}
              >
                <div className="h-[110px] md:h-[177px] absolute w-full  rounded-[1rem] top-0 z-10">
                  {" "}
                  {bannerImageShow !== null && (
                    <FcPicture className="text-3xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                  {editShow && (
                    <input
                      onChange={onImageChange}
                      type="file"
                      className="w-full absolute h-full top-0 opacity-0"
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {editShow && (
            <div className="h-[110px] md:h-[177px] absolute w-full bg-purpleLightC bg-opacity-40 rounded-[1rem] top-0 z-10">
              {bannerImageShow === null && (
                <FcPicture className="text-3xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              {bannerImageShow !== null && (
                <Image
                  alt="coverImage"
                  src={bannerImageShow}
                  width={500}
                  height={500}
                  className="rounded-[1rem] h-full w-full object-cover"
                ></Image>
              )}

              <div className="h-[110px] md:h-[177px] absolute w-full  rounded-[1rem] top-0 z-10">
                {editShow && (
                  <input
                    onChange={onImageChange}
                    type="file"
                    className="w-full absolute h-full top-0 opacity-0"
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex mt-2 items-center w-full   relative justify-between">
          <div className="flex gap-x-2 items-center">
            <div className="md:w-[90px] w-[70px] h-[70px] md:h-[90px] rounded-full relative ms-3">
              <Image
                alt="profileImg"
                src={user?.profileImg !== null && user?.profileImg}
                width={500}
                height={500}
                className="rounded-full h-full w-full object-cover"
              ></Image>

              {editShow && (
                <div
                  className={` absolute w-full bg-purpleLightC bg-opacity-40 rounded-full h-full top-0 z-10`}
                >
                  <FcPicture className="text-3xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <input
                    onChange={onImageChange2}
                    type="file"
                    className="w-full z-10 top-0 absolute h-full opacity-0"
                  />
                  {ProfileImageShow !== null && (
                    <>
                      <Image
                        alt="profileImg"
                        src={ProfileImageShow}
                        width={500}
                        height={500}
                        className="rounded-full h-full w-full object-cover absolute top-0"
                      ></Image>
                      <input
                        onChange={onImageChange2}
                        type="file"
                        className="w-full top-0 absolute h-full opacity-0"
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            <div>
              <h1 className="font-semibold text-purpleC dark:text-purpleLightC hidden md:block md:text-xl">
                {user?.userName}
              </h1>
              <h1
                data-tip={user?.userName}
                className="font-semibold tooltip tooltip-bottom md:hidden text-purpleC dark:text-purpleLightC md:text-xl"
              >
                {user?.userName?.length > 12 &&
                  user?.userName.slice(0, 12) + "..."}
              </h1>
              <h2 className="italic text-sm text-grayC">{user?.userId}</h2>
              <h2 className="text-xs text-black dark:text-grayC">
                240 Followers
              </h2>
            </div>
          </div>
          <div className="me-3 gap-x-1 flex items-center">
            {editShow === false ? (
              <button
                type="button"
                onClick={() => setEditShow(!editShow)}
                className="md:px-6 px-4 md:py-2 h-[40px] bg-purpleC dark:bg-purpleLightC rounded-xl md:rounded-[1.5rem] flex justify-center items-center  text-white"
              >
                <FaRegEdit />
                <span className="hidden md:block"> &nbsp;Edit</span>
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  onClick={() => handleImgCHange()}
                  className="md:px-6 px-4 md:py-2 h-[40px] bg-purpleC dark:bg-purpleLightC rounded-xl md:rounded-[1.5rem] flex justify-center items-center  text-white"
                >
                  <FiSave />
                  <span className="hidden md:block"> &nbsp;Save</span>
                </button>
              </>
            )}
            <button
              type="button"
              className="md:px-6 px-4 py-2 bg-purpleC dark:bg-purpleLightC rounded-[1.5rem] flex justify-center items-center  text-white"
            >
              <FaShareAlt /> &nbsp;{" "}
              <span className="hidden md:block">Share</span>
            </button>
          </div>
        </div>
      </div>
      <CustomToast />
    </div>
  );
};

export default BannerAndProfilePic;
