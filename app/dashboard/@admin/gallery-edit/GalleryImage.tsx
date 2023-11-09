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

type Props = {
  eventId: string;
  url: string;
};

const GalleryImage = ({ eventId, url }: Props) => {
  const [isPending, startTransition] = useTransition();

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
          onClick={() =>
            startTransition(() => setEventCoverImage(eventId, url))
          }
        >
          <ImageIcon size={20} /> Set as cover
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() =>
            startTransition(() => deleteImageFromGallery(eventId, url))
          }
        >
          <Trash2Icon size={20} /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default GalleryImage;
