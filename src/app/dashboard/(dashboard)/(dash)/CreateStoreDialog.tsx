import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateStoreStepper from "./CreateStoreStepper";

export default function CreateStoreDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger className="z-60">{trigger}</DialogTrigger>
      <DialogContent>
        <CreateStoreStepper />
      </DialogContent>
    </Dialog>
  );
}
