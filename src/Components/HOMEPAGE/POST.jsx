"use client";
import pictureImg from "@/Assets/textareabuttonimg/picture.png";
import microphoneImg from "@/Assets/textareabuttonimg/microphone.png";
import pollImg from "@/Assets/textareabuttonimg/poll.png";
import videoImg from "@/Assets/textareabuttonimg/video.png";

import Image from "next/image";
import { useRef, useState } from "react";

import { MdDelete } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import CustomToast from "../CustomizedToast/CustomToast";
import toast from "react-hot-toast";
import moment from "moment";
const POST = () => {
  const { user } = useAuth();
  const [postLater, setPostLater] = useState(false);
  const [posttext, setposttext] = useState();
  // post image container
  const [postImage, setPostImage] = useState("");
  const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_KEY}`;
  const formData = new FormData();
  const [postImageWillBeUploaded, setPostImageWillBeUploaded] = useState(null);
  const onImageChange = (event) => {
    console.log(event.target.files);

    setPostImageWillBeUploaded(event.target.files);
    if (event.target.files && event.target.files[0]) {
      setPostImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const [sharePostLoading, setSharePostLoading] = useState(false);
  const handlePost = () => {
    if (!user) {
      toast.error("Please Login First");
      return;
    }
    setSharePostLoading(true);
    let postInput = document.getElementById("postInput");
    const transformedValue = postInput.value
      .replace(/ /g, "&nbsp;")
      .replace(/\n/g, "<br/>");
    console.log(transformedValue);
    setposttext(transformedValue);
    // document.getElementById("postText").innerHTML = transformedValue;
    const newData = {
      email: user?.email,
      profileId: user?._id,
      profileImg: user?.profileImg,
      name: user?.userName,
      userId: user?.userId,
      uploadTime: moment().format("MMM Do"),
    };
    if (postImage.length > 0) {
      formData.append("image", postImageWillBeUploaded[0]);
      fetch(imgHostingUrl, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((idata) => {
          console.log(idata);

          const newData2 = {
            ...newData,
            postImg: idata.data.display_url,
            postText: transformedValue,
            category: "postImage",
          };

          fetch("/api/Post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData2),
          })
            .then((res) => res.json())
            .then((data) => {
              setSharePostLoading(false);
              setPostImage("");
              postInput.value = "";
              setPostImageWillBeUploaded(null);
              console.log(data);
              toast.success("Post Shared", {
                id: "postImage",
              });
            });
        });
    } else {
      const newData2 = {
        ...newData,
        postText: transformedValue,
        category: "postText",
      };

      fetch("/api/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData2),
      })
        .then((res) => res.json())
        .then((data) => {
          setSharePostLoading(false);
          setPostImage("");
          setPostImageWillBeUploaded(null);
          postInput.value = "";
          console.log(data);
          toast.success("Post Shared", {
            id: "postText",
          });
        });
    }
  };
  // video upload codes

  // const inputRef = useRef();

  // const [source, setSource] = useState();

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const url = URL.createObjectURL(file);
  //   setSource(url);
  // };

  // const handleChoose = (event) => {
  //   inputRef.current.click();
  // };
  return (
    <div className="my-4">
      {!sharePostLoading && (
        <div className="transition-all ease-out duration-300  text-primaryLight">
          {!postLater && (
            <div className="min-h-[180px] dark:bg-secondaryBgDark rounded-[1rem] bg-secondaryBgLight pb-1 border dark:border-none border-[#E4E4E4]">
              {/* TODO: this will be rich text editor */}
              <div className="textareaWrapper">
                <textarea
                  onClick={() => {
                    if (!user) {
                      toast.error("Please Login First", { id: "loginErro" });
                    }
                  }}
                  onKeyUp={(e) => {
                    let textarea = document.querySelector("textarea");
                    textarea.style.height = "63px";
                    let scHeight = textarea.scrollHeight;
                    textarea.style.height = `${scHeight}px`;
                  }}
                  id="postInput"
                  placeholder="Compose new post"
                  className={`border border-secondaryBgLight dark:border-secondaryBgDark  ${
                    postImage ? " rounded-b-none -mb-2" : "mb-4 rounded-b-none"
                  } bg-transparent dark:bg-primaryBgDark outline-none rounded-[1rem]  p-4   max-h-full min-h-[70px]`}
                ></textarea>
              </div>
              <div className="relative  flex items-center flex-col   justify-center">
                {postImage.length > 0 && (
                  <>
                    <Image
                      alt="postImage"
                      src={postImage}
                      width={1000}
                      className="border border-secondaryBgLight dark:border-primaryBgDark mb-6"
                      height={1000}
                    ></Image>
                    <input
                      disabled={!user && true}
                      onChange={onImageChange}
                      type="file"
                      className=" opacity-0 pb-4 w-[90%] h-full top-0 absolute z-1"
                    ></input>
                    <button
                      onClick={() => {
                        setPostImageWillBeUploaded(null);
                        setPostImage("");
                      }}
                      className="absolute text-xl right-1 bottom-[28px] bg-opacity-50 border-darkborder rounded-xl bg-white p-2 dark:bg-black    text-purpleC dark:text-purpleLightC"
                    >
                      <MdDelete />
                    </button>
                  </>
                )}
              </div>
              {/* TODO: post features */}
              <div className="flex -mt-4 py-1 left-6 gap-x-6 w-[80%] relative   ">
                <label className="hover:delay-300 hover:transition lg:hover:tooltip lg:hover:tooltip-bottom">
                  <Image
                    draggable={false}
                    src={pictureImg}
                    alt="picture"
                  ></Image>
                  <input
                    onChange={onImageChange}
                    type="file"
                    className="w-[20px] opacity-0 top-0 absolute z-1"
                  ></input>
                </label>
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
                  className="lg:px-6 mx-1 dark:text-purpleLightC text-purpleC  py-2 px-3 lg:text-base text-sm rounded-[4px]"
                >
                  POST LATER
                </button>
                <button
                  onClick={handlePost}
                  className="lg:px-10 bg-purpleC text-white px-5 lg:text-base text-sm dark:bg-purpleLightC py-2 rounded-[4px]"
                >
                  POST
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <CustomToast />
      {/* <div className="VideoInput">
        <input
          ref={inputRef}
          className="VideoInput_input"
          type="file"
          onChange={handleFileChange}
          accept=".mov,.mp4"
        />
        {!source && <button onClick={handleChoose}>Choose</button>}
        {source && (
          <video
            className="VideoInput_video"
            width="100%"
            height={300}
            controls
            src={source}
          />
        )}
        <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
      </div> */}
      {sharePostLoading && <progress className="progress w-full"></progress>}
    </div>
  );
};

export default POST;
