"use client";
import {
  deleteImageFromGallery,
  setEventCoverImage,
} from "@/app/dashboard/@admin/actions";
import { cn } from "@/lib/utils";
import { DeleteIcon, ImageIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useTransition } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import useActionTransition from "@/hooks/useActionTransition";

type Props = {
  eventId: string;
  url: string;
};

const GalleryImage = ({ eventId, url }: Props) => {
  const setEventCoverImageAction = useActionTransition(setEventCoverImage);
  const deleteImageAction = useActionTransition(deleteImageFromGallery);
  const isPending =
    setEventCoverImageAction.isPending || deleteImageAction.isPending;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="relative">
          <Image
            className={cn(
              "transition-opacity h-32 w-auto rounded-md",
              isPending ? "opacity-50 animate-pulse" : ""
            )}
            src={url}
            alt="image"
            width={260}
            height={128}
          />
          {isPending && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2Icon className=" animate-spin" />
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-[128px]">
        <ContextMenuItem
          onClick={() => setEventCoverImageAction.runAction(eventId, url)}
        >
          <ImageIcon size={20} /> Set as cover
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => () => deleteImageAction.runAction(eventId, url)}
        >
          <Trash2Icon size={20} /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default GalleryImage;
