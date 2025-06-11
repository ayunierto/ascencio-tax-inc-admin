import { Navigate, Outlet } from 'react-router';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '../components';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { BreadCrumb } from '@/components/Breadcrumb';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { status, user, logout } = useAuthStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (status === 'unauthenticated') {
    return Navigate({ to: '/auth' });
  }

  if (user) {
    if (!user.roles.includes('admin')) {
      toast.error(
        'You do not have permission to access this page. Please contact your administrator.',
        {
          position: 'top-center',
        }
      );
      logout();
      return Navigate({ to: '/auth' });
    }
  }

  return (
    <SidebarProvider open={sidebarOpen}>
      <AppSidebar toggleSidebar={toggleSidebar} />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" onClick={toggleSidebar} />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <BreadCrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
