import { Role } from "@/lib/enum";
import { Bolt, Home, LogOut, LucideIcon, Settings, User2 } from "lucide-react";

export interface NavProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    url: string;
    roles: Role[];
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
    title: "Customer",
    label: "",
    icon: User2,
    url: "/dashboard/customer",
    roles: [Role.Admin],
  },
  {
    title: "User",
    label: "",
    icon: User2,
    url: "/dashboard/user",
    roles: [Role.Customer],
  },
  {
    title: "Setup",
    label: "",
    icon: Bolt,
    url: "/dashboard/setup",
    roles: [Role.Customer],
  },
];

export const logoutNavigation: NavProps["links"] = [
  {
    title: "Logout",
    label: "",
    icon: LogOut,
    url: "/dashboard",
    roles: [],
  },
];
