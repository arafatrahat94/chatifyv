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
const Nav = () => {
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
      path: "/BOOKMARKS",
      title: "Bookmarks",
    },
    {
      path: "/GROUPS",
      title: "Groups",
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
  return (
    <nav className="top-[70px] sticky hidden lg:block">
      <div className="flex flex-col xl:ms-5 justify-end lg:px-6 2xl:ms-40 xl:px-16 ">
        <h1 className="h-[50px] w-[50px] rounded-full bg-blue-400 my-3">v</h1>
        {navlink.map(({ path, title }) => (
          <>
            <NavLink
              exact={path === "/"}
              activeClassName="font-bold text-purpleLightC opacity-100"
              className="flex text-grayC opacity-60 justify-start  mb-[20px]  text-xl items-center gap-x-2"
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

        <div>
          <ToogleDarkLight />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
