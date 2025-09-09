import { useAuthStore } from "@/auth/store/useAuthStore";
import { ForbiddenPage } from "@/ForbiddenPage";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "loading") return null;

  // TODO: Add query param to redirect after login. E.g. /auth/signin?redirectTo=/dashboard, lastly handle this in the SignIn page
  if (authStatus === "unauthenticated")
    return <Navigate to="/auth/signin" replace />;

  return <>{children}</>;
};

export const UnAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const { authStatus } = useAuthStore();

  if (authStatus === "loading") return null;

  if (authStatus === "authenticated") return <Navigate to="/" replace />;

  return <>{children}</>;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { authStatus, isAdmin } = useAuthStore();

  if (authStatus === "loading") return null;

  if (authStatus === "unauthenticated")
    return <Navigate to="/auth/signin" replace />;

  if (!isAdmin()) return <ForbiddenPage />;

  return <>{children}</>;
};
