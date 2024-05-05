"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvent } from "@/lib/actions/events";
import { useSupabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import MarkdownView from "react-showdown";
import React from "react";
import GalleryView from "./GalleryView";
import SidePanel, { SidePanelSkeleton } from "./SidePanel";
import { GallerySkeleton } from "@/components/specific/gallery";
import * as DOMPurify from "dompurify";

type Props = {
  params: {
    id: string;
  };
};

const EventPage = ({ params }: Props) => {
  const eventId = parseInt(params.id);
  const supabase = useSupabase();
  const {
    data: event,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEvent(params.id, supabase),
  });

  if (isError)
    return (
      <>
        <h1>Sorry, An error occurred. Try reloading the page.</h1>
      </>
    );

  return (
    <>
      <div className="flex flex-col  md:flex-row gap-10 items-start max-w-screen-xl mx-auto">
        {isPending ? (
          <>
            <SidePanelSkeleton />
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-96 h-9" />
              <Skeleton className="w-64 mb-5 h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          </>
        ) : (
          <>
            <SidePanel event={event} />
            <div className="">
              <h1 className="text-5xl font-bold">{event.title}</h1>
              <h2 className="mb-5">
                <span className="text-muted-foreground">Venue: </span>
                {event.venue}
              </h2>
              <div className="prose  prose-sm">
                <div className="!text-foreground dark:prose-invert">
                  <MarkdownView
                    markdown={event.desc}
                    sanitizeHtml={(html) => {
                      return DOMPurify.sanitize(html);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {!isPending ? (
        <GalleryView eventId={event.id} />
      ) : (
        <div className="my-10">
          <GallerySkeleton />
        </div>
      )}
    </>
  );
};

export default EventPage;
