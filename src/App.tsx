import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AscencioTaxApp } from './AppRouter';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from './components/Loader';

const queryClient = new QueryClient();

function App() {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // If status is 'checking', we can show a loading state or spinner
  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <QueryClientProvider client={queryClient}>
        <AscencioTaxApp />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
