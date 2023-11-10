"use client";
import React, { useEffect, useRef } from "react";
import EventListItem from "./EventListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteLoading from "./infinte-loading";
import useNavHeight from "@/hooks/useNavHeight";
import useViewportHeight from "@/hooks/useViewportHeight";
import {
  getEvents,
  searchEventsByTags,
  searchEvents,
} from "@/lib/public/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { EventsRow } from "@/lib/dbTypes";
import _ from "lodash";
import SearchBar from "../search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const EventList = ({}: Props) => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");
  const router = useRouter();

  useEffect(() => {
    // refetch();
    router.refresh();
  }, [tag, search]);

  const fetchEvents = async ({ pageParam = 0 }) => {
    let events: EventsRow[];
    if (tag) {
      events = await searchEventsByTags([tag], pageParam, 3);
      return { events, pageParam };
    }

    if (search) {
      events = await searchEvents(search, "title", pageParam, 3);
      return { events, pageParam };
    }

    events = await getEvents(pageParam, 3);
    return { events, pageParam };
  };

  const navHeight = useNavHeight();
  const viewHeight = useViewportHeight();

  const eventsQuery = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.pageParam + 1,
  });

  const { data, error, status, refetch } = eventsQuery;

  return (
    <div
      style={{ height: viewHeight - navHeight - 1 }}
      autoFocus
      className="relative snap-y overflow-y-scroll snap-mandatory flex flex-col items-center gap-3 py-3"
    >
      {status === "pending" ? null : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        data.pages.map((group, i) =>
          group.events.map((event) => (
            <EventListItem key={event.id} event={event} />
          ))
        )
      )}
      <InfiniteLoading eventsQuery={eventsQuery} />

      {(tag || search) && (
        <Link
          className="fixed"
          style={{ top: navHeight + 32 }}
          href={"/events"}
        >
          <Button variant={"ghost"}>Clear Filters</Button>
        </Link>
      )}
    </div>
  );
};

export { EventList };
