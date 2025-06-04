import { Suspense, useEffect } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from './auth/layout/AuthLayout';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from '@/components/Loader';
import { HomePage, SettingsPage } from './dashboard/pages';
import { SignupPage, SigninPage } from './auth/pages';
import { DashboardLayout } from './dashboard/layout/DashboardLayout';
import { PrivateRoute } from './auth/components';

export const AscencioTaxApp = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // If status is 'checking', we can show a loading state or spinner
  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<SigninPage />} />
          <Route path="/auth/signin" element={<SigninPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center bg-background">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              }
            >
              <PrivateRoute isAuthenticated={status === 'authenticated'}>
                <DashboardLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
