"use client";

import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const FormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="pe-[274px] ps-[126px] pt-[126px]">
        <h1 className="font-bold text-xl text-purpleC dark:text-purpleLightC">
          Sign Up
        </h1>
        <form className="mt-[29px]">
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label className="text-[14px] text-gray-500" htmlFor="userName">
              Full Name
            </label>
            <input
              type="text"
              placeholder="full name"
              className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
              id="useId"
            />
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label className="text-[14px] text-gray-500" htmlFor="userId">
              UserId
            </label>
            <input
              type="text"
              placeholder="@userId"
              className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
              id="useId"
            />
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label htmlFor="email" className="text-[14px] text-gray-500">
              Email
            </label>
            <input
              type="email"
              placeholder="@email.com"
              className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none px-4"
              id="email"
            />
          </div>
          <div className="flex gap-y-2 flex-col mb-[23px]">
            <label className="text-[14px] text-gray-500" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="pAssw0rd"
                className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none w-full px-4"
                id="password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl font-bold text-grayC absolute right-3 top-1/2 -translate-y-1/2"
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
              className="text-[14px] text-gray-500"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>{" "}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="pAssw0rd"
                className="h-[42px] border border-grayC border-opacity-30 bg-secondaryBgLight rounded-md focus:outline-none w-full px-4"
                id="confirmPassword"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xl font-bold text-grayC absolute right-3 top-1/2 -translate-y-1/2"
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
      </div>
    </div>
  );
};

export default FormComponent;
