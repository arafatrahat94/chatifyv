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
import { TbLogout } from "react-icons/tb";
import "./nav.css";
import ToogleDarkLight from "../DarkLightmode/ToogleDarkLight";
import useAuth from "@/hooks/useAuth";
import { HiOutlineLogin } from "react-icons/hi";
import { useState } from "react";
import CustomToast from "../CustomizedToast/CustomToast";
import toast from "react-hot-toast";
const Nav = () => {
  const { user, logOut } = useAuth();
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
  ];

  const [error, setError] = useState("");

  const logoutConfirm = () => {
    return document.getElementById("my_modal_O").showModal();
  };
  const logOutHandler = () => {
    logOut()
      .then(() => {
        return toast.success("User Signed Out");
      })
      .catch((err) => {
        toast.error(err.message.split("Firebase:").join(""));
      });
  };
  return (
    <nav className="top-[70px] sticky hidden lg:block">
      <div className="flex flex-col xl:ms-5 justify-end lg:px-6 2xl:ms-40 xl:px-16 ">
        <div>
          <div className="h-[50px] w-[50px] rounded-[1rem] bg-blue-400 my-3"></div>
        </div>
        {navlink.map(({ path, title }) => (
          <>
            <NavLink
              exact={path === "/"}
              activeClassName="font-bold text-purpleLightC opacity-100"
              className="flex text-grayC  justify-start  mb-[20px]  text-xl items-center gap-x-2"
              href={path}
            >
              {title === "Home" && <RiHomeLine />}
              {title === "Notifications" && <GrNotification />}
              {title === "Messages" && <TiMessages />}
              {title === "Bookmarks" && <CiBookmark />}
              {title === "Groups" && <MdOutlineGroups3 />}
              {title === "Videos" && <IoVideocamOutline />}

              {title}
            </NavLink>
          </>
        ))}

        {!user && (
          <NavLink
            href="/SIgnInUp/SignIn"
            activeClassName="font-bold text-purpleLightC opacity-100"
            className="flex text-grayC  justify-start  mb-[20px]  text-xl items-center gap-x-2"
          >
            <HiOutlineLogin className="rotate-180" />
            Sign In{" "}
          </NavLink>
        )}

        {user && (
          <>
            {" "}
            <NavLink
              href="/MYPROFILE"
              activeClassName="font-bold text-purpleLightC opacity-100"
              className="flex text-grayC  justify-start  mb-[20px]  text-xl items-center gap-x-2"
            >
              <CgProfile /> Profile
            </NavLink>
            <button
              onClick={logoutConfirm}
              className="flex text-grayC  justify-start  mb-[20px]  text-xl items-center gap-x-2"
            >
              <TbLogout /> Sign out
            </button>
          </>
        )}

        {/* logout confirm handler modal*/}
        <dialog id="my_modal_O" className="modal p-0">
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
                  document.getElementById("my_modal_T").close();
                }}
              >
                Confirm
              </button>
              <button
                onClick={() => document.getElementById("my_modal_T").close()}
                className="btn border border-purpleLightC bg-transparent text-purpleLightC"
              >
                Cancel
              </button>
            </p>
          </div>
        </dialog>
        {/* logout handler modal*/}
        <CustomToast />

        <div>
          <ToogleDarkLight />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
