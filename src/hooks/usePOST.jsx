import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const usePOST = () => {
  const {
    isPending,
    error,
    data: AllPost = [],
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch(`/api/Post`).then((res) => res.json()),
  });
  console.log(AllPost);
  return [AllPost, refetch];
};

export default usePOST;
