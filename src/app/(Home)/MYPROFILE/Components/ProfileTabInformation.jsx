"use client";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Dynamicimage from "@/Utilities/DynamicImage";
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import useSWR from "swr";
import useAuth from "@/hooks/useAuth";
import SINGLEPOST from "@/Components/HOMEPAGE/SINGLEPOST";
import { BsPostcard } from "react-icons/bs";
import { PhotoProvider, PhotoView } from "react-photo-view";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProfileTabInformation = () => {
  const { user } = useAuth();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllPost = [], mutate } = useSWR(
    `/api/ProfilePost?email=${user?.email}`,
    fetcher
  );

  return (
    <div>
      <div className="w-full  flex-col px-2  sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl  justify-center p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5 focus:outline-none ",
                  selected
                    ? "border-b-2 border-purpleC dark:border-purpleLightC px-3 text-purpleC dark:text-purpleLightC shadow"
                    : "text-grayC  hover:text-purpleLightC"
                )
              }
            >
              <h1 className="flex gap-x-1"> Posts</h1>
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5 focus:outline-none",
                  selected
                    ? "border-b-2 border-purpleC dark:border-purpleLightC px-3 text-purpleC dark:text-purpleLightC shadow"
                    : "text-grayC  hover:text-purpleLightC"
                )
              }
            >
              Photos
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5 focus:outline-none",
                  selected
                    ? "border-b-2 border-purpleC dark:border-purpleLightC px-3 text-purpleC dark:text-purpleLightC shadow"
                    : "text-grayC  hover:text-purpleLightC"
                )
              }
            >
              Video
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            {/* <Tab.Panel id="Followers">
              <div className=" bg-secondaryBgLight dark:bg-secondaryBgDark flex justify-between items-center p-3 rounded-xl">
                <div className="flex items-center gap-x-2">
                  <Image
                    alt=""
                    src={"https://i.ibb.co/Pczr02Y/20231119-120920646.jpg"}
                    width={500}
                    height={500}
                    className="rounded-[1rem] w-[54px] h-[54px]"
                  ></Image>
                  <div>
                    <h1 className="font-bold dark:text-purpleLightC text-purpleC">
                      Person name
                    </h1>
                    <h1 className="text-sm italic">@username</h1>
                  </div>
                </div>
                <h1 className="me-2 dark:text-purpleLightC text-2xl text-purpleC">
                  <RiVerifiedBadgeFill />
                </h1>
              </div>
            </Tab.Panel> */}
            <Tab.Panel>
              {AllPost?.length > 0 &&
                AllPost?.map((datas, i) => (
                  <>
                    <SINGLEPOST datas={datas} key={i} />
                  </>
                ))}
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
                {AllPost?.length > 0 &&
                  AllPost.map((z) => (
                    <>
                      <PhotoProvider>
                        <PhotoView src={z.postImg}>
                          <Image
                            alt="postImage"
                            width={1000}
                            height={1000}
                            className=" md:rounded-md lg:rounded-none w-full h-full md:h-[300px] lg:h-full lg:w-[600px] md:w-[580px] mx-auto max-h-[300px] object-cover object-center"
                            src={z.postImg}
                          ></Image>
                        </PhotoView>
                      </PhotoProvider>
                    </>
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <p>Video</p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProfileTabInformation;
