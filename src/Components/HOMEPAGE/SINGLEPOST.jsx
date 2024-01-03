"use client";
import Dynamicimage from "@/Utilities/DynamicImage";

// import PhotoViews from "@/Utils/PhotoViews";
import { useMemo, useState } from "react";
import { CiBookmark, CiHeart } from "react-icons/ci";

import { HiOutlineDotsCircleHorizontal, HiOutlineTrash } from "react-icons/hi";
import { GoComment } from "react-icons/go";

import { FaHeart } from "react-icons/fa";
import PostInterection from "./PostInterection";
import Image from "next/image";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import { PiHeartDuotone, PiHeartFill } from "react-icons/pi";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { TbBrandTelegram } from "react-icons/tb";
import toast from "react-hot-toast";
import CustomToast from "../CustomizedToast/CustomToast";
import useSWR from "swr";
import Link from "next/link";
import moment from "moment";

const SINGLEPOST = ({ datas }) => {
  let likesArray = useMemo(() => [], []);
  const [postData, setPostData] = useState(null);
  const { user } = useAuth();
  const [liked, setLiked] = useState(null);
  // const [likedBy, setLikedBy] = useState(null);
  // const [postComments, setPostComments] = useState(null);
  const [commentShow, setCommentShow] = useState(false);
  const [likeShow, setlikeShow] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: likedBy = [], mutate } = useSWR(
    `/api/PostLiked?id=${datas?._id}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );
  const { data: postComments = [] } = useSWR(
    `/api/PostComment?id=${datas._id}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  // const fetchCommens = () => {
  //   fetch(`/api/PostComment?id=${datas._id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.length > 0) {
  //         console.log(data);
  //         setPostComments(data);
  //       }
  //     });
  // };

  const singleData = () => {
    fetch(`/api/Post/${datas?._id}`)
      .then((res) => res.json())
      .then((sdata) => {
        setPostData(sdata);
        if (sdata) {
          sdata?.likes?.map((t) => {
            if (t.liker !== t.liker) {
              likesArray.push(t);
            }
          });
          sdata?.likes?.map((z) => {
            if (z.liker === user?._id) {
              setLiked(true);
            } else {
              setLiked(false);
            }
          });
        } else {
          setLiked(false);
        }
      });
    if (likedBy.length > 0) {
      likedBy?.map((x) => {
        if (x?._id === user?._id) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
    }
    const filteringCheck = likesArray.filter((x) => x.liker !== user?._id);
    if (filteringCheck) {
      setLiked(false);
    } else if (filteringCheck !== true) {
      setLiked(true);
    }
  };
  useEffect(() => {
    singleData();
    setTimeout(() => {
      if (likedBy.length > 0) {
        likedBy?.map((x) => {
          if (x?._id === user?._id) {
            setLiked(true);
          } else {
            setLiked(false);
          }
        });
      }
    }, 2000);
  }, []);

  const handleLove = () => {
    const newData = {
      liker: user?._id,
      likerEmail: user?.email,
      likerProfilePic: user?.profileImg,
      likerName: user?.userName,
      posterEmail: datas?.email,
    };

    if (!liked) {
      const filtering = likesArray.find((y) => y.liker === user?._id);
      if (!filtering) {
        likesArray.unshift(newData);
      }
      fetch(`/api/Post/${datas?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likesArray: likesArray }),
      })
        .then((res) => res.json())
        .then((data) => {
          singleData();
          const newDataNotification = {
            ...newData,
            postId: datas?._id,
            type: "like",
            time: moment().format("MMM Do YYYY, h:mm a"),
            status: "unread",
          };
          fetch(`/api/PostCommentLikedNotification`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newDataNotification),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        });
    } else if (liked) {
      const filtered = likesArray.filter((x) => x.liker !== user?._id);
      fetch(`/api/Post/${datas?._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likesArray: filtered }),
      })
        .then((res) => res.json())
        .then((data) => {
          // mutate("/api/Post");
          const newDataNotification = {
            ...newData,
            postId: datas?._id,
            type: "like",
            time: moment().format("MMM Do YYYY, h:mm a"),
            status: "unread",
          };
          fetch(`/api/PostCommentLikedNotification`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newDataNotification),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
          singleData();
        });
    }
  };

  const handleComment = (e) => {
    const transformedValue = e.target.value
      .replace(/ /g, "&nbsp;")
      .replace(/\n/g, "<br/>");
    setCommentText(transformedValue);
    console.log(commentText);
  };
  const submitComment = () => {
    const newData = {
      CommenterEmail: user?.email,
      CommenterProfileId: user?._id,
      CommenterProfileImg: user?.profileImg,
      CommenterName: user?.userName,
      PostId: datas._id,
      commentText: commentText,
      posterEmail: datas?.email,
    };
    if (commentText === null || commentText === "") {
      toast.error("Please Type Comment", {
        id: "CommentAdd",
      });
      return;
    }
    fetch("/api/PostComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        const newDataNotification = {
          ...newData,
          postId: datas?._id,
          type: "comment",
          time: moment().format("MMM Do YYYY, h:mm a"),
          status: "unread",
        };
        fetch(`/api/PostCommentLikedNotification`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newDataNotification),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        document.getElementById("postInputA").value = "";
        toast.success("Comment Added", {
          id: "CommentAdded",
        });
        setCommentText(null);
        // fetchCommens();
      });
  };
  const handleCommentDelete = (id) => {
    const newData = {
      CommenterEmail: user?.email,
      CommenterProfileId: user?._id,
      CommenterProfileImg: user?.profileImg,
      CommenterName: user?.userName,
      PostId: datas._id,
      commentText: commentText,
      posterEmail: datas?.email,
    };
    fetch(`/api/PostComment?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const newDataNotification = {
          ...newData,
          postId: datas?._id,
          type: "comment",
          time: moment().format("MMM Do YYYY, h:mm a"),
          status: "unread",
        };
        fetch(`/api/PostCommentLikedNotification`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newDataNotification),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
        // fetchCommens();
        toast.success("Comment Deleted", {
          id: "CommentDeleted",
        });
        setTimeout(() => {
          toast.dismiss(id.CommentDeleted);
        }, 1000);
      });
  };
  const confirmDelete = (ids) => {
    toast((t) => (
      <span className="flex flex-col items-center justify-center text-xl">
        Are You Sure?
        <div className=" mt-3 flex gap-x-1 text-sm">
          <button
            className="bg-purpleLightC rounded-md py-2 px-3 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              handleCommentDelete(ids);
            }}
          >
            Delete Now
          </button>
          <button
            className="text-purpleLightC py-2 px-3"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };
  const handleDeletePost = (id) => {
    fetch(`/api/Post/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        toast.success("Post Deleted", {
          id: "POSTDeleted",
        });
        setTimeout(() => {
          toast.dismiss(id.POSTDeleted);
        }, 1000);
      });
  };
  const confirmDeletePost = (ids) => {
    toast((t) => (
      <span className="flex flex-col items-center justify-center text-xl">
        Are You Sure?
        <div className=" mt-3 flex gap-x-1 text-sm">
          <button
            className="bg-purpleLightC rounded-md py-2 px-3 text-white"
            onClick={() => {
              toast.dismiss(t.id);
              handleDeletePost(ids);
            }}
          >
            Delete Now
          </button>
          <button
            className="text-purpleLightC py-2 px-3"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };
  const savePost = () => {
    const newData = {
      UserEmail: user?.email,
      PostId: datas._id,
    };
    fetch(`/api/SavePost/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Post Saved", {
          id: "POSTSaved",
        });
      });
  };
  return (
    <div className=" my-3 border border-grayC border-opacity-5 dark:border-none bg-secondaryBgLight dark:bg-secondaryBgDark rounded-lg">
      <div className="flex p-4 justify-between  rounded-lg">
        {/*profile */}
        <Link
          href={`/${datas?.email}`}
          className="flex justify-center gap-x-2 items-center"
        >
          <div className="w-[60px]  h-[60px]">
            {/* profile image */}
            <Image
              alt="profile image"
              width={100}
              height={100}
              className={
                "rounded-full object-cover w-full h-full ring ring-purpleC"
              }
              src={datas?.profileImg}
            ></Image>
          </div>

          <div className="">
            <h1
              data-tip={datas?.name}
              className="font-bold text-grayC items-center  tooltip tooltip-top text-sm md:hidden dark:text-white flex"
            >
              {datas?.name?.length > 15
                ? datas?.name?.slice(0, 15) + "..."
                : datas?.name}{" "}
              <div
                data-tip="verified account"
                id="verificationBadge"
                className="tooltip tooltip-bottom font-normal w-[17px] h-full mx-1"
              >
                {/* <Image alt="verifiedImage"
                  width={100}
                  height={100}
                  rounded={"rounded-full "}
                  src={"https://i.ibb.co/02MPvt7/Vector.png"}
                ></Image> */}
              </div>
            </h1>
            <h1 className="font-bold text-grayC items-center   hidden md:flex dark:text-white ">
              {datas?.name}
              <div
                data-tip="verified account"
                id="verificationBadge"
                className="tooltip tooltip-bottom font-normal w-[17px] h-full mx-1"
              >
                {/* <Image alt="verifiedImage"
                  width={100}
                  height={100}
                  rounded={"rounded-full "}
                  src={"https://i.ibb.co/02MPvt7/Vector.png"}
                ></Image> */}
              </div>
            </h1>
            <h2 className="text-sm dark:text-white text-grayC opacity-90">
              {datas?.userId}
            </h2>
          </div>
        </Link>

        <div className="flex text-postTextColor items-center gap-x-2">
          <h1 className="opacity-75 text-sm md:text-base">
            {datas?.uploadTime}
          </h1>
        </div>
      </div>
      <div className="my-3 ">
        <h1
          className="mx-4 text-sm md:text-base"
          dangerouslySetInnerHTML={{ __html: datas?.postText }}
          id="postText"
        ></h1>
        <div className="  mt-2 gap-x-2 flex xl:flex-row gap-y-2 flex-col object-center ">
          {datas.category === "postImage" && (
            <PhotoProvider>
              <PhotoView src={datas?.postImg}>
                <Image
                  alt="postImage"
                  width={1000}
                  height={1000}
                  className=" md:rounded-md lg:rounded-none w-full lg:w-[600px] md:w-[580px] mx-auto max-h-[300px] object-cover object-center"
                  src={datas?.postImg}
                ></Image>
              </PhotoView>
            </PhotoProvider>
          )}
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="flex text-purpleLightC mx-1 justify-between text-xl">
          <div className="flex gap-x-4 items-center">
            {" "}
            <div
              onClick={() => {
                if (user) {
                  handleLove();
                }
              }}
              className="flex gap-x-4 items-center"
            >
              {" "}
              {/* <FaHeart /> */}
              {liked ? (
                <PiHeartFill className="text-purpleLightC" />
              ) : (
                <PiHeartDuotone />
              )}
            </div>
            {/* <FaHeart /> */}
            <button
              onClick={() => {
                setlikeShow(false);
                setCommentShow(!commentShow);
              }}
            >
              <GoComment />
            </button>
          </div>
          <div className="text-2xl flex gap-x-3 items-center">
            {datas?.email === user?.email && (
              <div className="flex text-purpleLightC justify-end">
                <button onClick={() => savePost()}>
                  <CiBookmark />
                </button>
              </div>
            )}
            {datas?.email === user?.email && (
              <div className="flex text-purpleLightC justify-end">
                <button onClick={() => confirmDeletePost(datas?._id)}>
                  <HiOutlineTrash />
                </button>
              </div>
            )}
          </div>
        </div>
        <h1
          onClick={() => {
            setCommentShow(false);
            setlikeShow(!likeShow);
            singleData();
          }}
          className="text-grayC cursor-pointer dark:text-white opacity-80 my-1"
        >
          {postData?.likes?.length || 0} Liked
        </h1>

        {/* comment */}
        {/* You can open the modal using document.getElementById('ID').showModal() method */}

        <div
          className={`my-2 ${
            commentShow === false && "hidden"
          } relative  rounded-lg`}
        >
          <div id="commentAddSection">
            <div className="textareaWrapper">
              {user && (
                <textarea
                  onChange={(e) => {
                    console.log(e.target.value);
                    handleComment(e);
                  }}
                  onKeyUp={(e) => {
                    let textarea = document.querySelector("textarea");
                    textarea.style.height = "63px";
                    let scHeight = textarea.scrollHeight;
                    textarea.style.height = `${scHeight}px`;
                  }}
                  id="postInputA"
                  placeholder="type your comment"
                  className={`border border-purpleLightC border-opacity-20 dark:border-secondaryBgDark   bg-secondaryBgLight dark:bg-primaryBgDark outline-none rounded-[1rem]  p-4   max-h-full min-h-[60px]`}
                ></textarea>
              )}
            </div>
            {user && (
              <div className="w-[30px] top-[10px] right-4 absolute justify-end mt-2 z-10   flex ">
                <button
                  onClick={() => {
                    if (!user) {
                      return toast.error("Please Login First", {
                        id: "loginErro",
                      });
                    }
                    submitComment();
                    console.log("hi");
                  }}
                  className="text-2xl text-purpleLightC  "
                >
                  <TbBrandTelegram />
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 " id="addedComments">
            {postComments !== null &&
              postComments.length > 0 &&
              postComments?.map((comment, i) => (
                <>
                  <div key={i} className="flex my-4 w-full h-full">
                    <div className="flex relative">
                      <Image
                        alt="commenterImage"
                        width={200}
                        height={200}
                        src={comment?.CommenterProfileImg}
                        className="w-[40px] h-[40px] rounded-full z-10"
                      ></Image>
                      <div className="w-[50px] h-[5px] bg-transparent -z-0 left-4 top-2 absolute border-t dark:border-opacity-100 border-opacity-30 border-grayC"></div>
                    </div>
                    <div className="flex w-full bg-primaryBgLight border border-grayC  dark:bg-primaryBgDark dark:border-opacity-100 border-opacity-30 z-0 rounded-2xl p-3 flex-col ms-2">
                      <h1 className="font-bold text-purpleLightC">
                        {comment?.CommenterName}
                      </h1>
                      <h2
                        className="mt-3 text-grayC text-sm dark:text-white"
                        dangerouslySetInnerHTML={{
                          __html: comment?.commentText,
                        }}
                      ></h2>
                      <div className="flex text-purpleLightC justify-end">
                        {user.email === comment?.CommenterEmail && (
                          <button onClick={() => confirmDelete(comment?._id)}>
                            <HiOutlineTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      {/* who liked post */}
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <div className="transform duration-300 ">
        {" "}
        {likeShow && postData?.likes?.length > 0 && (
          <div className=" dark:bg-primaryBgDark dark:border dark:border-grayC p-4 transition-all ease-in delay-200 duration-300 transform">
            {likedBy?.map((post, i) => (
              <>
                <div className="flex   items-center gap-x-2" key={i}>
                  <div>
                    <Image
                      alt="profile image"
                      height={200}
                      width={200}
                      src={post.profileImg}
                      className="w-[40px] rounded-full h-[40px]"
                    ></Image>
                  </div>
                  <div>{post.userName}</div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <CustomToast></CustomToast>
    </div>
  );
};

export default SINGLEPOST;
