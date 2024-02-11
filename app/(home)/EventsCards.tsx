import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/actions/events";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import { getSupabase } from "@/lib/supabase/server";
import { formatTimeStamp } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const EventsCards = async (props: Props) => {
  const supabase = getSupabase();
  const events = await getEvents(supabase, 0, 3, true);

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full flex items-center lg:items-stretch flex-col lg:flex-row gap-5">
        {events.length === 0 && (
          <p>Sorry, no events available at the moment.</p>
        )}
        {events.map((event) => (
          <Link
            href={`/events/${event.id}`}
            className="flex-1 max-w-md w-full"
            key={event.id}
          >
            <Card className="group z-0 relative overflow-hidden">
              <div className="relative -z-10 flex items-center justify-center aspect-video bg-muted overflow-hidden -mb-20">
                {event.cover_image_url ? (
                  <Image
                    width={512}
                    height={512}
                    src={getGalleryImageUrlFromName(
                      event.id,
                      event.cover_image_url
                    )}
                    className="object-cover group-hover:scale-110 transition-transform h-full w-full -z-20"
                    alt={event.title + "image"}
                  />
                ) : (
                  <ImageIcon className="-z-10 object-cover group-hover:scale-110 transition-transform" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent -z-10"></div>
              </div>
              <CardHeader className="z-50">
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  On: {formatTimeStamp(event.event_start)}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32">
                <p className="text-sm line-clamp-4">{event.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Link href={"/events"}>
        <Button size={"lg"}>Browse Events</Button>
      </Link>
    </div>
  );
};

export default EventsCards;
