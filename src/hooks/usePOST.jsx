import useSWR from "swr";

const usePOST = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllPost = [], mutate: mutateAllPost } = useSWR(
    "/api/Post",
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  return { AllPost, mutateAllPost };
};

export default usePOST;
