import { ShieldX, X } from "lucide-react";
import { toast } from "sonner";

export const toastError = (message: string) => {
  toast.error(message, {
    duration: 30000,
    style: {
      background: "#ef4444",
      color: "white",
      border: 1,
      display: "flex",
      alignItems: "center",
      gap: 4,
    },
    cancel: {
      label: <X size={14} />,
    },
    cancelButtonStyle: {
      background: "transparent",
      color: "white",
    },
    icon: <ShieldX size={18} />,
  });
};
