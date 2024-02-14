"use client";
import { Gallery, GallerySkeleton } from "@/components/specific/gallery";
import { getEventGallery, getEvents } from "@/lib/actions/events";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import { useSupabase } from "@/lib/supabase/client";
import { EventsRow } from "@/lib/supabase/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ActivityIcon } from "lucide-react";
import React from "react";

type Props = {};

const GalleryPage = (props: Props) => {
  const supabase = useSupabase();
  const { data: events } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvents(supabase, 0),
  });

  const results = useQueries({
    queries: events
      ? events.map((eve) => ({
          queryKey: ["event", eve.id, "gallery"],
          queryFn: () => getEventGallery(supabase, eve.id),
          // enabled: !!events,
        }))
      : [],
  });

  results.map((res) => {
    if (res.isError) throw res.error;
  });

  const imgUrls: string[] = [];
  results?.forEach((result) => {
    // if (eve.cover_image_url)
    //   imgUrls.push(getGalleryImageUrlFromName(eve.id, eve.cover_image_url));
    if (result.data) imgUrls.push(...result.data);
  });
  console.log(imgUrls);

  return (
    <>
      <section className="relative px-5 flex flex-col py-32 gap-5 overflow-hidden max-w-screen-xl mx-auto">
        <h1 className="text-6xl font-bold">Gallery</h1>
        {results.map((result, i) => {
          if (result.isPending) return <GallerySkeleton key={i} />;
        })}
        <Gallery imgUrls={imgUrls} />
      </section>
    </>
  );
};

export default GalleryPage;
