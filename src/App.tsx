import { AscencioTaxApp } from './AppRouter';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

function App() {
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
