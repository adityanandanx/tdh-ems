"use client";
import {
  deleteImageFromGallery,
  setEventCoverImage,
} from "@/app/dashboard/@admin/actions";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useActionTransition from "@/hooks/useActionTransition";
import { useSupabase } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  eventId: string;
  url: string;
};

const GalleryImage = ({ eventId, url }: Props) => {
  // const setEventCoverImageAction = useActionTransition(setEventCoverImage);
  const queryClient = useQueryClient();
  const setCoverMutation = useMutation({
    mutationFn: (vars: Parameters<typeof setEventCoverImage>) =>
      setEventCoverImage(...vars),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", eventId, "gallery", "cover"],
      });
    },
    onError: (e) => {
      throw e;
    },
  });
  const deleteImageMutation = useMutation({
    mutationFn: (vars: Parameters<typeof deleteImageFromGallery>) =>
      deleteImageFromGallery(...vars),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["event", eventId, "gallery"],
      });
    },
    onError: (e) => {
      throw e;
    },
  });
  const isPending = setCoverMutation.isPending || deleteImageMutation.isPending;
  const supabase = useSupabase();

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
          onClick={() => setCoverMutation.mutate([eventId, url])}
        >
          <ImageIcon size={20} /> Set as cover
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => deleteImageMutation.mutate([eventId, url])}
        >
          <Trash2Icon size={20} /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default GalleryImage;
