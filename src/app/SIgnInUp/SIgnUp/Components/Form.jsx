"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import gIcon from "@/Assets/buttonIcons/google.png";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import ComponentLoader from "@/Utilities/ComponentLoader";
import { MdOutlineCancel } from "react-icons/md";

const FormComponent = ({ signLoading, setSignLoaing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { createU, glog } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [errorMsg, setError] = useState("");
  const onSubmit = (data) => {
    const { userName, userId, email, Pass, ConfirmPass } = data;

    if (Pass !== ConfirmPass) {
      setError("Password does not match");
      return document.getElementById("my_modal_4").showModal();
    } else {
      setSignLoaing(true);
      createU(email, Pass)
        .then((res) => {
          setSignLoaing(false);
          reset();
          return document.getElementById("my_modal_3").showModal();
        })
        .catch((err) => {
          setError(err.message.split("Firebase:").join(""));
          setSignLoaing(false);
          console.log(err);
          return document.getElementById("my_modal_CLick").click();
        });
    }
    // setSignLoaing(true);
    // document.getElementById("my_modal_3").showModal();
  };

  const handleGlogin = () => {
    setSignLoaing(true);
    glog()
      .then((res) => {
        setSignLoaing(false);

        return document.getElementById("my_modal_3").showModal();
      })
      .catch((err) => {
        setError(err.message.split("Firebase:").join(""));
        setSignLoaing(false);
        console.log(err);
        return document.getElementById("my_modal_CLick").click();
      });
  };
  return (
    <div>
      <div className="md:pe-[60px] lg:ps-[76px] ps-8 md:ps-14 lg:pe-[85px] pe-8 py-[50px]">
        <h1 className="font-bold text-xl text-purpleC dark:text-purpleLightC">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[29px]">
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
              htmlFor="userName"
            >
              Full Name
            </label>
            <input
              type="text"
              {...register("userName", { required: true })}
              placeholder="full name"
              className="h-[42px] border border-grayC dark:bg-secondaryBgDark border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
              id="userName"
            />{" "}
            {errors.userName && (
              <span className="text-red-500  text-sm">
                {" "}
                ! This field is required
              </span>
            )}
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
              htmlFor="userId"
            >
              UserId
            </label>
            <input
              type="text"
              {...register("userId", { required: true })}
              placeholder="@userId"
              className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none dark:bg-secondaryBgDark px-4"
              id="useId"
            />
            {errors.userId && (
              <span className="text-red-500  text-sm">
                {" "}
                ! This field is required
              </span>
            )}
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              htmlFor="email"
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="@email.com"
              className="h-[42px] border border-grayC dark:bg-secondaryBgDark border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
              id="email"
            />
            {errors.userId && (
              <span className="text-red-500  text-sm">
                {" "}
                ! This field is required
              </span>
            )}
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("Pass", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="pAssw0rd"
                className="h-[42px] border border-grayC dark:bg-secondaryBgDark border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none w-full px-4"
                id="password"
              />
              {errors.Pass && (
                <span className="text-red-500  text-sm">
                  {" "}
                  ! This field is required
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl font-bold text-grayC absolute right-3 top-1/2 dark:text-purpleLightC -translate-y-1/2"
              >
                {showPassword !== false ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label
              className="text-[14px] text-gray-500 dark:text-purpleLightC"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>{" "}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("ConfirmPass", { required: true })}
                placeholder="pAssw0rd"
                className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none dark:bg-secondaryBgDark w-full px-4"
                id="confirmPassword"
              />{" "}
              {errors.ConfirmPass && (
                <span className="text-red-500  text-sm">
                  {" "}
                  ! This field is required
                </span>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl font-bold text-grayC absolute right-3 top-1/2 dark:text-purpleLightC -translate-y-1/2"
              >
                {showPassword !== false ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-items-start  mb-[23px]">
            <button
              type="submit"
              className="bg-purpleC btn rounded-[18px] text-white dark:bg-purpleLightC hover:bg-purpleLightC font-normal text-[16px] px-6 h-[50px]"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="my-[20px]">
          <h1 className="text-sm text-grayC dark:text-secondaryBgLight dark:text-opacity-60">
            By signing up you agree to our{" "}
            <span className="link text-purpleC dark:text-purpleLightC">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="link text-purpleC dark:text-purpleLightC">
              Privacy Policy
            </span>{" "}
            and confirm that you are at least 18 years old.{" "}
          </h1>
        </div>
        <div>
          <h1 className="font-[500] tracking-wide md:text-sm lg:text-base">
            Already have an account? &nbsp;&nbsp;
            <Link
              href="/SIgnInUp/SignIn"
              className="link text-purpleC dark:text-purpleLightC font-semibold"
            >
              Sign In
            </Link>
          </h1>
        </div>

        <div onClick={handleGlogin} className="pe-[70px] my-[40px]">
          <h1 className="mb-6 dark:text-purpleLightC text-grayC">Or</h1>
          <button className="flex items-center gap-x-2 bg-secondaryBgLight rounded-md px-4 py-2 border-grayC border dark:text-white dark:bg-purpleLightC border-opacity-25 md:text-sm lg:text-base justify-center">
            <Image src={gIcon} width={20} height={20} alt="Google Icon"></Image>{" "}
            Sign up with google
          </button>
        </div>
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          id="my_modal_CLick"
          className=""
          onClick={() => document.getElementById("my_modal_4").showModal()}
        ></button>
        <dialog id="my_modal_4" className="modal bg-black bg-opacity-25">
          <div className="modal-box  dark:bg-grayC max-w-[450px] rounded-md ">
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
            <p className="py-4 text-center font-bold text-purpleLightC mt-4 uppercase">
              {errorMsg}
            </p>
          </div>
        </dialog>
        <dialog id="my_modal_3" className="modal bg-black bg-opacity-25">
          <div className="modal-box  dark:bg-grayC max-w-[400px] rounded-md ">
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
              &#34; New User Created &#34;{" "}
            </p>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default FormComponent;
