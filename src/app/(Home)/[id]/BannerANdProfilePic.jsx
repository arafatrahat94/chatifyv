"use client";
import Image from "next/image";
import { FaShareAlt } from "react-icons/fa";

import useSWR from "swr";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import CustomToast from "@/Components/CustomizedToast/CustomToast";
import ProfileTabInformations from "./ProfileTabInformations";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";
const BannerANdProfilePic = ({ email }) => {
  const { user } = useAuth();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [followersArray, setFollowersArray] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);

  const [User, setUser] = useState([]);
  const [following, setFollowing] = useState(false);
  const dataFetch = () => {
    fetch(`/api/NewUser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setFollowersArray(data?.followers);
        setUser(data);
      });
  };
  const filtering = followersArray.filter(
    (x) => x.followerEmail === user?.email
  );
  console.log(filtering.length);
  useEffect(() => {
    setTimeout(() => {
      dataFetch();
    }, 2000);
    if (user?.following) {
      setFollowingArray(user?.following);
    }
  }, []);
  console.log(followersArray.length);
  const followNow = () => {
    const FolloweData = {
      followerName: user?.name,
      followerEmail: user?.email,
      followerProfileImg: user?.profileImg,
      followCoverImg: user?.coverImg,
    };
    let newDatas;
    const filtering = followersArray.filter(
      (x) => x.followerEmail !== FolloweData?.followerEmail
    );
    if (filtering) {
      newDatas = [...filtering, FolloweData];
    }
    fetch(`/api/FollowProfile?email=${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followers: newDatas }),
    })
      .then((res) => res.json())
      .then((data) => {
        const FollowingData = {
          FollowingName: User?.name,
          FollowingEmail: User?.email,
          FollowingProfileImg: User?.profileImg,
          FollowingCoverImg: User?.coverImg,
        };
        let newDataFollow;
        const filtering = followingArray.filter(
          (x) => x.FollowingEmail !== FollowingData?.FollowingEmail
        );
        if (filtering) {
          newDataFollow = [...filtering, FollowingData];
        }
        fetch(`/api/FollowProfile?email=${user?.email}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ following: newDataFollow }),
        })
          .then((res) => res.json())
          .then((data) => {
            dataFetch();
            setFollowing(true);
            toast.success("Followed", { id: "followed" });
          });
      });
  };
  const UnfollowNow = () => {
    console.log("UnfollowNow");
    const filtering = followersArray.filter(
      (x) => x.followerEmail !== user?.email
    );
    console.log(filtering);
    fetch(`/api/FollowProfile?email=${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followers: filtering }),
    })
      .then((res) => res.json())
      .then((data) => {
        // setFollowing(false);
        const filtering = followingArray.filter(
          (x) => x.FollowingEmail !== User?.email
        );
        fetch(`/api/FollowProfile?email=${user?.email}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ following: filtering }),
        })
          .then((res) => res.json())
          .then((data) => {
            dataFetch();
            setFollowing(false);
            toast.success("UnFollowed", { id: "Unfollowed" });
          });
      });
  };
  const sendMessage = () => {
    toast(
      (t) => (
        <span className="flex items-center justify-center gap-x-2 p-0">
          <input
            placeholder="type your message"
            className="p-3 rounded-md focus:outline-none bg-grayC bg-opacity-10 dark:border border-grayC"
            type="text"
          />

          <button className="flex gap-x-3">
            <TbSend className="ms-2" />
            <MdOutlineCancel onClick={() => toast.dismiss(t.id)} />
          </button>
        </span>
      ),
      { id: "sendMesage" }
    );
  };
  return (
    <div>
      <div>
        <div className="h-[110px] md:h-[177px] object-cover object-center mt-4 relative">
          <Image
            alt="coverImage"
            src={User?.coverImg !== null && User?.coverImg}
            width={500}
            height={500}
            className="rounded-[1rem] h-full w-full object-cover"
          ></Image>
        </div>
        <div className="flex mt-2 items-center w-full   relative justify-between">
          <div className="flex gap-x-2 items-center">
            <div className="md:w-[90px] w-[70px] h-[70px] md:h-[90px] rounded-full relative ms-3">
              <Image
                alt="profileImg"
                src={User?.profileImg !== null && User?.profileImg}
                width={500}
                height={500}
                className="rounded-full h-full w-full object-cover"
              ></Image>
            </div>

            <div>
              <h1 className="font-semibold text-purpleC dark:text-purpleLightC hidden md:block md:text-xl">
                {User?.userName}
              </h1>
              <h1
                data-tip={User?.userName}
                className="font-semibold tooltip tooltip-bottom md:hidden text-purpleC dark:text-purpleLightC md:text-xl"
              >
                {User?.userName?.length > 12 &&
                  User?.userName.slice(0, 12) + "..."}
              </h1>
              <h2 className="italic text-sm text-grayC">{User?.userId}</h2>
              <h2 className="text-xs text-black dark:text-grayC">
                {User?.followers?.length > 0 ? User?.followers?.length : 0}{" "}
                Followers
              </h2>
            </div>
          </div>
          <div className="me-3 gap-1 flex-col flex items-center">
            <button
              onClick={() => sendMessage(email)}
              type="button"
              className="md:px-6 px-4 py-2  rounded-[1rem] flex justify-center items-center  text-purpleLightC"
            >
              <BiMessageSquareDetail />
              <span className="hidden md:block">&nbsp; Message</span>
            </button>
            <button
              onClick={() => {
                if (user?.email === User.email) {
                  return toast.error("You can't follow yourself", {
                    id: "selfFollowNotAllowed",
                  });
                } else {
                  if (filtering.length > 0) {
                    UnfollowNow();
                  } else {
                    followNow();
                  }
                }
              }}
              type="button"
              className={`${
                filtering.length > 0
                  ? "text-purpleLightC"
                  : "text-white bg-purpleC dark:bg-purpleLightC"
              } md:px-6 px-4 py-3  rounded-[1rem] flex justify-center items-center  `}
            >
              {filtering.length > 0 ? (
                <>
                  <SlUserFollowing />{" "}
                  <span className="hidden md:block"> &nbsp; Following</span>
                </>
              ) : (
                <>
                  <SlUserFollow />
                  <span className="hidden md:block"> &nbsp; Follow</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      <CustomToast></CustomToast>
      <ProfileTabInformations email={User?.email}></ProfileTabInformations>
    </div>
  );
};

export default BannerANdProfilePic;
