import { ToggleTheme } from '@/components/ToggleTheme';
import { Outlet } from 'react-router';

export const AuthLayout = () => {
  return (
    <div className='flex bg-muted min-h-svh w-full flex-col'>
      <div className='flex items-center justify-end px-4 h-12'>
        <ToggleTheme />
      </div>

      <div className='flex flex-col items-center justify-center gap-6 p-6 md:p-10'>
        <div className='flex w-full flex-col gap-6'>
          <div className='flex items-center justify-center pt-2'>
            <img
              src='/logo.png'
              alt='Logo'
              className='rounded-lg w-14 h-w-14'
            />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
