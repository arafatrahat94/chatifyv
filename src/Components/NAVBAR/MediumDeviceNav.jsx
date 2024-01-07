"use client";

import NavLink from "@/Utilities/NavLink";
import Link from "next/link";
import { RiHomeLine } from "react-icons/ri";
import { GrNotification } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineCancel, MdOutlineGroups3 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./nav.css";
import ToogleDarkLight from "../DarkLightmode/ToogleDarkLight";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import SearchBar from "../SUGGESTION/SearchBar/SearchBar";
import Suggestion from "../SUGGESTION/Suggestion/Suggestion";
import useAuth from "@/hooks/useAuth";
import { TbBell, TbLogout, TbSmartHome } from "react-icons/tb";
import { HiOutlineLogin } from "react-icons/hi";
import toast from "react-hot-toast";
import CustomToast from "../CustomizedToast/CustomToast";
import { BiMessageSquareDetail } from "react-icons/bi";
import useSWR from "swr";
import useNotification from "@/hooks/useNotification";
const MediumDeviceNav = () => {
  const { user, logOut } = useAuth();
  const [confirmRoute, setConfirmRoute] = useState("");

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const AllCommentsUpdate = useNotification();
  const filtering = AllCommentsUpdate?.filter((x) => x.status === "unread");

  useEffect(() => {
    if (user) {
      setConfirmRoute("/MYPROFILE");
    } else {
      setConfirmRoute("/SIgnInUp/SignIn");
    }
  }, [user, AllCommentsUpdate]);

  console.log(AllCommentsUpdate);
  const navlink = [
    {
      path: "/",
      title: "Home",
    },
    {
      path: "/NOTIFICATIONS",
      title: "Notifications",
    },
    {
      path: "/MESSAGES",
      title: "Messages",
    },

    // {
    //   path: "/VIDEOS",
    //   title: "Videos",
    // },
    {
      path: confirmRoute,
      title: "Profile",
    },
  ];
  const navlink2 = [
    // {
    //   path: "/BOOKMARKS",
    //   title: "Bookmarks",
    // },
    // {
    //   path: "/GROUPS",
    //   title: "Groups",
    // },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const [error, setError] = useState("");
  const confirmDeletePost = (id) => {
    toast((t) => (
      <span className="flex z-20 flex-col items-center justify-center text-xl">
        Are You Sure?
        <div className=" mt-3 flex gap-x-1 text-sm">
          <button
            className="bg-purpleLightC rounded-md py-2 px-3 text-white"
            onClick={() => {
              setNavOpen(false);
              toast.dismiss(t.id);
              logOutHandler();
            }}
          >
            Sign Out
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
  const logOutHandler = () => {
    logOut()
      .then(() => {
        return toast.success("User Signed Out", {
          id: "signedOutToast",
        });
      })
      .catch((err) => {
        toast.error(err.message.split("Firebase:").join(""), {
          id: "signedOutToastErr",
        });
      });
  };

  return (
    <nav className="top-[69px] sticky z-20 lg:hidden">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (navOpen === true) {
            setNavOpen(false);
          }
        }}
      >
        <button
          className="absolute 
    -top-[50px] z-20 md:top-2 right-5
    "
        >
          <div onClick={() => setNavOpen(!navOpen)} class="switch2">
            <input type="checkbox" checked={navOpen} />
            <div>
              <span class="line-12"></span>
              <span class="line-22"></span>
              <span class="line-32"></span>
            </div>
          </div>
        </button>
        <div
          className={`absolute ${
            navOpen ? "right-0 opacity-100" : "opacity-0 -right-[-120%]"
          } bg-white dark:bg-secondaryBgDark border-b gap-x-2 min-h-screen w-[275px] md:pt-12 pt-5 transition duration-500 transform z-10`}
        >
          <SearchBar></SearchBar>
          {user &&
            navlink2.map(({ path, title }) => (
              <>
                <NavLink
                  onClick={() => setNavOpen(false)}
                  exact={path === "/"}
                  activeClassName="font-bold text-purpleLightC "
                  className="flex dark:text-white text-grayC  justify-start px-6 mb-[20px]  text-xl items-center gap-x-2"
                  href={path}
                >
                  {title === "Bookmarks" && <CiBookmark />}
                  {title === "Groups" && <MdOutlineGroups3 />}

                  {title}
                </NavLink>
              </>
            ))}
          {!user && (
            <NavLink
              href="/SIgnInUp/SignIn"
              activeClassName="font-bold text-purpleLightC opacity-100"
              className="flex dark:text-white text-grayC opacity-60 justify-start px-6 mb-[20px]  text-xl items-center gap-x-2"
            >
              <HiOutlineLogin className="rotate-180" />
              Sign In{" "}
            </NavLink>
          )}
          {user && (
            <>
              <button
                onClick={() => {
                  setNavOpen(!navOpen);
                  confirmDeletePost(user);
                }}
                className="flex dark:text-white text-grayC  justify-start px-6 mb-[20px]  text-xl items-center gap-x-2"
              >
                <TbLogout /> Sign out
              </button>
            </>
          )}
          <div className="flex justify-center">
            <ToogleDarkLight />
          </div>
          <Suggestion></Suggestion>
        </div>
      </OutsideClickHandler>
      <div className="flex bg-white dark:bg-secondaryBgDark dark:border-none border-b gap-x-2 justify-center relative h-[50px] px-28">
        {navlink.map(({ path, title }) => (
          <>
            <NavLink
              exact={path === "/"}
              activeClassName={`font-bold   
                  dark:text-purpleLightC text-purpleC `}
              className="flex text-gray-500 dark:text-grayC   justify-star px-5  text-2xl items-center gap-x-2"
              href={path}
            >
              {title === "Home" && <TbSmartHome />}
              {title === "Notifications" && <TbBell />}
              {user && filtering?.length > 0 && title === "Notifications" && (
                <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-r from-red-600 to-red-800 border border-purpleC absolute"></div>
              )}

              {title === "Messages" && <BiMessageSquareDetail />}
              {title === "Bookmarks" && <CiBookmark />}
              {title === "Groups" && <MdOutlineGroups3 />}
              {title === "Videos" && <IoVideocamOutline />}
              {title === "Profile" && <CgProfile />}
            </NavLink>
          </>
        ))}
      </div>{" "}
      <CustomToast />
    </nav>
  );
};

export default MediumDeviceNav;
