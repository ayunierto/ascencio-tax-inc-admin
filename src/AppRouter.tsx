import { lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthLayout } from './auth/layout/AuthLayout';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from '@/components/Loader';
import { DashboardPage, ServicesPage } from './dashboard/pages';
import { SignupPage, SigninPage } from './auth/pages';
import { PrivateRoute } from './auth/components';
import { AppointmentsPage } from './dashboard/pages/';
import SettingsPage from './dashboard/pages/SettingsPage';
import UsersPage from './dashboard/pages/UsersPage';

const DashboardLayout = lazy(async () => {
  return import('./dashboard/layout/DashboardLayout');
});

export const AscencioTaxApp = () => {
  const { status } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<SigninPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <PrivateRoute isAuthenticated={status === 'authenticated'}>
                <DashboardLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/services" element={<ServicesPage />} />
          <Route
            path="/dashboard/appointments"
            element={<AppointmentsPage />}
          />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
