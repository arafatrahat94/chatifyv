"use client";

import Dynamicimage from "@/Utilities/DynamicImage";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const STORY = () => {
  const [storyImage, setStoryImage] = useState("");
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setStoryImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const { user } = useAuth();
  return (
    <div className=" mt-3 ">
      <h1 className="font-bold text-purpleLightC text-xl">Home</h1>

      <div className="flex my-[.5rem]">
        {/*TODO: this will be available if user is logged in  */}
        <div
          style={{ backgroundImage: `url(${user?.profileImg})` }}
          onClick={() => document.getElementById("my_modal_Story").showModal()}
          className="cursor-pointer h-[150px] w-[100px] md:w-[130px]
          md:h-[200px] rounded-lg mx-1 flex-shrink-0
          justify-center items-center flex"
        >
          <h1 className="flex justify-center items-center flex-col w-[44px] font-semibold text-center text-white">
            {" "}
            <FaPlus />
            Add Story
          </h1>
        </div>
        <div className="h-[150px] w-[100px] md:w-[130px] md:h-[200px]  rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
          {/*TODO: this will be dynamic loaded from the server of all stories */}
          <div
            style={{
              backgroundImage:
                'url("https://i.ibb.co/r4zvHSR/aruffffffa-electric-substation-in-brazil-4455d8d6-4ac9-4001-9225-3e6304fb03ed.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="object-cover h-full w-full rounded-lg flex flex-col justify-between"
          >
            <div className="h-[40px] w-[40px] bg-blue-400 m-1 rounded-full"></div>
            <h1 className="mx-2 pb-2  text-white">Person name</h1>
          </div>
        </div>

        {/* story post modal */}
        <dialog id="my_modal_Story" className="modal bg-black bg-opacity-25">
          <div className="modal-box   dark:bg-primaryBgDark max-w-[400px] rounded-md ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setStoryImage("")}
                className="btn btn-sm btn-circle text-center flex items-center justify-center bg-purpleLightC btn-ghost absolute text-white right-2 top-2"
              >
                <>
                  <MdOutlineCancel />
                </>
              </button>
            </form>
            <h3 className="font-bold flex justify-center mt-10  text-xl text-purpleC dark:text-purpleLightC">
              Add Story
            </h3>
            <label
              for="file"
              class=" min-h-[200px] min-w-[290px] flex flex-col  mt-3 gap-5 cursor-pointer items-center justify-center bg-white shadow-[0px_48px_35px_-48px_rgba(0,0,0,0.1)]  rounded-[10px] border-2 border-dashed border-[#cacaca]"
            >
              <div class="flex items-center justify-center h-full w-full object-cover">
                {storyImage.length > 0 ? (
                  <Image
                    src={storyImage}
                    alt=""
                    className="w-full object-cover rounded-[10px] h-full"
                    width={100}
                    height={100}
                  ></Image>
                ) : (
                  <div>
                    <svg
                      viewBox="0 0 24 24"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-20 fill-gray-600"
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
                      <span class="font-normal text-gray-600">
                        Click to upload image
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <input
                onChange={onImageChange}
                id="file"
                name="Inpfile"
                class="hidden z-1"
                type="file"
              />
            </label>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default STORY;
