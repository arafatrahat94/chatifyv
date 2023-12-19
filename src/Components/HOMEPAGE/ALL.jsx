"use client";

import { CiFilter } from "react-icons/ci";
import SINGLEPOST from "./SINGLEPOST";
import { useEffect, useState } from "react";
import useSWR from "swr";
const ALL = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllPost = [], mutate } = useSWR("/api/Post", fetcher);
  // useEffect(() => {
  //   setInterval(() => {
  //     mutate();
  //   }, 2000);
  // }, []);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-purpleLightC text-xl">All</h1>
        {/* TODO: filter section */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn text-xl font-bold text-textPrimaryLight hover:bg-transparent focus:border outline-none hover:shadow-none  focus:border-textPrimaryLight focus:bg-transparent bg-transparent m-1"
          >
            <CiFilter />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      {/* TODO: this is a dynamic section where mapping will be done from the server */}
      <div>
        {AllPost?.length > 0 &&
          AllPost?.map((datas, i) => (
            <>
              <SINGLEPOST mutate={mutate} datas={datas} key={i} />
            </>
          ))}
      </div>
      <button className="lg:px-10 bg-purpleC text-white px-5 flex justify-center mt-3 lg:text-base text-sm dark:bg-purpleLightC py-2 rounded-[4px]">
        See More
      </button>
    </div>
  );
};

export default ALL;
