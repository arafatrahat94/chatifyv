"use client";

import Link from "next/link";
import { redirect } from "next/navigation";

const GlobalError = (error, reset) => {
  let currentLocation = window.origin;
  const handleReload = () => {
    redirect((window.location.href = currentLocation));
  };
  console.log(currentLocation);
  return (
    <div>
      <div className="min-h-screen w-full flex justify-center items-center dark:bg-primaryBgDark bg-white">
        <div className="flex-col flex justify-center items-center">
          {" "}
          <div class="loading-barE">Error</div>
          <h1 className="my-[24px] font-bold text-purpleLightC font-mono uppercase">
            {error.message || "something went wrong"}
          </h1>
          <div>
            <button
              className="btn btn-error bg-purpleLightC border-none text-white"
              onClick={handleReload}
            >
              Retry?
            </button>{" "}
            /{" "}
            <Link href="/" className="text-purpleLightC btn-outline btn ">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
