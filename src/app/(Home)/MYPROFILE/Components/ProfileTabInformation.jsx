"use client";
import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const ProfileTabInformation = () => {
  //   let [categories] = useState({
  //     Recent: [
  //       {
  //         id: 1,
  //         title: "Does drinking coffee make you smarter?",
  //         date: "5h ago",
  //         commentCount: 5,
  //         shareCount: 2,
  //       },
  //       {
  //         id: 2,
  //         title: "So you've bought coffee... now what?",
  //         date: "2h ago",
  //         commentCount: 3,
  //         shareCount: 2,
  //       },
  //     ],
  //     Popular: [
  //       {
  //         id: 1,
  //         title: "Is tech making coffee better or worse?",
  //         date: "Jan 7",
  //         commentCount: 29,
  //         shareCount: 16,
  //       },
  //       {
  //         id: 2,
  //         title: "The most innovative things happening in coffee",
  //         date: "Mar 19",
  //         commentCount: 24,
  //         shareCount: 12,
  //       },
  //     ],
  //     Trending: [
  //       {
  //         id: 1,
  //         title: "Ask Me Anything: 10 answers to your questions about coffee",
  //         date: "2d ago",
  //         commentCount: 9,
  //         shareCount: 5,
  //       },
  //       {
  //         id: 2,
  //         title: "The worst advice we've ever heard about coffee",
  //         date: "4d ago",
  //         commentCount: 1,
  //         shareCount: 2,
  //       },
  //     ],
  //   });

  return (
    <div>
      <div className="w-full  flex-col px-2  sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl  justify-center p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5  ",
                  selected
                    ? "border-b-2 border-purpleC dark:border-purpleLightC px-3 text-purpleC dark:text-purpleLightC shadow"
                    : "text-grayC  hover:text-purpleLightC "
                )
              }
            >
              Followers
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "border-b-2 border-purpleC dark:border-purpleLightC px-3 text-purpleC dark:text-purpleLightC shadow"
                    : "text-grayC  hover:text-purpleLightC"
                )
              }
            >
              Posts
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "px-3  py-2.5 text-sm font-medium leading-5",
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
                  "px-3  py-2.5 text-sm font-medium leading-5",
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
            <Tab.Panel>
              <p>Followers</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Posts</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Photos</p>
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
