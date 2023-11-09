"use client";
import React, { useRef } from "react";
import EventListItem from "./EventListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteLoading from "./infinte-loading";
import useNavHeight from "@/hooks/useNavHeight";
import useViewportHeight from "@/hooks/useViewportHeight";
import { getEvents } from "@/lib/public/actions";

type Props = {};

const EventList = ({}: Props) => {
  const fetchEvents = async ({ pageParam = 0 }) => {
    const events = await getEvents(pageParam, 3);
    console.log(data?.pages);

    return { events, pageParam };
  };
  const containerRef = useRef<HTMLDivElement>(null);

  const navHeight = useNavHeight();
  const viewHeight = useViewportHeight();

  const eventsQuery = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
  });

  const { data, error, status } = eventsQuery;

  return (
    <div
      style={{ height: viewHeight - navHeight - 1 }}
      autoFocus
      ref={containerRef}
      className="snap-y overflow-y-scroll snap-mandatory flex flex-col items-center gap-3 py-3"
    >
      {status === "pending" ? null : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          {data.pages.map((group, i) =>
            group.events.map((event) => (
              <EventListItem key={event.id} event={event} />
            ))
          )}
        </>
      )}
      <InfiniteLoading eventsQuery={eventsQuery} />
    </div>
  );
};

export { EventList };
