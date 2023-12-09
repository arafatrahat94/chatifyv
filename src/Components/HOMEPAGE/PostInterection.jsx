"use client";

import { useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";

const PostInterection = () => {
  const [commentShow, setCommentShow] = useState(false);
  return (
    <div>
      <div className="flex mx-1 justify-between text-xl">
        <div className="flex gap-x-4 items-center">
          {" "}
          {/* <FaHeart /> */}
          <div className="text-2xl">
            <CiHeart />
          </div>
          <button onClick={() => setCommentShow(!commentShow)}>
            <GoComment />
          </button>
        </div>
        <div className="text-2xl">
          <CiBookmark />
        </div>
      </div>
      <h1 className="text-grayC dark:text-white opacity-80 my-1">
        122 Likes This
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
  );
};

export default PostInterection;
