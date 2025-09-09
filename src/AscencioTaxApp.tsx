import { PropsWithChildren } from "react";
import { RouterProvider } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/sonner";
import { appRouter } from "./app.router";
import { ThemeProvider } from "./components/theme-provider";
import { useAuthStore } from "./auth/store/useAuthStore";
import { Loader } from "./components/Loader";

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { checkAuthStatus } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["check-auth"],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
  if (isLoading) {
    return <Loader fullScreen showText />;
  }
  return children;
};

export const AscencioTaxApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <TooltipProvider>
          <CheckAuthProvider>
            <RouterProvider router={appRouter} />
          </CheckAuthProvider>
          <Toaster position="top-center" />
        </TooltipProvider>
        <ReactQueryDevtools />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
