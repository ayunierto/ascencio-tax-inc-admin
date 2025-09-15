import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Outlet } from "react-router";
import { AnimatedPage } from "@/components/AnimatedPage";

const AdminLayout = () => {
  return (
    <AnimatedPage>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </AnimatedPage>
  );
};

export default AdminLayout;
