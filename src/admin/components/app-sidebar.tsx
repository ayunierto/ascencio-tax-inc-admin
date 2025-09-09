import * as React from "react";
import {
  Bot,
  Briefcase,
  Calendar,
  LayoutDashboard,
  Settings2,
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
import { TeamSwitcher } from "./team-switcher";
import { NavUser } from "./nav-user";
import { useAuthStore } from "@/auth/store/useAuthStore";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Bot },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Appointments", url: "/admin/appointments", icon: Calendar },
  { title: "Settings", url: "/admin/settings", icon: Settings2 },
];

const data = {
  teams: [
    {
      name: "Ascencio Tax Inc",
      logo: Briefcase,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  const { user } = useAuthStore();

  const isActiveRoute = (route: string) => {
    return pathname === route;
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
