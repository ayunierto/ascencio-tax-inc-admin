import * as React from "react";
import {
  Bot,
  Briefcase,
  Calendar,
  CalendarIcon,
  LayoutDashboard,
  Settings2,
  Users2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";
import { NavUser } from "./nav-user";
import { useAuthStore } from "@/auth/store/useAuthStore";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Bot },
  { title: "Schedules", url: "/admin/schedules", icon: CalendarIcon },
  { title: "Staff", url: "/admin/staff", icon: Users2Icon },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Settings", url: "/admin/settings", icon: Settings2 },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/" className="p-1">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="rounded-md w-6 h-6"
                />

                <span className="text-base font-semibold">
                  Ascencio Tax Inc.
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          {navItems.map((item) => (
            <SidebarMenu key={item.title}>
              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton
                  asChild
                  className={isActiveRoute(item.url) ? "bg-sidebar-accent" : ""}
                >
                  <Link to={item.url} className={``}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: "/default-avatar.png",
            name: `${user?.firstName} ${user?.lastName}`,
            email: user?.email || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
