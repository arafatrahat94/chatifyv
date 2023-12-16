"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import gIcon from "@/Assets/buttonIcons/google.png";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import ComponentLoader from "@/Utilities/ComponentLoader";
import { MdOutlineCancel } from "react-icons/md";
import CustomToast from "@/Components/CustomizedToast/CustomToast";
import toast from "react-hot-toast";

const FormComponent = ({ signLoading, setSignLoaing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, glog, forgotPass } = useAuth();
  const [initialEmail, setInitialEmail] = useState(null);
  const [initialPass, setInitialPass] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const onSubmit = (data) => {
    let { email, Pass } = data;
    if (initialEmail && initialPass) {
      email = initialEmail;
      Pass = initialPass;
    }

    if (email && Pass) {
      setSignLoaing(true);
      signIn(email, Pass)
        .then((res) => {
          setSignLoaing(false);
          reset();
          setInitialEmail(null);
          setInitialPass(null);
          toast.success("User Signed In", { id: "userSign" });
        })
        .catch((err) => {
          setSignLoaing(false);

          toast.error(err.message.split("Firebase:").join(""), {
            id: "errToast",
          });
        });
    } else {
      return toast.error("Please enter email and password", {
        id: "passErrToast",
      });
    }
  };

  const handleGlogin = () => {
    setSignLoaing(true);
    glog()
      .then((res) => {
        setSignLoaing(false);

        return toast.success("User Signed In", {
          id: "toatSignTwo",
        });
      })
      .catch((err) => {
        setSignLoaing(false);

        return toast.error(err.message.split("Firebase:").join(""), {
          id: "toastErrTwo",
        });
      });
  };

  const handleForgotPassword = () => {
    if (email.length === 0) {
      setError("Please enter your email address first");
      return document.getElementById("my_modal_CLick").click();
    } else {
      forgotPass(email)
        .then((res) => {
          setSignLoaing(false);
          reset();
          return document.getElementById("my_modal_5").showModal();
        })
        .catch((err) => {
          setError(err.message.split("Firebase:").join(""));
          setSignLoaing(false);
          // console.log(err);
          return document.getElementById("my_modal_CLick").click();
        });
    }
    // console.log(email.length === 0);
  };
  const rememberMeOption = watch("Remember");
  const Pass = watch("Pass");
  const handleRememberMe = () => {
    if (typeof window !== "undefined") {
      const storage = window.localStorage;
      if (rememberMeOption !== true) {
        if (
          email !== undefined &&
          email.length > 0 &&
          Pass.length > 0 &&
          email !== null &&
          Pass !== undefined &&
          Pass !== null
        ) {
          storage?.setItem("useRemail", email);
          storage?.setItem("useRpass", Pass);
        }
      } else {
        storage?.removeItem("useRemail");
        storage?.removeItem("useRpass");
      }
      console.log("You are on the browser");
    } else {
      console.log("You are on the server");
      // 👉️ can't use localStorage
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      if (
        localStorage?.getItem("useRemail") !== null ||
        undefined ||
        localStorage?.getItem("useRpass") !== null ||
        undefined
      ) {
        setInitialEmail(localStorage?.getItem("useRemail"));
        setInitialPass(localStorage?.getItem("useRpass"));
      }
    }
  }, []);
  return (
    <div className="min-h-screen flex justify-center dark:bg-primaryBgDark items-center">
      <div className="md:pe-[94px]  lg:ps-[76px] ps-8 pe-8 py-[10px]">
        <h1 className="font-bold text-xl text-purpleC dark:text-purpleLightC">
          Sign In
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[29px]">
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              htmlFor="email"
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              defaultValue={initialEmail}
              placeholder="@email.com"
              className="h-[42px] border border-grayC dark:bg-secondaryBgDark border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
            />
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <div>
                {" "}
                <input
                  {...register("Pass")}
                  type={showPassword ? "text" : "password"}
                  defaultValue={initialPass}
                  placeholder="pAssw0rd"
                  className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md dark:bg-secondaryBgDark
                  focus:outline-none w-full px-4"
                  id="password"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl font-bold text-grayC absolute dark:text-purpleLightC right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword !== false ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between mb-[23px]">
            <div className="gap-x-1 flex items-center">
              <input
                onClick={handleRememberMe}
                {...register("Remember")}
                type="checkbox"
                id="checkRemember"
                className="checkbox  
                border-grayC h-[1rem]
                checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:white]"
              />
              Remember me
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="link text-purpleLightC text-sm"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex justify-items-start  mb-[23px]">
            <button
              type="submit"
              className="bg-purpleC btn rounded-[18px] text-white dark:bg-purpleLightC hover:bg-purpleLightC font-normal text-[16px] px-6 h-[50px]"
            >
              Sign In
            </button>
          </div>
        </form>

        <div>
          <h1 className="font-[500] tracking-wide">
            New here? &nbsp;&nbsp;
            <Link
              href="/SIgnInUp/SIgnUp"
              className="link text-purpleC dark:text-purpleLightC font-semibold"
            >
              Sign Up
            </Link>
          </h1>
        </div>

        <div onClick={handleGlogin} className="pe-[70px] my-[40px]">
          <h1 className="mb-6 dark:text-purpleLightC text-grayC">Or</h1>
          <button className="flex items-center gap-x-2 dark:bg-purpleLightC dark:text-white bg-secondaryBgLight rounded-md px-4 py-2 border-grayC border md:text-sm lg:text-base border-opacity-25 justify-center">
            <Image src={gIcon} width={20} height={20} alt="Google Icon"></Image>{" "}
            Sign In with google
          </button>
        </div>
      </div>
      <CustomToast />
    </div>
  );
};

export default FormComponent;
