import { EventList } from "@/components/specific/event-list";
import SearchBar from "@/components/specific/search-bar";
import React from "react";

type Props = {};

const EventsPage = (props: Props) => {
  return (
    <section>
      <div className="relative max-w-screen-xl mx-auto">
        <EventList />
      </div>
    </section>
  );
};

export default EventsPage;
