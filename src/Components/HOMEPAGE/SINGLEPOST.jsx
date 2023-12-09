import Dynamicimage from "@/Utilities/DynamicImage";
import { CiBookmark } from "react-icons/ci";
// import PhotoViews from "@/Utils/PhotoViews";

import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { GoComment } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import PostInterection from "./PostInterection";

const SINGLEPOST = () => {
  return (
    <div className="p-5  bg-secondaryBgLight dark:bg-secondaryBgDark rounded-lg">
      <div className="flex justify-between  rounded-lg">
        {/*profile */}
        <div className="flex justify-center gap-x-2 items-center">
          <div className="md:w-[60px] w-[45px] md:h-[60px]">
            {/* profile image */}
            <Dynamicimage
              width={100}
              height={100}
              rounded={"rounded-full ring ring-purpleC"}
              src={"https://i.ibb.co/dJP56Tz/Ellipse-9.png"}
            ></Dynamicimage>
          </div>

          <div className="">
            <h1 className="font-bold text-grayC items-center dark:text-white flex">
              Profile Name{" "}
              <div
                data-tip="verified account"
                id="verificationBadge"
                className="tooltip tooltip-bottom font-normal w-[17px] h-full mx-1"
              >
                <Dynamicimage
                  width={100}
                  height={100}
                  rounded={"rounded-full "}
                  src={"https://i.ibb.co/02MPvt7/Vector.png"}
                ></Dynamicimage>
              </div>
            </h1>
            <h2 className="text-sm dark:text-white text-grayC opacity-90">
              @userId
            </h2>
          </div>
        </div>

        <div className="flex text-postTextColor items-center gap-x-2">
          <h1 className="opacity-75">March 24</h1>
          <HiOutlineDotsCircleHorizontal className="text-2xl " />
        </div>
      </div>
      <div className="my-3 ">
        <h1>POST Text</h1>
        <div className="  mt-2 gap-x-2 flex xl:flex-row gap-y-2 flex-col object-center ">
          <Dynamicimage
            width={1000}
            height={1000}
            rounded={
              "rounded-md w-[300px] lg:w-[600px] md:w-[580px] mx-auto lg:h-[300px] object-cover object-center"
            }
            src={"https://i.ibb.co/rkPmffh/unsplash-CE-1-ZBQ-Ns.png"}
          ></Dynamicimage>
        </div>
      </div>
      <PostInterection></PostInterection>
    </div>
  );
};

export default SINGLEPOST;
