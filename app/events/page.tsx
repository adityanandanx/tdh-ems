import { EventList } from "@/components/specific/event-list";
import React from "react";

type Props = {};

const EventsPage = (props: Props) => {
  return (
    <section>
      <div className="max-w-screen-xl mx-auto">
        <EventList />
      </div>
    </section>
  );
};

export default EventsPage;
