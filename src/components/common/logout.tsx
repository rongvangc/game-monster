import {
  ArrowLeftToLine,
  ArrowRightToLine,
  LogOut,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { removeAllCookie } from "@/helpers/cookie";

export const Logout = ({
  isCollapsed,
  onCollapse,
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
}) => {
  const { push } = useRouter();

  const handleLogout = useCallback(() => {
    removeAllCookie();
    push("/login");
  }, [push]);

  return (
    <div className={`flex gap-2 ${isCollapsed ? "flex-col" : ""}`}>
      <Button
        variant="outline"
        size={isCollapsed ? "icon" : "sm"}
        className={cn("gap-2 w-full justify-start", isCollapsed ? "p-2" : "")}
        onClick={handleLogout}
      >
        <LogOut className={"h-4 w-4"} />
        {isCollapsed ? "" : "Logout"}
      </Button>
      <Button onClick={onCollapse} size={isCollapsed ? "icon" : "sm"}>
        {isCollapsed ? (
          <PanelRightClose size={14} />
        ) : (
          <PanelLeftClose size={14} />
        )}
      </Button>
    </div>
  );
};
