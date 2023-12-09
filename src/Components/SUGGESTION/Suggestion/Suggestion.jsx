"use client";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
const Suggestion = () => {
  return (
    <div className="mx-[17px] mt-[24px]">
      <div className="flex justify-between font-semibold text-purpleC dark:text-purpleLightC">
        <h1>Suggestion</h1>
        <button>See All</button>
      </div>

      <div
        style={{
          backgroundImage: `url('https://i.ibb.co/HFvvRnG/aruffffffa-electric-substation-in-brazil-4455d8d6-4ac9-4001-9225-3e6304fb03ed.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className={`h-[120px] my-[24px] flex justify-center  bg-black flex-col bg-opacity-30 relative rounded-md`}
      >
        <div
          className={`h-[120px] my-[24px] flex justify-center z-0 bg-black flex-col bg-opacity-20 absolute w-full rounded-md`}
        ></div>
        <div className="px-5 z-10">
          <div
            style={{
              backgroundImage: `url('https://i.ibb.co/Br2RfDF/Dark-Green-Minimalist-Aesthetic-Modern-Paper-Texture-Brand-Fashion-Logo-17.png')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-full h-[60px] w-[60px] object-cover bg-white"
          ></div>
          <h1 className="font-bold flex items-center gap-x-1 text-sm text-white">
            User Name
            <MdVerified className="text-indigo-300" />
          </h1>
          <p className="text-white font-semibold text-xs italic opacity-90">
            @Userid
          </p>
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
