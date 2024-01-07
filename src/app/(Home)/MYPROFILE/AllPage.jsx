"use client";
import POST from "@/Components/HOMEPAGE/POST";
import BannerAndProfilePic from "./Components/BannerAndProfilePic";
import ProfileTabInformation from "./Components/ProfileTabInformation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
// import * as loadingAnimation from "../../../Assets/xVWj8XhdGl.json";
// import Lottie from "lottie-react";
const AllPage = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      {user?.length > 0 ? (
        <>
          <div className="w-full min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          {" "}
          <BannerAndProfilePic></BannerAndProfilePic>
          <POST></POST>
          <ProfileTabInformation></ProfileTabInformation>
        </>
      )}
    </div>
  );
};

export default AllPage;
