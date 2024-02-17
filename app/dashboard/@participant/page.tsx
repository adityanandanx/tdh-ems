import React from "react";
import { Calendar } from "@/components/ui/calendar";
import EventCalendar from "./EventCalendar";

type Props = {};

const ParticipantDashboard = (props: Props) => {
  return (
    <div className="min-h-[80vh]">
      <EventCalendar />
    </div>
  );
};

export default ParticipantDashboard;
