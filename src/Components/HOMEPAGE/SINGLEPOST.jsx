"use client";
import Dynamicimage from "@/Utilities/DynamicImage";

// import PhotoViews from "@/Utils/PhotoViews";
import { useMemo, useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";

import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";

import { FaHeart } from "react-icons/fa";
import PostInterection from "./PostInterection";
import Image from "next/image";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";
const SINGLEPOST = ({ datas }) => {
  let likesArray = useMemo(() => [], []);
  const [postData, setPostData] = useState(null);
  const { user } = useAuth();
  const [liked, setLiked] = useState(null);
  const [likedBy, setLikedBy] = useState(null);
  const singleData = () => {
    fetch(`/api/Post/${datas?._id}`)
      .then((res) => res.json())
      .then((sdata) => {
        console.log(sdata);
        setPostData(sdata);
        if (sdata) {
          sdata?.likes?.map((t) => {
            if (t.liker !== t.liker) {
              likesArray.push(t);
            }
          });
          sdata?.likes?.map((z) => {
            if (z.liker === user?._id) {
              setLiked(true);
            } else {
              setLiked(false);
            }
          });
        } else {
          setLiked(false);
        }
      });
    const filteringCheck = likesArray.filter((x) => x.liker !== user?._id);
    if (filteringCheck) {
      setLiked(false);
    } else if (filteringCheck !== true) {
      setLiked(true);
    }

    if (datas?._id) {
      fetch(`/api/Post/Liked?id=${datas?._id}`)
        .then((res) => res.json())
        .then((data) => {
          data?.map((x) => {
            if (x?._id === user?._id) {
              setLiked(true);
            }
          });
          setLikedBy(data);
        });
    }
  };
  useEffect(() => {
    singleData();
  }, []);

  const handleLove = () => {
    const newData = {
      liker: user?._id,
      likerEmail: user?.email,
      likerProfilePic: user?.profileImg,
      likerName: user?.userName,
    };

    if (!liked) {
      const filtering = likesArray.find((y) => y.liker === user?._id);
      if (!filtering) {
        likesArray.unshift(newData);
      }
      fetch(`/api/Post/${datas?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likesArray: likesArray }),
      })
        .then((res) => res.json())
        .then((data) => {
          singleData();
        });
    } else if (liked) {
      const filtered = likesArray.filter((x) => x.liker !== user?._id);
      fetch(`/api/Post/${datas?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likesArray: filtered }),
      })
        .then((res) => res.json())
        .then((data) => {
          // mutate("/api/Post");

          singleData();
        });
    }
  };
  const [commentShow, setCommentShow] = useState(false);
  const [likeShow, setlikeShow] = useState(false);
  return (
    <div className=" my-3  bg-secondaryBgLight dark:bg-secondaryBgDark rounded-lg">
      <div className="flex p-4 justify-between  rounded-lg">
        {/*profile */}
        <div className="flex justify-center gap-x-2 items-center">
          <div className="md:w-[60px] w-[45px] md:h-[60px]">
            {/* profile image */}
            <Image
              alt="profile image"
              width={100}
              height={100}
              className={"rounded-full ring ring-purpleC"}
              src={datas?.profileImg}
            ></Image>
          </div>

          <div className="">
            <h1
              data-tip={datas.name}
              className="font-bold text-grayC items-center  tooltip tooltip-top text-sm md:hidden dark:text-white flex"
            >
              {datas.name.length > 15
                ? datas.name.slice(0, 15) + "..."
                : datas.name}{" "}
              <div
                data-tip="verified account"
                id="verificationBadge"
                className="tooltip tooltip-bottom font-normal w-[17px] h-full mx-1"
              >
                {/* <Dynamicimage
                  width={100}
                  height={100}
                  rounded={"rounded-full "}
                  src={"https://i.ibb.co/02MPvt7/Vector.png"}
                ></Dynamicimage> */}
              </div>
            </h1>
            <h1 className="font-bold text-grayC items-center   hidden md:flex dark:text-white ">
              {datas.name}
              <div
                data-tip="verified account"
                id="verificationBadge"
                className="tooltip tooltip-bottom font-normal w-[17px] h-full mx-1"
              >
                {/* <Dynamicimage
                  width={100}
                  height={100}
                  rounded={"rounded-full "}
                  src={"https://i.ibb.co/02MPvt7/Vector.png"}
                ></Dynamicimage> */}
              </div>
            </h1>
            <h2 className="text-sm dark:text-white text-grayC opacity-90">
              {datas?.userId}
            </h2>
          </div>
        </div>

        <div className="flex text-postTextColor items-center gap-x-2">
          <h1 className="opacity-75">{datas?.uploadTime}</h1>
          <HiOutlineDotsCircleHorizontal className="text-2xl " />
        </div>
      </div>
      <div className="my-3 ">
        <h1
          className="px-4"
          dangerouslySetInnerHTML={{ __html: datas?.postText }}
          id="postText"
        ></h1>
        <div className="  mt-2 gap-x-2 flex xl:flex-row gap-y-2 flex-col object-center ">
          {datas.category === "postImage" && (
            <Image
              alt="postImage"
              width={1000}
              height={1000}
              className=" md:rounded-md lg:rounded-none w-full lg:w-[600px] md:w-[580px] mx-auto max-h-[300px] object-cover object-center"
              src={datas?.postImg}
            ></Image>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex mx-1 justify-between text-xl">
          <div className="flex gap-x-4 items-center">
            {" "}
            <div onClick={handleLove} className="flex gap-x-4 items-center">
              {" "}
              {/* <FaHeart /> */}
              {liked ? (
                <PiHeartFill className="text-purpleLightC" />
              ) : (
                <PiHeartDuotone />
              )}
            </div>
            {/* <FaHeart /> */}
            <button onClick={() => setCommentShow(!commentShow)}>
              <GoComment />
            </button>
          </div>
          <div className="text-2xl">
            <CiBookmark />
          </div>
        </div>
        <h1
          onClick={() => setlikeShow(!likeShow)}
          className="text-grayC dark:text-white opacity-80 my-1"
        >
          {postData?.likes?.length || 0} Liked
        </h1>

        {/* comment */}
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <div
          className={`my-2 ${
            commentShow === false && "hidden"
          } bg-gray-200 dark:bg-secondaryBgDark dark:border-darkborder border p-4 rounded-lg`}
        >
          <input
            className="input-bordered focus:outline-purpleC dark:focus:outline-none input w-full"
            type="text"
          />
          <div className="w-full justify-end mt-2  flex ">
            <button className="btn rounded-[3rem]   hover:bg-white bg-white dark:bg-purpleLightC focus:border  focus:border-purpleC text-purpleC dark:text-white w-[100px]">
              Comment
            </button>
          </div>
        </div>
      </div>
      {/* who liked post */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <div className="transform duration-300 ">
        {" "}
        {likeShow && postData?.likes?.length > 0 && (
          <div className="mx-4 mb-4 transition-all ease-in delay-200 duration-300 transform">
            {likedBy?.map((post, i) => (
              <>
                <div className="flex items-center gap-x-2" key={i}>
                  <div>
                    <Image
                      alt="profile image"
                      height={200}
                      width={200}
                      src={post.profileImg}
                      className="w-[40px] rounded-full h-[40px]"
                    ></Image>
                  </div>
                  <div>{post.userName}</div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SINGLEPOST;
