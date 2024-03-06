"use client";

import ChatBox from "@/components/chat/chat-box";
import Rooms from "@/components/chat/rooms";
import SearchUser from "@/components/chat/search-user";
import UserBox from "@/components/chat/user-box";
import { Button } from "@/components/ui/button";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { getAllUsers } from "@/services/user";
import useUserStore from "@/stores/user";
import { useQuery } from "@tanstack/react-query";
import { Expand } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";

const defaultLayout = [265, 1095];

export default function ChatPage() {
  const { setAllUsers } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const { data, isSuccess } = useQuery({
    queryKey: ["all-user"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (isSuccess) {
      setAllUsers(data);
    }
  }, [data, isSuccess, setAllUsers]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full min-h-screen items-stretch bg-slate-100 p-2 gap-2"
    >
      <ResizablePanel
        ref={ref}
        defaultSize={defaultLayout[0]}
        collapsedSize={0}
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
          isCollapsed && "min-w-[108px]",
          "relative transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex gap-2 p-2 rounded-md bg-white h-full">
          <SearchUser isCollapsed={isCollapsed} />
          <div className="flex-1">
            <Button size="icon" onClick={collapsePanel}>
              <Expand size={14} />
            </Button>
          </div>
        </div>
        <div className="pb-2">
          <Rooms />
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <UserBox />
        <ChatBox />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
