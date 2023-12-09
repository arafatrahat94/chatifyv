"use client";

import NavLink from "@/Utilities/NavLink";
import Link from "next/link";
import { RiHomeLine } from "react-icons/ri";
import { GrNotification } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineGroups3 } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./nav.css";
import ToogleDarkLight from "../DarkLightmode/ToogleDarkLight";
import { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
const MediumDeviceNav = () => {
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
      path: "/MYPROFILE",
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
          <div className="flex justify-center">
            <ToogleDarkLight />
          </div>
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
      </div>
    </nav>
  );
};

export default MediumDeviceNav;
