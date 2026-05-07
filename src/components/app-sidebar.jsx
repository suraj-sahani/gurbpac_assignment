"use client";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/use-session";
import { RadioIcon } from "@hugeicons/core-free-icons/index";
import {
  DashboardSquare02Icon,
  Files01Icon,
  Folder02Icon,
  ShieldBanIcon,
  Upload05Icon,
} from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const teacherNav = [
  {
    title: "Dashboard",
    url: "/teacher",
    icon: (
      <HugeiconsIcon
        icon={DashboardSquare02Icon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
  {
    title: "Upload Content",
    url: "/teacher/upload-content",
    icon: (
      <HugeiconsIcon
        icon={Upload05Icon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
  {
    title: "My Content",
    url: "/teacher/my-content",
    icon: (
      <HugeiconsIcon
        icon={Folder02Icon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
];

const principalNav = [
  {
    title: "Dashboard",
    url: "/principal",
    icon: (
      <HugeiconsIcon
        icon={DashboardSquare02Icon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
  {
    title: "Pending Approvals",
    url: "/principal/pending-approval",
    icon: (
      <HugeiconsIcon
        icon={ShieldBanIcon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
  {
    title: "All Content",
    url: "/principal/all-content",
    icon: (
      <HugeiconsIcon
        icon={Files01Icon}
        size={24}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
];

export function AppSidebar({ ...props }) {
  const { session, loading } = useSession();
  const role = session?.user?.role;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href={"/"} />}
              className="data-[slot=sidebar-menu-button]:p-1.75!"
            >
              <HugeiconsIcon
                icon={RadioIcon}
                size={32}
                color="currentColor"
                strokeWidth={2}
              />

              <p className="text-sm font-semibold leading-tight">EduCast</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {role === "teacher"
            ? teacherNav.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton
                    tooltip={link.title}
                    render={<Link href={link.url} />}
                  >
                    {link.icon} {link.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            : role === "principal"
              ? principalNav.map((link) => (
                  <SidebarMenuItem key={link.title}>
                    <SidebarMenuButton
                      tooltip={link.title}
                      render={<Link href={link.url} />}
                    >
                      {link.icon} {link.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              : null}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
