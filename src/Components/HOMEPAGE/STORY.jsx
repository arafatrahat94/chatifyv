"use client";

import Dynamicimage from "@/Utilities/DynamicImage";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const STORY = () => {
  return (
    <div className=" mt-3 ">
      <h1 className="font-bold text-purpleLightC text-xl">Home</h1>

      <div className="flex my-[.5rem]">
        {/*TODO: this will be available if user is logged in  */}
        <div className="cursor-pointer h-[150px] w-[100px] md:w-[130px] md:h-[200px] bg-purpleLightC rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
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
      </div>
    </div>
  );
};

export default STORY;
