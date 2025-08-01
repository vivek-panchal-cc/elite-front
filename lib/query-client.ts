import { QueryClient } from "@tanstack/react-query";

const MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: process.env.NODE_ENV === "production",
      gcTime: 30 * MINUTE, // remove cache data after query becomes inactive and again try to mount that component trigger a fresh first time fetch
      staleTime: 20 * MINUTE, // make data stale whether query is active or inactive and do background refetch on again component mounts
      retry: 0,
    },
  },
});
