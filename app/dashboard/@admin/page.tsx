import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EventsRow } from "@/lib/dbTypes";
import { getEvents, searchEvents } from "@/lib/public/actions";
import { getGalleryImageUrlFromName } from "@/lib/public/utils";
import { cn, formatTimeStamp } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import SearchBar from "../../../components/specific/search-bar";

type Props = {
  searchParams: {
    page: string;
    search: string;
  };
};

const AdminDashboard = async ({
  searchParams: { page = "0", search },
}: Props) => {
  const pageNum = parseInt(page);
  let events: EventsRow[];

  if (search) {
    events = await searchEvents(search, "title", pageNum, 10);
  } else {
    events = await getEvents(pageNum, 10);
  }

  if (events.length === 0 && pageNum > 0) redirect(`?page=${pageNum - 1}`);

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-medium">Events</h1>
        <Link href={"/dashboard/e/event"}>Create Event</Link>
      </div>
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {events.map((event) => (
          <Link
            href={`/dashboard/e/event/${event.id}`}
            className={cn(
              `overflow-hidden`,
              event.published ? "" : "opacity-50"
            )}
          >
            <Card key={event.id} className="w-full h-full">
              {event.cover_image_url ? (
                <Image
                  width={300}
                  height={128}
                  className="h-32 object-cover w-full rounded-md shadow-lg shadow-primary-foreground/50"
                  src={getGalleryImageUrlFromName(
                    event.id,
                    event.cover_image_url
                  )}
                  alt={event.title + " cover image"}
                />
              ) : (
                <div className="h-32 w-full flex items-center justify-center bg-muted rounded-md">
                  <ImageIcon />
                </div>
              )}
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="">
                  on {formatTimeStamp(event.event_start)}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex gap-2 py-3">
        <Link href={`?page=${pageNum > 0 ? pageNum - 1 : 0}`}>
          <Button variant={"outline"}>
            <ChevronLeft /> Previous Page
          </Button>
        </Link>
        <Link href={`?page=${pageNum + 1}`}>
          <Button variant={"outline"}>
            Next Page <ChevronRight />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AdminDashboard;
