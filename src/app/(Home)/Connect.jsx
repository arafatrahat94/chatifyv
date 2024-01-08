"use client";

import ALL from "@/Components/HOMEPAGE/ALL";
import POST from "@/Components/HOMEPAGE/POST";
import STORY from "@/Components/HOMEPAGE/STORY";
import { useEffect, useState } from "react";

const Connect = () => {
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 5000);
  }, []);
  return (
    <div>
      {loading && (
        <>
          <div className="w-full flex min-h-screen justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </>
      )}

      {!loading && (
        <>
          <STORY></STORY>
          <POST></POST>
          <ALL></ALL>
        </>
      )}
    </div>
  );
};

export default Connect;
