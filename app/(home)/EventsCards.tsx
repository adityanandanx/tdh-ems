import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEventCoverImage, getEvents } from "@/lib/public/actions";
import { getGalleryImageUrlFromName } from "@/lib/public/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const EventsCards = async (props: Props) => {
  const events = await getEvents(0, 3, true);

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col md:flex-row gap-5">
        {events.length === 0 && (
          <p>Sorry, no events available at the moment.</p>
        )}
        {events.map((event) => (
          <Link href={`/events`} className="flex-1 max-w-md" key={event.id}>
            <Card className="group relative z-0 overflow-hidden">
              <div className="flex items-center justify-center aspect-video bg-muted overflow-hidden">
                {event.cover_image_url ? (
                  <Image
                    width={512}
                    height={512}
                    src={getGalleryImageUrlFromName(
                      event.id,
                      event.cover_image_url
                    )}
                    className="object-cover group-hover:scale-110 transition-transform h-full w-full"
                    alt={event.title + "image"}
                  />
                ) : (
                  <ImageIcon className="object-cover group-hover:scale-110 transition-transform" />
                )}
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <Button size={"lg"}>Browse Events</Button>
    </div>
  );
};

export default EventsCards;
