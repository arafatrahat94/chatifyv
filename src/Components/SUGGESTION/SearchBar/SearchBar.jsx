"use client";

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
      <div
        // onClick={() =>
        //   document.getElementById("my_modal_SearchBar").showModal()
        // }
        className="relative mb-[20px] lg:mb-0 mt-[20px] flex justify-center items-center"
      >
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
      <div>
        {searchResult.length > 0 &&
          searchResult.map((x) => (
            <>
              <div>
                <h1>h</h1>
              </div>
            </>
          ))}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {/* <dialog id="my_modal_SearchBar" className="modal z-10">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
    </div>
  );
};

export default SearchBar;
