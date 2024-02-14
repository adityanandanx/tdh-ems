"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getEventGallery } from "@/lib/actions/events";
import { useSupabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Gallery, GallerySkeleton } from "@/components/specific/gallery";

type Props = {
  eventId: number;
};

const GalleryView = ({ eventId }: Props) => {
  const supabase = useSupabase();

  const {
    data: imgUrls,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["event", eventId, "gallery"],
    queryFn: () => getEventGallery(supabase, eventId),
  });

  if (isPending) return <GallerySkeleton />;

  if (isError)
    return (
      <div>
        Some Error occured while fetching images. Try reloading the page
      </div>
    );

  return (
    <div className="py-10 flex-1">
      <Gallery imgUrls={imgUrls} />
    </div>
  );
};

export default GalleryView;
