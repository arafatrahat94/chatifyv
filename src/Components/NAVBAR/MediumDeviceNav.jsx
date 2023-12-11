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
import { TbLogout } from "react-icons/tb";
import { HiOutlineLogin } from "react-icons/hi";
const MediumDeviceNav = () => {
  const { user, logOut } = useAuth();
  const [confirmRoute, setConfirmRoute] = useState("");
  useEffect(() => {
    if (user) {
      setConfirmRoute("/MYPROFILE");
    } else {
      setConfirmRoute("/SIgnInUp/SignIn");
    }
  }, [user]);
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

    {
      path: "/VIDEOS",
      title: "Videos",
    },
    {
      path: confirmRoute,
      title: "Profile",
    },
  ];
  const navlink2 = [
    {
      path: "/BOOKMARKS",
      title: "Bookmarks",
    },
    {
      path: "/GROUPS",
      title: "Groups",
    },
  ];
  const [navOpen, setNavOpen] = useState(false);
  const [error, setError] = useState("");
  const logOutHandler = () => {
    logOut()
      .then(() => {
        return document.getElementById("my_modal_3").showModal();
      })
      .catch((err) => {
        setError(err.message.split("Firebase:").join(""));
        return document.getElementById("my_modal_4").showModal();
      });
  };
  const logoutConfirm = () => {
    return document.getElementById("my_modal_2").showModal();
  };
  return (
    <nav className="top-[69px] sticky z-10 lg:hidden">
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
          } bg-white dark:bg-secondaryBgDark border-b gap-x-2 min-h-screen md:pt-12 pt-5 transition duration-500 transform z-10`}
        >
          <SearchBar></SearchBar>
          {navlink2.map(({ path, title }) => (
            <>
              <NavLink
                onClick={() => setNavOpen(false)}
                exact={path === "/"}
                activeClassName="font-bold text-purpleLightC opacity-100"
                className="flex dark:text-white text-grayC opacity-60 justify-start px-6 mb-[20px]  text-xl items-center gap-x-2"
                href={path}
              >
                {title === "Home" && <RiHomeLine />}
                {title === "Notifications" && <GrNotification />}
                {title === "Messages" && <TiMessages />}
                {title === "Bookmarks" && <CiBookmark />}
                {title === "Groups" && <MdOutlineGroups3 />}
                {title === "Videos" && <IoVideocamOutline />}
                {title === "Profile" && <CgProfile />}
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
                onClick={logoutConfirm}
                className="flex dark:text-white text-grayC opacity-60 justify-start px-6 mb-[20px]  text-xl items-center gap-x-2"
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
              activeClassName={`font-bold  dark:opacity-100 
                  text-purpleLightC opacity-100`}
              className="flex text-grayC  opacity-60 justify-star px-5  text-2xl items-center gap-x-2"
              href={path}
            >
              {title === "Home" && <RiHomeLine />}
              {title === "Notifications" && <GrNotification />}
              {title === "Messages" && <TiMessages />}
              {title === "Bookmarks" && <CiBookmark />}
              {title === "Groups" && <MdOutlineGroups3 />}
              {title === "Videos" && <IoVideocamOutline />}
              {title === "Profile" && <CgProfile />}
            </NavLink>
          </>
        ))}
      </div>{" "}
      {/* logout confirm handler modal*/}
      <dialog id="my_modal_2" className="modal p-0">
        <div className="modal-box  dark:bg-primaryBgDark max-w-[400px] rounded-md ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-center flex items-center justify-center bg-purpleLightC btn-ghost absolute text-white right-2 top-2">
              <>
                <MdOutlineCancel />
              </>
            </button>
          </form>
          <h3 className="font-bold uppercase flex justify-center mt-10 scale-75 text-lg">
            <div class="loader23">
              <span>Chatify</span>
              <span>Chatify</span>
            </div>
          </h3>
          <h1 className="mt-6 text-center">Are You Sure?</h1>
          <p className="py-4 flex gap-x-2 justify-center text-xl text-center font-bold text-purpleLightC mt-2 uppercase">
            <button
              className="btn text-white bg-purpleLightC"
              onClick={() => {
                logOutHandler();
                document.getElementById("my_modal_2").close();
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => document.getElementById("my_modal_2").close()}
              className="btn border border-purpleLightC bg-transparent text-purpleLightC"
            >
              Cancel
            </button>
          </p>
        </div>
      </dialog>
      {/* logout handler modal*/}
      <dialog id="my_modal_3" className="modal bg-black bg-opacity-25">
        <div className="modal-box  dark:bg-primaryBgDark max-w-[400px] rounded-md ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-center flex items-center justify-center bg-purpleLightC btn-ghost absolute text-white right-2 top-2">
              <>
                <MdOutlineCancel />
              </>
            </button>
          </form>
          <h3 className="font-bold flex justify-center mt-10 scale-75 text-lg">
            <div class="loader23">
              <span>SUCCESS</span>
              <span>SUCCESS</span>
            </div>
          </h3>
          <p className="py-4 text-xl text-center font-bold text-purpleLightC mt-4 uppercase">
            &#34; User Signed Out &#34;{" "}
          </p>
        </div>
      </dialog>
      {/* logout error handler modal*/}
      <dialog id="my_modal_4" className="modal bg-black bg-opacity-25">
        <div className="modal-box   dark:bg-primaryBgDark max-w-[400px] rounded-md ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle text-center flex items-center justify-center bg-purpleLightC btn-ghost absolute text-white right-2 top-2">
              <>
                <MdOutlineCancel />
              </>
            </button>
          </form>
          <h3 className="font-bold flex justify-center mt-10 scale-75 text-lg">
            <div class="loader23">
              <span>ERROR</span>
              <span>ERROR</span>
            </div>
          </h3>
          <p className="py-4 text-xl text-center font-bold text-purpleLightC mt-4 uppercase">
            &#34; {error} &#34;{" "}
          </p>
        </div>
      </dialog>
    </nav>
  );
};

export default MediumDeviceNav;
