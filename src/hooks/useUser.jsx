import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUser = () => {
  const { user, setLoading } = useAuth();
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`/api/Story?email=${user?.email}`).then((res) => res.json()),
  });
  return [data, refetch];
};

export default useUser;
