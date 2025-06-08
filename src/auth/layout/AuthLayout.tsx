import { ToggleTheme } from '@/components/ToggleTheme';
import { Link, Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className="flex bg-muted min-h-svh w-full flex-col">
      <div className="flex items-center justify-end px-4 h-12">
        <ToggleTheme />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 flex-grow">
        <div className="flex w-full flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <img src="/logo.png" alt="Logo" className="rounded-lg w-9 h-9" />
            Ascencio Tax Inc.
          </Link>

          <Outlet />
        </div>
      </div>
    </div>
  );
};
