"use client";

import { dashboardNavigation, logoutNavigation } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import { Logout } from "../common/logout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { Separator } from "../ui/separator";
import { TooltipProvider } from "../ui/tooltip";
import { AccountSwitcher } from "./account-switcher";
import { Nav } from "./nav";
import useUserStore from "@/stores/user";

interface DashboardBoardProps {
  accounts: {
    label: string;
    email: string;
    icon: ReactNode;
  }[];
  navCollapsedSize: number;
  children: ReactNode;
}

const defaultLayout = [265, 1095];

export function DashBoard({
  accounts,
  navCollapsedSize,
  children,
}: Readonly<DashboardBoardProps>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUserStore();

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full min-h-screen items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={dashboardNavigation}
            userRole={user?.role}
          />
          <Separator />
          <div className="w-full p-2">
            <Logout isCollapsed={isCollapsed} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
