"use client";
import SINGLEPOST from "@/Components/HOMEPAGE/SINGLEPOST";
import useSWR from "swr";

const Dynamic = ({ params }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllPost = [], mutate } = useSWR(`/api/Post/${params}`, fetcher);
  console.log(AllPost);
  return (
    <div className="mx-3">
      <SINGLEPOST datas={AllPost}></SINGLEPOST>
    </div>
  );
};

export default Dynamic;
