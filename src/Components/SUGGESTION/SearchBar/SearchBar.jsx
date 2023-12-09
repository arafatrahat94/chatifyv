"use client";

import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div>
      <div className="relative mb-[20px] lg:mb-0 mt-[20px] flex justify-center items-center">
        <input
          placeholder={`Search`}
          className="lg:h-[55px] h-[40px] border-[#A8A8A8] ps-4 outline-none border rounded-md pe-4 bg-secondaryBgLight w-[85%] dark:bg-grayC text-grayC dark:text-white"
          type="text"
        />
        <button className="px-5 dark:bg-purpleLightC bg-purpleC absolute right-[25px] lg:right-[25px] xl:right-[35px] text-sm lg:text-base h-[32px] lg:h-[45px] text-white rounded-md">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
