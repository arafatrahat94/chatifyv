import Dynamicimage from "@/Utilities/DynamicImage";
import { FaRegEdit, FaShareAlt } from "react-icons/fa";

const BannerAndProfilePic = () => {
  return (
    <div className=" relative">
      <div className="h-[110px] md:h-[177px] object-cover object-center mt-4">
        <Dynamicimage
          src="https://i.ibb.co/KW5WDK4/by-Pixel-Config-Creation20231024-194258704.jpg"
          width={500}
          height={500}
          rounded={"rounded-[1rem] h-full w-full object-cover"}
        ></Dynamicimage>
      </div>
      <div className="flex mt-2 items-center w-full   relative justify-between">
        <div className="flex gap-x-2 items-center">
          <div className="md:w-[90px] w-[70px] h-[70px] md:h-[90px] rounded-full  ms-3">
            <Dynamicimage
              src="https://i.ibb.co/KW5WDK4/by-Pixel-Config-Creation20231024-194258704.jpg"
              width={500}
              height={500}
              rounded={"rounded-full h-full w-full object-cover"}
            ></Dynamicimage>
          </div>
          <div>
            <h1 className="font-semibold text-purpleC dark:text-purpleLightC md:text-xl">
              Person Name
            </h1>
            <h2 className="italic text-sm text-grayC">@person</h2>
            <h2 className="text-xs text-black dark:text-grayC">
              240 Followers
            </h2>
          </div>
        </div>
        <div className="me-3 gap-x-1 flex items-center">
          <button className="md:px-6 px-4 md:py-2 h-[40px] bg-purpleC dark:bg-purpleLightC rounded-xl md:rounded-[1.5rem] flex justify-center items-center  text-white">
            <FaRegEdit />
            <span className="hidden md:block"> &nbsp;Edit</span>
          </button>
          <button className="md:px-6 px-4 py-2 bg-purpleC dark:bg-purpleLightC rounded-[1.5rem] flex justify-center items-center  text-white">
            <FaShareAlt /> &nbsp; <span className="hidden md:block">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerAndProfilePic;
