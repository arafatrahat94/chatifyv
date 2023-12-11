import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app from "@/Firebase/firebase.config";
export const AuthContextProvider = createContext(null);

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (CurrenUser) => {
      setUser(CurrenUser);
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);
  console.log(user);
  const authData = {
    createU,
    glog,
    signIn,
    forgotPass,
  };
  return (
    <AuthContextProvider.Provider value={authData}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;
