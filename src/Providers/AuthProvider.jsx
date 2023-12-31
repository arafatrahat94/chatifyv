import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "@/Firebase/firebase.config";
import { useQuery } from "@tanstack/react-query";
import useSWR from "swr";
export const AuthContextProvider = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR(
    user ? `/api/NewUser?email=${user?.email}` : null,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  // const create user function
  const createU = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const glog = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };
  const signIn = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const forgotPass = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrenUser) => {
      setUser(CurrenUser);

      setLoading(false);
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);
  console.log(user);
  const authData = {
    createU,
    glog,
    signIn,
    forgotPass,
    user,
    logOut,
    setLoading,
  };
  return (
    <AuthContextProvider.Provider value={authData}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
