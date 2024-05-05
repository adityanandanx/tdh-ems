"use client";
import React, { useCallback } from "react";
import EventListItem from "./EventListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import InfiniteLoading from "./infinte-loading";
import useNavHeight from "@/hooks/useNavHeight";
import useViewportHeight from "@/hooks/useViewportHeight";
import { getEvents } from "@/lib/actions/events";
import { useRouter, useSearchParams } from "next/navigation";
import { EventsRow } from "@/lib/supabase/types";
import _ from "lodash";
import { getUserRegisteredEvents } from "@/lib/userActions";
import { useSupabase } from "@/lib/supabase/client";

type Props = {};

const EventList = ({}: Props) => {
  const supabase = useSupabase();
  const fetchEvents = async ({ pageParam = 0 }) => {
    let events: EventsRow[];

    events = await getEvents(supabase, pageParam, 10, false);
    return { events, pageParam };
  };

  const fetchOwnEvents = async () => {
    const events = await getUserRegisteredEvents();
    return events;
  };

  const registeredEventsQuery = useQuery({
    queryKey: ["events", "registered"],
    queryFn: fetchOwnEvents,
  });

  const navHeight = useNavHeight();
  const viewHeight = useViewportHeight();

  console.log(registeredEventsQuery);

  const eventsQuery = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialPageParam: 0,
    enabled: !!registeredEventsQuery.data,
    getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
  });

  const { data, error, status } = eventsQuery;

  const determineHasRegistered = useCallback(
    (eventId: string | number) => {
      if (!registeredEventsQuery.data) return false;
      for (const e of registeredEventsQuery.data) {
        if (e.id === eventId) {
          return true;
        }
      }
      return false;
    },
    [registeredEventsQuery.data]
  );

  return (
    <div
      style={{ height: viewHeight - navHeight - 1 }}
      autoFocus
      className="relative  snap-y overflow-y-scroll snap-mandatory flex flex-col items-center gap-3 py-3 w-full"
    >
      {status === "pending" ? null : status === "error" ? (
        <p>Error: {JSON.stringify(error.message)}</p>
      ) : (
        data.pages.map((group, i) =>
          group.events.map((event) => (
            <EventListItem
              registered={determineHasRegistered(event.id)}
              key={event.id}
              event={event}
            />
          ))
        )
      )}
      <InfiniteLoading eventsQuery={eventsQuery} />
    </div>
  );
};

export { EventList };
