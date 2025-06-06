import { ToggleTheme } from '@/components/ToggleTheme';
import { GalleryVerticalEnd } from 'lucide-react';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <>
      <div className="h-12 bg-background flex items-center justify-end px-4">
        <ToggleTheme />
      </div>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-6">
          <a
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ascencio Tax Inc.
          </a>
          <Outlet />
        </div>
      </div>
    </>
  );
};
