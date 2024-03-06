import { Role } from "@/lib/enum";
import { Home, LogOut, LucideIcon, MessageSquare } from "lucide-react";

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    url: string;
    roles?: Role[];
  }[];
  userRole?: Role;
}

export const dashboardNavigation: NavProps["links"] = [
  {
    title: "Dashboard",
    label: "",
    icon: Home,
    url: "/dashboard",
    roles: [],
  },
  {
    title: "Chat",
    label: "",
    icon: MessageSquare,
    url: "/dashboard/chat",
    roles: [],
  },
];

export const logoutNavigation: NavProps["links"] = [
  {
    title: "Logout",
    label: "",
    icon: LogOut,
    url: "/login",
    roles: [],
  },
];
