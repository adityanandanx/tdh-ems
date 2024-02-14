"use client";
import { Gallery, GallerySkeleton } from "@/components/specific/gallery";
import { getEventGallery, getEvents } from "@/lib/actions/events";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import { useSupabase } from "@/lib/supabase/client";
import { EventsRow } from "@/lib/supabase/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";

type Props = {};

const GalleryPage = (props: Props) => {
  const supabase = useSupabase();
  const { data: events } = useQuery({
    queryKey: ["event"],
    queryFn: () => getEvents(supabase, 0),
  });

  const generateQueries = (events: EventsRow[] | undefined) => {
    if (!events) return [];
    return events.map((eve) => ({
      queryKey: ["event", eve.id, "gallery"],
      queryFn: () => getEventGallery(supabase, eve.id),
      enabled: !!events,
    }));
  };

  const results = useQueries({
    queries: generateQueries(events),
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
        {results.map((result) => {
          if (result.isPending) return <GallerySkeleton />;
        })}
        <Gallery imgUrls={imgUrls} />
      </section>
    </>
  );
};

export default GalleryPage;
