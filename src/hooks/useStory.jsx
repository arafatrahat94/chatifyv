import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { useState } from "react";

const useStory = () => {
  const { user, setLoading } = useAuth();
  const [AllStory, setAllStory] = useState(null);
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["Story"],
    queryFn: () =>
      fetch(`/api/Story?email=${user?.email}`).then((res) => res.json()),
  });
  if (user) {
    const filterData = data.filter((x) => x.profileId !== user._id);
    setAllStory(filterData);

    return [AllStory, refetch];
  }
  if (!user) {
    setAllStory(data);
    return [AllStory, refetch];
  }
};

export default useStory;
