"use client";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUserRegistrationsQuery } from "@/hooks/queries";
import { addDays, format, getDate, isWithinInterval, subDays } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { Day } from "react-day-picker";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventsRow } from "@/lib/supabase/types";
import { cn, formatTimeStamp } from "@/lib/utils";
import { getEventCoverImage } from "@/lib/actions/events";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Props = {};

type EventRange = {
  start: Date;
  end: Date;
};

const COLORS = ["#114B5F", "#04D5F1", "#456990", "#F45B69"];

const EventCalendar = (props: Props) => {
  const { data, isError, isPending } = useCurrentUserRegistrationsQuery();
  const [selectedEvents, setSelectedEvents] = useState<EventsRow[]>([]);
  const [selected, setSelected] = useState<Date>();

  const eventRanges: EventRange[] = [];
  data?.forEach((eve) => {
    if (!eve.event_start || !eve.event_end) return;
    eventRanges.push({
      start: new Date(eve.event_start),
      end: new Date(eve.event_end),
    });
  });

  const getEventsOnDate = useCallback(
    (date: Date) => {
      if (!data) return [];
      const res = data.filter((eve) => {
        if (!eve.event_start || !eve.event_end) return false;
        return isWithinInterval(addDays(date, 1), {
          start: new Date(eve.event_start),
          end: new Date(eve.event_end),
        });
      });

      return res;
    },
    [data]
  );

  useEffect(() => {
    setSelectedEvents(getEventsOnDate(new Date()));
    setSelected(new Date());
  }, [getEventsOnDate]);

  return isPending ? (
    <>
      <Skeleton className="max-w-sm w-full h-96" />
    </>
  ) : isError ? (
    <>An error occured</>
  ) : (
    <>
      <h1 className="text-4xl font-bold">Your Events Calendar</h1>
      <p className="mb-4">
        {data.length
          ? `You have registered for a total of ${data.length} event(s).`
          : "You have no registered events"}
      </p>
      <div className="flex flex-col lg:flex-row gap-4">
        <Calendar
          mode="single"
          components={{
            Day(props) {
              const events = getEventsOnDate(props.date);
              if (!events || events.length === 0) return <Day {...props} />;
              return (
                <div
                  onClick={() => setSelectedEvents(getEventsOnDate(props.date))}
                  className={cn("relative")}
                >
                  <Day {...props} />
                  <div className="flex gap-1 absolute bottom-0 left-1/2 -translate-x-1/2">
                    {events.map((eve) => (
                      <span
                        className="w-2 h-2 bg-red-500 rounded-full"
                        key={eve.id}
                        style={{
                          backgroundColor: COLORS[eve.id % COLORS.length],
                        }}
                      ></span>
                    ))}
                  </div>
                </div>
              );
            },
          }}
          onDayClick={(date) => setSelectedEvents(getEventsOnDate(date))}
          numberOfMonths={1}
          classNames={{
            day_selected: "border bg-transparent border-primary",
          }}
          selected={selected}
          onSelect={setSelected}
          className="rounded-md border p-5 sm:p-10 mx-auto"
        />
        <div className="flex flex-col w-full gap-2">
          {selected && selectedEvents.length < 1 ? (
            <p>No events on {format(selected, "dd/MM/yy")}</p>
          ) : null}
          {selectedEvents.map((eve) => (
            <Card
              className="w-full flex relative flex-row overflow-hidden"
              key={eve.id}
            >
              {eve.cover_image_url ? (
                <Image
                  width={128}
                  height={128}
                  src={getGalleryImageUrlFromName(eve.id, eve.cover_image_url)}
                  alt={`${eve.title} cover image`}
                  className="aspect-square w-auto object-cover h-full"
                />
              ) : (
                <div className="aspect-square flex items-center justify-center h-32 w-auto bg-muted">
                  <ImageIcon />
                </div>
              )}
              <CardHeader className="flex flex-1">
                <CardTitle>{eve.title}</CardTitle>
                <CardDescription className="flex flex-col">
                  <span>
                    From:{" "}
                    {eve.event_start &&
                      format(new Date(eve.event_start), "dd/MM/yy h:mm a")}
                  </span>
                  <span>
                    To:{" "}
                    {eve.event_end &&
                      format(new Date(eve.event_end), "dd/MM/yy h:mm a")}
                  </span>
                </CardDescription>
              </CardHeader>
              <div className="h-full aspect-square border-l flex items-center justify-center">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: COLORS[eve.id % COLORS.length],
                  }}
                ></span>
              </div>
              <Link
                href={`/events/${eve.id}`}
                className="absolute inset-0"
                aria-label={`${eve.title} page`}
              />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventCalendar;
