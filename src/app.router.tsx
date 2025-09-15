import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { AppLayout } from "./app/layout/AppLayout";
import { HomePage } from "./app/pages/home/HomePage";
import { AppointmentPage } from "./app/pages/appointment/AppointmentPage";
import { AppointmentsPage } from "./app/pages/appointments/AppointmentsPage";
import { SignInPage } from "./auth/pages/signin/SignInPage";
import { SignUpPage } from "./auth/pages/signup/SignupPage";
import AdminServicesPage from "./admin/pages/services/AdminServicesPage";
import { NotFoundPage } from "./NotFoundPage";
import { AdminRoute, UnAuthenticatedRoute } from "./components/ProtectedRoutes";
import { VerifyEmailPage } from "./auth/pages/verify-email/VerifyEmailPage";
import ForgotPasswordPage from "./auth/pages/forgot-password/ForgotPasswordPage";
import ResetPasswordPage from "./auth/pages/reset-password/ResetPasswordPage";
import { DashboardPage } from "./admin/pages/dashboard/DashboardPage";
import { AdminServicePage } from "./admin/pages/services/AdminServicePage";
import { AdminStaffPage } from "./admin/pages/staff/AdminStaffPage";
import { AdminAllStaffsPage } from "./admin/pages/staff/AdminAllStaffPage";
import { SchedulesPage } from "./admin/pages/schedules/SchedulesPage";
import { SchedulePage } from "./admin/pages/schedules/SchedulePage";

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
      { path: "schedules", element: <SchedulesPage /> },
      { path: "schedules/:id", element: <SchedulePage /> },
      { path: "staff", element: <AdminAllStaffsPage /> },
      { path: "staff/:id", element: <AdminStaffPage /> },
      { path: "services", element: <AdminServicesPage /> },
      { path: "services/:id", element: <AdminServicePage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
