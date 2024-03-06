"use client";

import { cn } from "@/lib/utils";
import { dashboardNavigation } from "@/navigation";
import useUserStore from "@/stores/user";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Logout } from "../common/logout";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Separator } from "../ui/separator";
import { TooltipProvider } from "../ui/tooltip";
import LogoPng from "./../../../public/images/logo.png";
import { Nav } from "./nav";

interface DashboardBoardProps {
  navCollapsedSize: number;
  children: ReactNode;
}

const defaultLayout = [265, 1095];

export function DashBoard({
  navCollapsedSize,
  children,
}: Readonly<DashboardBoardProps>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUserStore();
  const ref = useRef<ImperativePanelHandle>(null);

  const collapsePanel = () => {
    const panel = ref.current;

    if (panel) {
      if (isCollapsed) {
        panel.expand();
      } else {
        panel.collapse();
      }
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full min-h-screen items-stretch"
      >
        <ResizablePanel
          ref={ref}
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
            isCollapsed && "min-w-[50px]",
            "relative transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center",
              isCollapsed ? "h-[52px] justify-center" : "px-2"
            )}
          >
            <Image src={LogoPng} alt="Logo" width={36} />
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={dashboardNavigation} />
          <Separator />
          <div className="w-full p-2 absolute bottom-0">
            <Logout isCollapsed={isCollapsed} onCollapse={collapsePanel} />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
