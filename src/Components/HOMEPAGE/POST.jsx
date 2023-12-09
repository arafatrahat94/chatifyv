"use client";
import pictureImg from "@/Assets/textareabuttonimg/picture.png";
import microphoneImg from "@/Assets/textareabuttonimg/microphone.png";
import pollImg from "@/Assets/textareabuttonimg/poll.png";
import videoImg from "@/Assets/textareabuttonimg/video.png";

import Image from "next/image";
import { useState } from "react";

const POST = () => {
  const [postLater, setPostLater] = useState(false);
  return (
    <div className="my-4">
      <div className="transition-all ease-out duration-300  text-primaryLight">
        {!postLater && (
          <div className="min-h-[193px] dark:bg-secondaryBgDark bg-secondaryBgLight border dark:border-grayC border-[#E4E4E4]">
            {/* TODO: this will be rich text editor */}
            <textarea
              placeholder="Compose new post"
              className="m-4 bg-transparent dark:bg-primaryBgDark outline-none rounded-md p-4 w-[307px] md:w-[95%] min-h-[107px]"
            ></textarea>
            {/* TODO: post features */}
            <div className="flex dark:bg-transparent py-1 gap-x-6 mx-6 relative -mt-[54px]  ">
              <button
                className="hover:delay-300 hover:transition hover:tooltip hover:tooltip-bottom"
                data-tip="add picture"
              >
                <Image draggable={false} src={pictureImg} alt="picture"></Image>
              </button>
              <button
                className="hover:delay-300 hover:transition hover:tooltip hover:tooltip-bottom"
                data-tip="add voice (v4:feature)"
              >
                <Image
                  draggable={false}
                  src={microphoneImg}
                  alt="picture"
                ></Image>
              </button>
              <button
                className="hover:delay-300 hover:transition hover:tooltip hover:tooltip-bottom"
                data-tip="add poll (v4:feature)"
              >
                <Image draggable={false} src={pollImg} alt="picture"></Image>
              </button>
              <button
                className="hover:delay-300 hover:transition hover:tooltip hover:tooltip-bottom"
                data-tip="add video (v4:feature)"
              >
                <Image draggable={false} src={videoImg} alt="picture"></Image>
              </button>
            </div>
            {/* TODO: post button */}
            <div className="flex justify-end m-4">
              <button
                onClick={() => setPostLater(true)}
                className="px-6 mx-1 dark:text-purpleLightC text-purpleC  py-2 rounded-[4px]"
              >
                POST LATER
              </button>
              <button className="px-10 bg-purpleC text-white dark:bg-purpleLightC py-2 rounded-[4px]">
                POST
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POST;
