"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getEvent } from "@/lib/actions/events";
import { useSupabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import React from "react";
import GalleryView from "./GalleryView";
import SidePanel from "./SidePanel";

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
  if (isPending)
    return (
      <>
        <Skeleton className="w-full h-32" />
      </>
    );

  if (isError)
    return (
      <>
        <h1>Sorry, An error occured. Try reloading the page.</h1>
      </>
    );

  return (
    <>
      <GalleryView eventId={event.id} />
      <div className="flex flex-col md:flex-row gap-10 items-start max-w-screen-xl mx-auto">
        <SidePanel event={event} />
        <div className="">
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <h2 className="mb-5">
            <span className="text-muted-foreground">Venue: </span>
            {event.venue}
          </h2>
          <p className="">{event.desc}</p>
        </div>
      </div>
    </>
  );
};

export default EventPage;
