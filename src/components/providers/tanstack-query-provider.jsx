"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: 500,
      gcTime: 1000 * 60 * 2,
      refetchInterval: 1000 * 60 * 5,
    },
  },
});

export default function TanstackQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
