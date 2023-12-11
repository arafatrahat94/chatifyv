import { AuthContextProvider } from "@/Providers/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const authData = useContext(AuthContextProvider);
  return authData;
};

export default useAuth;
