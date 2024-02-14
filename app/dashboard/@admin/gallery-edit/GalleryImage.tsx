"use client";
import {
  deleteImageFromGallery,
  setEventCoverImage,
} from "@/app/dashboard/@admin/actions";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Loader2Icon,
  MoreVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSupabase } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  eventId: string;
  url: string;
};

const GalleryImage = ({ eventId, url }: Props) => {
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
    <DropdownMenu>
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
        <DropdownMenuTrigger asChild>
          <Button
            className="absolute right-1 top-1"
            size={"icon"}
            variant={"outline"}
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="min-w-[256px]">
        <DropdownMenuLabel>Name: {url.split("/").at(-1)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setCoverMutation.mutate([eventId, url])}
        >
          <ImageIcon size={20} className="mr-2 h-4 w-4" /> Set as cover
        </DropdownMenuItem>
        <DropdownMenuItem
          className="group"
          onClick={() => deleteImageMutation.mutate([eventId, url])}
        >
          <Trash2Icon
            size={20}
            className="mr-2 h-4 w-4 group-hover:text-red-500 transition-colors"
          />{" "}
          <span className="group-hover:text-red-500 transition-colors">
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GalleryImage;
