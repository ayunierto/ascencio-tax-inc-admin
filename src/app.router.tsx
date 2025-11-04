import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AppLayout } from './app/layout/AppLayout';
import { HomePage } from './app/pages/home/HomePage';
import { AppointmentsPage } from './app/pages/appointments/AppointmentsPage';
import { SignInPage } from './auth/pages/signin/SignInPage';
import { SignUpPage } from './auth/pages/signup/SignupPage';
import { NotFoundPage } from './NotFoundPage';
import { AdminRoute, UnAuthenticatedRoute } from './components/ProtectedRoutes';
import { VerifyEmailPage } from './auth/pages/verify-email/VerifyEmailPage';
import ForgotPasswordPage from './auth/pages/forgot-password/ForgotPasswordPage';
import ResetPasswordPage from './auth/pages/reset-password/ResetPasswordPage';
import { DashboardPage } from './admin/pages/dashboard/DashboardPage';
import { StaffPage } from './admin/pages/staff/StaffPage';
import { StaffMemberPage } from './admin/pages/staff/StaffMemberPage';
import { SchedulesPage } from './admin/pages/schedules/SchedulesPage';
import { SchedulePage } from './admin/pages/schedules/SchedulePage';
import { ServicesPage } from './admin/pages/services/ServicesPage';
import { ServicePage } from './admin/pages/services/ServicePage';
import { SettingsPage } from './admin/pages/settings/SettingsPage';
import { UsersPage } from './admin/pages/users/UsersPage';
import { UserPage } from './admin/pages/users/UserPage';
import { BookPage } from './app/pages/book/BookPage';
import { AdminAppointmentsPage } from './admin/pages/appointments/AdminAppointmentsPage';
import { AdminAppointmentPage } from './admin/pages/appointments/AdminAppointmentPage';

const AuthLayout = lazy(() => import('./auth/layout/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layout/AdminLayout'));

export const appRouter = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'book/:id', element: <BookPage /> },
    ],
  },
  // Auth routes
  {
    path: '/auth',
    element: (
      <UnAuthenticatedRoute>
        <AuthLayout />
      </UnAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={'/auth/signin'} /> },
      { path: 'signin', element: <SignInPage /> },
      { path: 'signup', element: <SignUpPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'password-reset', element: <ResetPasswordPage /> },
    ],
  },
  // Admin routes
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'users/:id', element: <UserPage /> },
      { path: 'staff', element: <StaffPage /> },
      { path: 'staff/:id', element: <StaffMemberPage /> },
      { path: 'schedules', element: <SchedulesPage /> },
      { path: 'schedules/:id', element: <SchedulePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:id', element: <ServicePage /> },
      { path: 'appointments', element: <AdminAppointmentsPage /> },
      { path: 'appointments/:id', element: <AdminAppointmentPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
