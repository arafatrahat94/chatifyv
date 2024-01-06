"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setsearchLoading] = useState(false);
  console.log(searchText);
  const searchNow = () => {
    setsearchLoading(true);
    fetch(`/api/Search?search=${searchText}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
        console.log(data);

        setsearchLoading(false);
      });
  };

  return (
    <div>
      <div className="relative mb-[20px] lg:mb-0 mt-[20px] flex justify-center items-center">
        <input
          onChange={(e) => {
            setSearchText(e.target.value);
            if (e.target.value === "") {
              setSearchResult([]);
            }
          }}
          placeholder={`Search`}
          className="lg:h-[55px] h-[40px] border-[#A8A8A8] ps-4 outline-none border rounded-md pe-4 bg-secondaryBgLight w-[85%] dark:bg-grayC text-grayC dark:text-white"
          type="text"
        />
        <button
          onClick={searchNow}
          className="px-5 z-20 dark:bg-purpleLightC bg-purpleC absolute right-[25px] lg:right-[25px] xl:right-[35px] text-sm lg:text-base h-[32px] lg:h-[45px] text-white rounded-md"
        >
          {searchLoading ? (
            <span className="loading flex items-center justify-center loading-ring loading-sm"></span>
          ) : (
            <FaSearch />
          )}
        </button>
      </div>
      <div className="mt-5 mb-5">
        {searchResult.length > 0 && (
          <h1 className="ms-5 mb-2 text-purpleLightC">Search Result :</h1>
        )}

        {searchResult.length > 0 &&
          searchResult.map((x) => (
            <>
              <Link
                href={`/${x?.email}`}
                className="mx-5 bg-secondaryBgLight dark:bg-secondaryBgDark p-1
              rounded-2xl flex items-center border border-purpleLightC"
              >
                <div className="w-[40px] h-[40px]">
                  <Image
                    src={x?.profileImg}
                    alt="profileImg"
                    width={500}
                    height={500}
                    className="object-cover rounded-full w-full h-full"
                  ></Image>
                </div>
                <div>
                  <h1 className="text-sm ms-1">{x?.userName}</h1>
                </div>
              </Link>
            </>
          ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
    </div>
  );
};

export default SearchBar;
