import { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router';

import { DashboardLayout } from './dashboard/layout/DashboardLayout';
import { useAuthStore } from './auth/store/useAuthStore';

export const AscencioTaxApp = () => {
  const { checkStatus } = useAuthStore();

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await checkStatus();
      console.log('Status:', status);
    };
    fetchStatus();
  }, [checkStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index path="/" element={<div>Dashboard Home</div>} />
          <Route path="settings" element={<div>Dashboard Settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
