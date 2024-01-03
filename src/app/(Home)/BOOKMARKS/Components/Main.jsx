"use client";

import useAuth from "@/hooks/useAuth";
import useSWR from "swr";
import SavedPOst from "./SavedPOst";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const BookMarkMain = () => {
  const { user } = useAuth();
  //
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllPost = [], mutate } = useSWR(
    `/api/SavePost?email=${user?.email}`,
    fetcher
  );

  useEffect(() => {
    if (!user) {
      redirect("/SIgnInUp/SignIn", "replace");
    }
  }, []);

  return (
    <div>
      {AllPost.length < 1 && (
        <h1 className="min-h-screen flex items-center font-rubik text-purpleLightC justify-center w-full">
          There is no bookmarked post here
        </h1>
      )}
      <h1 className=" flex items-center font-rubik text-xl mt-3 ms-3 font-semibold text-purpleLightC  w-full">
        Bookmarks
      </h1>
      {AllPost.map((x) => (
        <>
          <SavedPOst mutate={mutate} datas={x}></SavedPOst>
        </>
      ))}
    </div>
  );
};

export default BookMarkMain;
