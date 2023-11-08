import React, { Suspense } from "react";
import getAllEvents from "./actions/getAllEvents";
import { Skeleton } from "@/components/ui/skeleton";
import EventListItem from "./EventListItem";

type Props = {};

const EventList = async ({}: Props) => {
  const events = await getAllEvents();
  return (
    <div className="grid grid-cols-3 gap-5">
      {events.length === 0 && "No Events Found"}
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  );
};

const EventListWithSuspense = () => {
  return (
    <Suspense fallback={<Skeleton className="flex-1 h-96" />}>
      <EventList />
    </Suspense>
  );
};

export { EventListWithSuspense as EventList };
