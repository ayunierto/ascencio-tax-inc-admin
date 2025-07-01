import { useEffect } from 'react';

import { AppRouter } from './router/AppRouter';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from './components/Loader';

export const AscencioTaxApp = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  if (status === 'checking') {
    return <Loader fullScreen={true} />;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <AppRouter />
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
};
