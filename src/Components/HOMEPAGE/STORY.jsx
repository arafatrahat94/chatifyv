"use client";

import app from "@/Firebase/firebase.config";
import Dynamicimage from "@/Utilities/DynamicImage";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus, FaShareAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { getAuth } from "firebase/auth";
const auth = getAuth(app);
const STORY = () => {
  let [usersStory, setUsersStory] = useState(null);
  // let [storyArray, setStoryArray] = useState([]);
  let storyArray = useMemo(() => [], []);
  const [allStory, setAllStory] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      fetch(`/api/Story?email=${user?.email}`, {
        next: {
          revalidate: 5,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (user && data !== null) {
            const { storyImage } = data.signedEmail;
            setAllStory(data.allUser);
            setUsersStory(data.signedEmail);
            if (storyImage !== undefined) {
              const filtering = storyImage.filter(
                (x) => x !== undefined || x !== null
              );
              filtering.map((y) => {
                if (!storyArray.includes(y)) {
                  storyArray.push(y);
                }
              });
            }
          }
          if (!user) {
            setAllStory(data);
          }
        });
    }
    if (!user) {
      fetch(`/api/Story`, {
        next: {
          revalidate: 5,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data !== null) {
            setAllStory(data);
          }
        });
    }
  }, [user, storyArray]);

  console.log(allStory);
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_KEY}`;
  const formData = new FormData();

  const [storyImage, setStoryImage] = useState("");
  const [storyShare, setStoryShare] = useState(null);
  // formData.append("image", event.target.files[0]);
  const onImageChange = (event) => {
    console.log(event.target.files);
    setStoryShare(event.target.files);

    if (event.target.files && event.target.files[0]) {
      setStoryImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [shareStoryLoading, setShareStoryLoading] = useState(false);
  const handleShareImg = () => {
    setShareStoryLoading(true);
    document.getElementById("my_modal_Story").close();
    formData.append("image", storyShare[0]);
    console.log(formData);

    fetch(imgHostingUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((idata) => {
        console.log(idata);
        if (idata.data?.display_url !== null) {
          storyArray.unshift(idata.data.display_url);
        }

        const newData = {
          email: user?.email,
          profileId: user?._id,
          profileImg: user?.profileImg,
          name: user?.userName,
          storyImage: storyArray,
        };

        fetch("/api/Story", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success("Story Shared");
            setShareStoryLoading(false);

            fetch(`/api/Story?email=${user?.email}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (user && data !== null) {
                  const { storyImage } = data.signedEmail;
                  setAllStory(data.allUser);
                  setUsersStory(data.signedEmail);
                  if (storyImage !== undefined) {
                    const filtering = storyImage.filter(
                      (x) => x !== undefined || x !== null
                    );
                    filtering.map((y) => {
                      if (!storyArray.includes(y)) {
                        storyArray.push(y);
                      }
                    });
                  }
                }
                if (!user) {
                  setAllStory(data);
                }
              });
            setStoryImage("");
            toast.success("Story Shared");
            setShareStoryLoading(false);
          });
      });
  };

  return (
    <div className=" mt-3 ">
      <h1 className="font-bold text-purpleLightC text-xl">Home</h1>

      <div className="flex my-[.5rem] overflow-scroll no-scrollbar">
        {/*TODO: this will be available if user is logged in  */}
        {user && (
          <div
            style={{ backgroundImage: `url(${user?.profileImg})` }}
            onClick={() =>
              document.getElementById("my_modal_Story").showModal()
            }
            className={`${
              !user && "hidden"
            }cursor-pointer h-[150px] w-[100px] md:w-[130px]
          md:h-[200px] rounded-lg mx-1 flex-shrink-0
          justify-center items-center flex`}
          >
            <h1 className="flex justify-center items-center flex-col w-[44px] font-semibold text-center text-white">
              {" "}
              <FaPlus />
              Add Story
            </h1>
          </div>
        )}
        {/* user story image */}
        {usersStory !== null && user !== null && (
          <div className="h-[150px] w-[100px] md:w-[130px] md:h-[200px]  rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
            <div
              style={{
                backgroundImage: `url(${
                  usersStory !== null ? usersStory?.storyImage[0] : ""
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="object-cover h-full w-full rounded-lg flex flex-col justify-between"
            >
              <div className="h-[40px] w-[40px]  m-1 rounded-full">
                <Image
                  src={user?.profileImg}
                  className="rounded-full w-full h-full object-cover object-center "
                  alt="profile image"
                  width={500}
                  height={500}
                ></Image>
              </div>
              <h1 className="mx-2 pb-2  text-white">{user?.userName}</h1>
            </div>
          </div>
        )}
        <div className="flex">
          {allStory?.map((y) => (
            <>
              <div className="h-[150px] w-[100px] md:w-[130px] md:h-[200px]  rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
                {/*TODO: this will be dynamic loaded from the server of all stories */}
                <div
                  style={{
                    backgroundImage: `url(${
                      y?.storyImage !== null && y?.storyImage[0]
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="object-cover h-full w-full rounded-lg flex flex-col justify-between"
                >
                  <div className="h-[40px] w-[40px] m-1 rounded-full">
                    {" "}
                    <Image
                      src={y?.profileImg}
                      className="rounded-full w-full h-full object-cover object-center "
                      alt="profile image"
                      width={500}
                      height={500}
                    ></Image>
                  </div>
                  <h1 className="mx-2 pb-2  text-white">{y?.name}</h1>
                </div>
              </div>
            </>
          ))}
        </div>

        {/* story post modal */}
        <dialog id="my_modal_Story" className="modal bg-black bg-opacity-25">
          <div className="min-h-screen p-5 bg-white  dark:bg-primaryBgDark flex justify-center flex-col min-w-full items-center rounded-md ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setStoryImage("")}
                className="btn btn-sm btn-circle text-center flex items-center  z-20 justify-center bg-purpleLightC btn-ghost absolute text-white right-4 top-4"
              >
                <>
                  <MdOutlineCancel />
                </>
              </button>
            </form>

            <label
              for="file"
              class={`${
                storyImage
                  ? " mt-7"
                  : " shadow-[0px_48px_35px_-48px_rgba(0,0,0,0.1)] lg:max-w-[700px] md:mx-auto  rounded-[10px]  mx-5"
              } min-h-[70vh] md:min-w-[600px] xl:w-[900px] lg:w-[800px]  min-w-[290px] flex flex-col  mt-3 gap-5 cursor-pointer items-center justify-center  `}
            >
              <div class="flex items-center justify-center h-full w-full  object-cover">
                {storyImage?.length > 0 ? (
                  <Image
                    src={storyImage}
                    alt=""
                    className="w-full max-h-[80vh] md:object-scale-down flex items-center justify-center object-contain h-full "
                    width={100}
                    height={100}
                  ></Image>
                ) : (
                  <div className="flex items-center justify-center flex-col">
                    <svg
                      viewBox="0 0 24 24"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-24 w-full flex items-center justify-center dark:fill-purpleLightC fill-purpleC"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                    <div class="flex items-center justify-center">
                      <span class="font-normal text-purpleC dark:text-purpleLightC">
                        Click to upload image
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <form>
                <input
                  onChange={onImageChange}
                  id="file"
                  name="Inpfile"
                  class="hidden z-1"
                  type="file"
                />
              </form>
            </label>
            <button
              onClick={handleShareImg}
              className="md:px-6 px-4 py-2 bg-purpleC dark:bg-purpleLightC rounded-[1.5rem] flex justify-center mx-auto w-[80px] md:w-[150px] items-center  text-white"
            >
              <FaShareAlt /> &nbsp;{" "}
              <span className="hidden md:block">Share</span>
            </button>
          </div>
        </dialog>
      </div>
      {shareStoryLoading && <progress className="progress w-full"></progress>}
      <Toaster
        toastOptions={{
          className: "bg-toast",
        }}
        position="bottom-center"
      />
    </div>
  );
};

export default STORY;
