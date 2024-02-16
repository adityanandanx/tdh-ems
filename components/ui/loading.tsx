import React, { ComponentProps } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "./dialog";
import { Loader2 } from "lucide-react";

interface Props extends ComponentProps<typeof Dialog> {}

const Loading = (props: Props) => {
  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay className="flex items-center justify-center gap-2 flex-col">
          <Loader2 size={32} className="animate-spin" />
          <p>Getting things ready...</p>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default Loading;
