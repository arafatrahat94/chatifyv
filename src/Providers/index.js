"use client";

import AuthProvider from "./AuthProvider";

const Providers = ({ children }) => {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
};

export default Providers;
