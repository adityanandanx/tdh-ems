"use client";
import React from "react";
import EventListItem from "./EventListItem";
import { getEvents } from "./actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteLoading from "./infinte-loading";

type Props = {};

const EventList = ({}: Props) => {
  const fetchEvents = async ({ pageParam = 0 }) => {
    const events = await getEvents(pageParam, 3);
    console.log(data?.pages);

    return { events, pageParam };
  };

  const eventsQuery = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
  });

  const { data, error, status } = eventsQuery;

  return (
    <div className="flex flex-col gap-3">
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
