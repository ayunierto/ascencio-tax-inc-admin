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
import DashboardPage from "./admin/pages/dashboard/DashboardPage";
import { AdminRoute, UnAuthenticatedRoute } from "./components/ProtectedRoutes";
import { VerifyEmailPage } from "./auth/pages/verify-email/VerifyEmailPage";

const AuthLayout = lazy(() => import("./auth/layout/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layout/AdminLayout"));

export const appRouter = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "appointment/:id",
        element: <AppointmentPage />,
      },
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
      {
        index: true,
        element: <Navigate to={"/auth/signin"} />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
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
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "services",
        element: <AdminServicesPage />,
      },
      {
        path: "services/:id",
        element: <AdminServicesPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
