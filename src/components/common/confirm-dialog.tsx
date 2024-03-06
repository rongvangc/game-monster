import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  heading: string;
  description: string;
  onOk: () => void;
  onCancel: (open: boolean) => void;
};

export function ConfirmDialog({
  heading,
  description,
  open,
  onOk,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 color="#f56565" size={22} />
            {heading}
          </DialogTitle>
          <DialogDescription className="pt-2 pb-4">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end gap-1">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={onOk}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
