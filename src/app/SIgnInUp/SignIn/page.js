"use client";
import ImageComponent from "./Components/Image";
import FormComponent from "./Components/Form";
import { useState } from "react";
import ComponentLoader from "@/Utilities/ComponentLoader";

const SignUpPage = () => {
  const [signLoading, setSignLoaing] = useState(false);
  return (
    <div className="max-w-[1040px] relative mx-auto">
      <div
        className={`min-h-screen w-full flex justify-center absolute z-10  items-center ${
          signLoading === true ? "" : "hidden"
        } dark:bg-primaryBgDark bg-white`}
      >
        <ComponentLoader></ComponentLoader>
      </div>
      <div className="grid dark:bg-primaryBgDark bg-white md:grid-cols-2 h-[872px]">
        <div className="">
          <ImageComponent></ImageComponent>
        </div>
        <div className="">
          <FormComponent
            signLoading={signLoading}
            setSignLoaing={setSignLoaing}
          ></FormComponent>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
