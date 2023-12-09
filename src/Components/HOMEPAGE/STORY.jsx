import Dynamicimage from "@/Utilities/DynamicImage";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

const STORY = () => {
  return (
    <div className=" mt-3 ">
      <h1 className="font-bold text-purpleLightC text-xl">Home</h1>

      <div className="flex my-[.5rem]">
        {/*TODO: this will be available if user is logged in  */}
        <div className="w-[76px] h-[91px] bg-purpleLightC rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
          <h1 className="flex justify-center items-center flex-col w-[44px] font-semibold text-center text-white">
            {" "}
            <FaPlus />
            Add Story
          </h1>
        </div>
        <div className="w-[76px] h-[91px]  rounded-lg mx-1 flex-shrink-0  justify-center items-center flex">
          {/*TODO: this will be dynamic loaded from the server of all stories */}
          <div className="object-cover h-full w-full rounded-lg">
            <Dynamicimage
              src={
                "https://i.ibb.co/r4zvHSR/aruffffffa-electric-substation-in-brazil-4455d8d6-4ac9-4001-9225-3e6304fb03ed.png"
              }
              rounded={"rounded-lg h-full w-full object-cover"}
              width={100}
              height={100}
            ></Dynamicimage>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STORY;
