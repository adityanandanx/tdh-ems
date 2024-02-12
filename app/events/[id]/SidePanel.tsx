import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EventsRow } from "@/lib/supabase/types";
import { formatTimeStamp } from "@/lib/utils";
import {
  compareAsc,
  format,
  formatDistance,
  formatDistanceToNow,
  isAfter,
  isBefore,
} from "date-fns";
import React from "react";

type Props = {
  event: EventsRow;
};

const SidePanel = ({ event }: Props) => {
  if (
    !event.event_start ||
    !event.registration_end ||
    !event.registration_start
  )
    return <>Coming soon</>;
  const date = new Date(event.event_start);
  const day = format(date, "eeee");
  const month = format(date, "LLLL");
  const year = format(date, "yyyy");

  const regStart = new Date(event.registration_start);
  const regEnd = new Date(event.registration_end);
  const now = new Date();

  const registrationsEnded = now > regEnd;
  const registrationsStarted = now > regStart;
  const registrationsOpen = registrationsStarted && !registrationsEnded;

  return (
    <div className="flex flex-col gap-5">
      <Card className="p-4 text-center aspect-square w-64 h-64 leading-none flex flex-col items-center justify-between bg-background self-center md:self-start">
        <Card className="text-sm px-4 py-1 w-full">{day}</Card>
        <div className="text-8xl">{date.getDate()}</div>
        <div>
          <div className="text-xl">{month}</div>
          <div className="text-xs">{year}</div>
        </div>
      </Card>
      <div className="text-sm text-center">
        {registrationsStarted ? (
          <p>
            Registration end{registrationsEnded ? "ed" : "s"}{" "}
            {/* {format(new Date(event.registration_end), "ee/mm/yyyy")} */}
            {formatDistanceToNow(new Date(event.registration_end), {
              addSuffix: true,
            })}
          </p>
        ) : (
          <p>
            <span className="text-muted-foreground">
              Registrations starts from:{" "}
            </span>

            <br />
            {formatTimeStamp(event.registration_start)}
          </p>
        )}
        {registrationsOpen && (
          <Button className="w-full mt-2" size={"lg"}>
            Register Now
          </Button>
        )}
      </div>
      {/* <Card className="p-4 text-center aspect-square w-52 h-52 leading-none flex flex-col items-center justify-between bg-background self-center md:self-start"></Card> */}
    </div>
  );
};

export default SidePanel;
