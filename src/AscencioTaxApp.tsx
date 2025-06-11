import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppRouter } from './AppRouter';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from './components/Loader';

const queryClient = new QueryClient();

export const AscencioTaxApp = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  if (status === 'checking') {
    return <Loader fullScreen={true} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <AppRouter />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
