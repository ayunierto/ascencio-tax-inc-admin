import * as React from 'react';
import {
  Bot,
  Briefcase,
  Calendar,
  LayoutDashboard,
  Settings2,
} from 'lucide-react';

import { NavUser, TeamSwitcher } from '@/dashboard/components';
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
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/auth/store/useAuthStore';
import { NavLink, useLocation } from 'react-router';
import { useState } from 'react';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Users', url: '/dashboard/users', icon: Bot },
  { title: 'Services', url: '/dashboard/services', icon: Briefcase },
  { title: 'Appointments', url: '/dashboard/appointments', icon: Calendar },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings2 },
];

const data = {
  teams: [
    {
      name: 'Ascencio Tax Inc',
      logo: Briefcase,
      plan: 'Enterprise',
    },
  ],

  // navMain: [
  //   {
  //     title: 'Services',
  //     url: '#',
  //     icon: Briefcase,
  //     isActive: true,
  //     items: [
  //       {
  //         title: 'List Services',
  //         url: '#',
  //       },
  //       {
  //         title: 'Starred',
  //         url: '#',
  //       },
  //       {
  //         title: 'Settings',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Models',
  //     url: '#',
  //     icon: Bot,
  //     items: [
  //       {
  //         title: 'Genesis',
  //         url: '#',
  //       },
  //       {
  //         title: 'Explorer',
  //         url: '#',
  //       },
  //       {
  //         title: 'Quantum',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Documentation',
  //     url: '#',
  //     icon: BookOpen,
  //     items: [
  //       {
  //         title: 'Introduction',
  //         url: '#',
  //       },
  //       {
  //         title: 'Get Started',
  //         url: '#',
  //       },
  //       {
  //         title: 'Tutorials',
  //         url: '#',
  //       },
  //       {
  //         title: 'Changelog',
  //         url: '#',
  //       },
  //     ],
  //   },
  //   {
  //     title: 'Settings',
  //     url: '#',
  //     icon: Settings2,
  //     items: [
  //       {
  //         title: 'General',
  //         url: '#',
  //       },
  //       {
  //         title: 'Team',
  //         url: '#',
  //       },
  //       {
  //         title: 'Billing',
  //         url: '#',
  //       },
  //       {
  //         title: 'Limits',
  //         url: '#',
  //       },
  //     ],
  //   },
  // ],
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { user } = useAuthStore();
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  if (!user) {
    throw new Error('User not authenticated');
  }

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
                  className={activeLink === item.url ? 'bg-sidebar-accent' : ''}
                >
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => {
                      return isActive ? 'active' : '';
                    }}
                    onClick={() => setActiveLink(item.url)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: '/default-avatar.png',
            name: user.name,
            email: user.email,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
