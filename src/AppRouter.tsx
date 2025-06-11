import { lazy, Suspense } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from './auth/layout/AuthLayout';
import { useAuthStore } from './auth/store/useAuthStore';
import { Loader } from '@/components/Loader';

import { SigninPage } from './auth/pages';
import { PrivateRoute } from './auth/components';

const DashboardLayout = lazy(async () => {
  return import('./dashboard/layouts/DashboardLayout');
});
const DashboardPage = lazy(async () => {
  return import('./dashboard/pages/DashboardPage');
});
const AppointmentsPage = lazy(async () => {
  return import('./dashboard/pages/appointments/pages/AppointmentsPage');
});
const ServicesPage = lazy(async () => {
  return import('./dashboard/pages/services/pages/ServicesPage');
});
const SettingsPage = lazy(async () => {
  return import('./dashboard/pages/settings/pages/SettingsPage');
});
const UsersPage = lazy(async () => {
  return import('./dashboard/pages/users/pages//UsersPage');
});
const SignupPage = lazy(async () => {
  return import('./auth/pages/SignupPage');
});

export const AppRouter = () => {
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
            <Suspense fallback={<Loader fullScreen />}>
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
