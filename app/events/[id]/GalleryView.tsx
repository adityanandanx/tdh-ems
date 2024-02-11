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

type Props = {
  eventId: number;
};

const GalleryView = ({ eventId }: Props) => {
  const supabase = useSupabase();

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const {
    data: imgUrls,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["event", eventId, "gallery"],
    queryFn: () => getEventGallery(supabase, eventId),
  });

  if (isPending)
    return (
      <div>
        <Skeleton className="w-full h-32" />
      </div>
    );

  if (isError)
    return (
      <div>
        Some Error occured while fetching images. Try reloading the page
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-5 mb-5">
        {imgUrls.map((url, i) => (
          <Image
            key={url}
            className="w-auto max-h-[256px] rounded cursor-pointer object-contain"
            onClick={() => {
              setModalOpen(true);
              setCurrent(i);
            }}
            src={url}
            alt="image"
            width={512}
            height={256}
          />
        ))}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-full p-0">
          <Carousel opts={{ startIndex: current, loop: true }}>
            <CarouselContent className="items-center">
              {imgUrls.map((url) => (
                <CarouselItem key={url}>
                  <Image
                    className="w-auto h-full rounded-lg object-contain cursor-pointer"
                    src={url}
                    alt="image"
                    width={512}
                    height={256}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryView;
