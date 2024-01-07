import useSWR from "swr";
import useAuth from "./useAuth";

const useNotification = () => {
  const { user } = useAuth();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: AllCommentsUpdate = [] } = useSWR(
    `/api/PostCommentLikedNotification/?email=${user?.email}`,
    fetcher,
    {
      refreshInterval: 2000,
    }
  );

  return AllCommentsUpdate;
};

export default useNotification;
