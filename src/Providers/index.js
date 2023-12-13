"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import AuthProvider from "./AuthProvider";
const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Providers;
