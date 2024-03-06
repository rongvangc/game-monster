import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { removeAllCookie } from "@/helpers/cookie";

export const Logout = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { push } = useRouter();

  const handleLogout = useCallback(() => {
    removeAllCookie();
    push("/login");
  }, [push]);

  return (
    <Button
      variant="ghost"
      size={isCollapsed ? "icon" : "sm"}
      className={cn("gap-2 w-full justify-start", isCollapsed ? "p-2" : "")}
      onClick={handleLogout}
    >
      <LogOut className={isCollapsed ? "h-4 w-4" : "h-4 w-4"} />
      {isCollapsed ? "" : "Logout"}
    </Button>
  );
};
