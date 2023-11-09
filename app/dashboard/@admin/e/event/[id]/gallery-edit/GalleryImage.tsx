"use client";
import { deleteImageFromGallery } from "@/app/dashboard/@admin/actions";
import { cn } from "@/lib/utils";
import { DeleteIcon, Trash2Icon } from "lucide-react";
import React, { useTransition } from "react";

type Props = {
  eventId: string;
  url: string;
};

const GalleryImage = ({ eventId, url }: Props) => {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(() => deleteImageFromGallery(eventId, url))
      }
      className="group relative rounded overflow-hidden cursor-pointer"
    >
      <img
        className={cn(
          "group-hover:opacity-50 transition-opacity h-32 w-auto",
          isPending ? "opacity-50 animate-pulse" : ""
        )}
        src={url}
        alt="image"
      />
      <Trash2Icon className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 opacity-0 transition-opacity" />
    </div>
  );
};

export default GalleryImage;
