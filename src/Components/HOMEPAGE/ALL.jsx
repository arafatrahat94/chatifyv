"use client";

import { CiFilter } from "react-icons/ci";
import SINGLEPOST from "./SINGLEPOST";
import { useEffect, useState } from "react";
import useSWR from "swr";
import usePOST from "@/hooks/usePOST";
const ALL = () => {
  const { AllPost, mutateAllPost } = usePOST();

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-purpleLightC text-xl">All</h1>
        {/* TODO: filter section */}
      </div>
      {/* TODO: this is a dynamic section where mapping will be done from the server */}
      <div>
        {AllPost?.length > 0 &&
          AllPost?.map((datas, i) => (
            <>
              <SINGLEPOST datas={datas} key={i} />
            </>
          ))}
      </div>
      {/* <button className="lg:px-10 bg-purpleC text-white px-5 flex justify-center mt-3 lg:text-base text-sm dark:bg-purpleLightC py-2 rounded-[4px]">
        See More
      </button> */}
    </div>
  );
};

export default ALL;
