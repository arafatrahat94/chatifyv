"use client";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineFilter } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";

import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import moment from "moment";
const NotificationPageComponent = () => {
  const [activeAll, setActiveAll] = useState(true);
  const [activeFollow, setActiveFollow] = useState(false);
  const [activeLikes, setActiveLikes] = useState(false);
  const [activeComments, setActiveComments] = useState(false);
  const [activeMentions, setActiveMentions] = useState(false);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { user } = useAuth();
  const { data: AllCommentsUpdate = [], mutate } = useSWR(
    `/api/PostCommentLikedNotification/?email=${user?.email}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );
  const [showReadButton, setShowReadButton] = useState(true);
  const filter = AllCommentsUpdate.filter((x) => x.status === "unread");
  const handleMarkAsRead = () => {
    filter.map((y) => {
      fetch(`/api/PostCommentLikedNotification/?id=${y._id}`, {
        method: "PATCH",
      })
        .then((res) => res.json())
        .then((data) => {
          if (localStorage !== undefined) {
            localStorage?.setItem("Notifications", AllCommentsUpdate?.length);
          }
          console.log(data);
          setShowReadButton(false);
        });
    });
  };

  console.log(AllCommentsUpdate);
  return (
    <div className=" w-full">
      {/* filter modal */}
      <dialog id="my_modal_Notif" className="modal bg-black bg-opacity-25">
        <div className="modal-box p-0 md:p-6   dark:bg-primaryBgDark max-w-[400px] rounded-md ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-center flex items-center justify-center bg-purpleLightC hover:bg-purpleLightC btn-ghost absolute text-white right-2 top-2">
              <>
                <MdOutlineCancel />
              </>
            </button>
          </form>
          <h3 className="font-bold flex justify-center mt-6 text-purpleC dark:text-purpleLightC text-lg">
            Sort By
          </h3>
          <div className="flex items-center justify-center mx-2 mb-4">
            <div className="mt-2 grid grid-cols-2 justify-items-start gap-x-2 gap-y-2 w-full">
              <div className="flex w-full gap-y-1 flex-col">
                {" "}
                <button
                  onClick={() => {
                    setActiveAll(true);
                    setActiveFollow(false);
                    setActiveLikes(false);
                    setActiveComments(false);
                    setActiveMentions(false);
                  }}
                  className={`btn ${
                    activeAll &&
                    "bg-purpleLightC hover:bg-purpleLightC text-white"
                  } text-purpleLightC border-none `}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setActiveAll(false);
                    setActiveFollow(true);
                    setActiveLikes(false);
                    setActiveComments(false);
                    setActiveMentions(false);
                  }}
                  className={`btn ${
                    activeFollow &&
                    "bg-purpleLightC hover:bg-purpleLightC text-white"
                  } text-purpleLightC border-none `}
                >
                  Follow
                </button>
                <button
                  onClick={() => {
                    setActiveAll(false);
                    setActiveFollow(false);
                    setActiveLikes(true);
                    setActiveComments(false);
                    setActiveMentions(false);
                  }}
                  className={`btn ${
                    activeLikes &&
                    "bg-purpleLightC hover:bg-purpleLightC text-white"
                  } text-purpleLightC border-none`}
                >
                  Likes
                </button>
              </div>
              <div className="flex flex-col w-full gap-y-1">
                {" "}
                <button
                  onClick={() => {
                    setActiveAll(false);
                    setActiveFollow(false);
                    setActiveLikes(false);
                    setActiveComments(true);
                    setActiveMentions(false);
                  }}
                  className={`btn ${
                    activeComments &&
                    "bg-purpleLightC hover:bg-purpleLightC text-white"
                  } text-purpleLightC border-none`}
                >
                  Comments
                </button>
                <button
                  onClick={() => {
                    setActiveAll(false);
                    setActiveFollow(false);
                    setActiveLikes(false);
                    setActiveComments(false);
                    setActiveMentions(true);
                  }}
                  className={`btn ${
                    activeMentions &&
                    "bg-purpleLightC hover:bg-purpleLightC text-white"
                  }  text-purpleLightC border-none`}
                >
                  Mentions
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      <div
        className="w-full 
      "
      >
        <div className="my-[24px] dark:text-purpleLightC text-purpleC font-bold lg:mx-[14px]  flex justify-between items-center mx-[29px] text-xl">
          <span>Notification</span>{" "}
          <div className="flex items-center gap-x-3 justify-center ">
            <div className="">
              <div
                onClick={() =>
                  document.getElementById("my_modal_Notif").showModal()
                }
                tabIndex={0}
                className="btn  dark:text-purpleLightC text-purpleC text-xl"
              >
                <AiOutlineFilter />
              </div>
            </div>
            <Link
              href=""
              className="btn dark:text-purpleLightC text-purpleC text-xl  "
            >
              <IoSettingsSharp />
            </Link>
          </div>
        </div>
        {filter.length > 0 && (
          <button
            onClick={() => handleMarkAsRead()}
            className="mx-auto text-sm flex items-center justify-center bg-purpleLightC rounded-lg text-white w-[90%] py-2"
          >
            Mark As All Read
          </button>
        )}
      </div>

      <div>
        {AllCommentsUpdate?.map((x) => (
          <>
            {" "}
            <Link
              href={`/NOTIFICATIONS/${x.postId}`}
              className="mx-[17px] bg-secondaryBgLight dark:bg-secondaryBgDark flex justify-between items-center p-3 my-2 rounded-md"
            >
              <div className="flex items-center gap-x-2">
                <Image
                  src={
                    x.type === "like"
                      ? x?.likerProfilePic
                      : x?.CommenterProfileImg
                  }
                  width={500}
                  height={500}
                  alt="profile image"
                  className="rounded-[1rem] object-cover w-[54px] h-[54px]"
                ></Image>
                <div>
                  <h1 className="font-bold dark:text-purpleLightC text-purpleC">
                    {x.type === "like" ? x?.likerName : x?.CommenterName}
                  </h1>
                  <h1 className="text-sm">
                    {x.type === "like" ? (
                      <>liked your post</>
                    ) : (
                      <>commented on your post</>
                    )}{" "}
                    &nbsp;
                    <span className="me-2 dark:text-purpleLightC text-purpleC">
                      {moment(x?.time, "MMM Do YYYY, h:mm a")
                        .startOf("hour")
                        .fromNow()}
                    </span>
                  </h1>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default NotificationPageComponent;
