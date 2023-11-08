import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import type { EventsRow } from "@/lib/dbTypes";
import { Table, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

type Props = {
  eve: EventsRow;
};

const EventListItem = ({ eve }: Props) => {
  return (
    <Card className="group">
      <CardHeader>
        <CardTitle>{eve.title}</CardTitle>
        <CardDescription>{eve.desc}</CardDescription>
        <CardDescription>Venue: {eve.venue}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-0">
          <span className="text-xs font-bold">Registration Starts</span>
          <span>{formatTimeStamp(eve.registration_start)}</span>
          <span className="text-xs font-bold">Registration Ends</span>
          <span>{formatTimeStamp(eve.registration_end)}</span>
          <span className="text-xs font-bold">Event On</span>
          <span>{formatTimeStamp(eve.event_start)}</span>
          <span className="text-xs font-bold">Event End</span>
          <span>{formatTimeStamp(eve.event_end)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const formatTimeStamp = (ts: string | null, null_msg?: string) => {
  if (!ts) return null_msg;
  const t = new Date(ts);
  return format(t, "E do LLLL, yyyy");
};

export default EventListItem;
