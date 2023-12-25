"use client";
import POST from "@/Components/HOMEPAGE/POST";
import BannerAndProfilePic from "./Components/BannerAndProfilePic";
import ProfileTabInformation from "./Components/ProfileTabInformation";
import { useEffect, useState } from "react";
// import * as loadingAnimation from "../../../Assets/xVWj8XhdGl.json";
// import Lottie from "lottie-react";
const AllPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <>
          <div className="w-full h-screen flex justify-center items-center">
            {/* <Lottie
              animationData={!document === undefined && loadingAnimation}
            ></Lottie> */}
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
