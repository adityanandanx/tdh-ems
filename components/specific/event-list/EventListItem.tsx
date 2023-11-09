"use client";
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
import useNavHeight from "@/hooks/useNavHeight";
import { formatTimeStamp } from "@/lib/utils";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Props = {
  event: EventsRow;
};

const EventListItem = ({ event }: Props) => {
  const navHeight = useNavHeight();
  return (
    <Card
      className="relative group max-w-sm w-full snap-center shrink-0"
      style={{ height: window.innerHeight - navHeight - 32 }}
    >
      {event.cover_image_url ? (
        <Image
          width={384 * 2}
          height={606 * 2}
          src={event.cover_image_url}
          className="rounded-lg w-full h-full object-cover"
          alt={`${event.title} cover image`}
        />
      ) : (
        <>
          <ImageIcon
            size={32}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </>
      )}
      <div className="absolute left-full max-w-sm w-full top-0 bottom-0">
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
          <CardDescription>{event.desc}</CardDescription>
          <CardDescription>Venue: {event.venue}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-0">
            <span className="text-xs font-bold">Registration Starts</span>
            <span>{formatTimeStamp(event.registration_start)}</span>
            <span className="text-xs font-bold">Registration Ends</span>
            <span>{formatTimeStamp(event.registration_end)}</span>
            <span className="text-xs font-bold">Event On</span>
            <span>{formatTimeStamp(event.event_start)}</span>
            <span className="text-xs font-bold">Event End</span>
            <span>{formatTimeStamp(event.event_end)}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventListItem;
