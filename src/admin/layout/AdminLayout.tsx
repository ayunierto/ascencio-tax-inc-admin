import { Outlet } from "react-router";
import { AppSidebar } from "../components/app-sidebar";
import { AnimatedPage } from "@/components/AnimatedPage";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

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
