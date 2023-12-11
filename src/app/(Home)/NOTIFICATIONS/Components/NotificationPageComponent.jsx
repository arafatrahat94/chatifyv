"use client";
import Link from "next/link";
import { IoSettingsSharp } from "react-icons/io5";
import { AiOutlineFilter } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
const NotificationPageComponent = () => {
  const [activeAll, setActiveAll] = useState(true);
  const [activeFollow, setActiveFollow] = useState(false);
  const [activeLikes, setActiveLikes] = useState(false);
  const [activeComments, setActiveComments] = useState(false);
  const [activeMentions, setActiveMentions] = useState(false);

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
            <div className="mt-2 flex flex-wrap justify-items-start gap-x-2 gap-y-2 w-full">
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
                className="btn p-0 dark:text-purpleLightC text-purpleC text-xl"
              >
                <AiOutlineFilter />
              </div>
              {/* <ul
                tabIndex={0}
                className="dropdown-content  flex justify-center  z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul> */}
            </div>
            <Link
              href=""
              className="btn dark:text-purpleLightC text-purpleC text-xl p-0 "
            >
              <IoSettingsSharp />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPageComponent;
