import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUser = () => {
  const { user, setLoading, refetch } = useAuth();
  const { isPending, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/NewUser?email=${user?.email}`).then(
        (res) => res.json()
      ),
  });
  if (isPending) {
    setLoading(true);
  } else {
    setLoading(false);
  }
  if (error) return error;
  return [data, refetch];
};

export default useUser;
