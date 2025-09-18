import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./app/layout/AppLayout";
import { HomePage } from "./app/pages/home/HomePage";
import { AppointmentPage } from "./app/pages/appointment/AppointmentPage";
import { AppointmentsPage } from "./app/pages/appointments/AppointmentsPage";
import { SignInPage } from "./auth/pages/signin/SignInPage";
import { SignUpPage } from "./auth/pages/signup/SignupPage";
import { NotFoundPage } from "./NotFoundPage";
import { AdminRoute, UnAuthenticatedRoute } from "./components/ProtectedRoutes";
import { VerifyEmailPage } from "./auth/pages/verify-email/VerifyEmailPage";
import ForgotPasswordPage from "./auth/pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "./auth/pages/reset-password/ResetPasswordPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { StaffPage } from "./admin/pages/staff/StaffPage";
import { StaffMemberPage } from "./admin/pages/staff/StaffMemberPage";
import { SchedulesPage } from "./admin/pages/schedules/SchedulesPage";
import { SchedulePage } from "./admin/pages/schedules/SchedulePage";
import { ServicesPage } from "./admin/pages/services/ServicesPage";
import { ServicePage } from "./admin/pages/services/ServicePage";
import { SettingsPage } from "./admin/pages/settings/SettingsPage";

const AuthLayout = lazy(() => import("./auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));

export const appRouter = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "appointments", element: <AppointmentsPage /> },
      { path: "appointment/:id", element: <AppointmentPage /> },
    ],
  },
  // Auth routes
  {
    path: "/auth",
    element: (
      <UnAuthenticatedRoute>
        <AuthLayout />
      </UnAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to={"/auth/signin"} /> },
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "password-reset", element: <ResetPasswordPage /> },
    ],
  },
  // Admin routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "staff/:id", element: <StaffMemberPage /> },
      { path: "schedules", element: <SchedulesPage /> },
      { path: "schedules/:id", element: <SchedulePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:id", element: <ServicePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
