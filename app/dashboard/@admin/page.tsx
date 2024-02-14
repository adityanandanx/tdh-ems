import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventsRow } from "@/lib/supabase/types";
import { getEvents, searchEvents } from "@/lib/actions/events";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import { cn, formatTimeStamp } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ImageIcon, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import SearchBar from "@/components/specific/search-bar";
import { getSupabase } from "@/lib/supabase/server";
import { Separator } from "@/components/ui/separator";
import { UsersTable } from "@/components/specific/UsersTable";
import UsersPage from "./UsersPage";

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
  const supabase = getSupabase();

  if (search) {
    events = await searchEvents(supabase, search, "title", pageNum, 10);
  } else {
    events = await getEvents(supabase, pageNum, 10);
  }

  if (events.length === 0 && pageNum > 0) redirect(`?page=${pageNum - 1}`);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex-1">
        <div className="mb-4 flex justify-between">
          <div>
            <h1 className="text-2xl font-medium">Events</h1>
            <p className="text-muted-foreground">
              Create, Edit or Delete Events
            </p>
          </div>
          <Link href={"/dashboard/e/event"}>
            <Button size={"sm"}>Create Event</Button>
          </Link>
        </div>
        <SearchBar />
        <div className="flex flex-col">
          {events.map((event) => (
            <Link
              href={`/dashboard/e/event/${event.id}`}
              key={event.id}
              className={cn(
                `overflow-hidden`,
                event.published ? "" : "opacity-50"
              )}
            >
              <div key={event.id} className="w-full flex items-stretch p-0">
                {event.cover_image_url ? (
                  <Image
                    width={300}
                    height={128}
                    className="object-cover h-24 w-24 rounded-md shadow-lg shadow-primary-foreground/50"
                    src={getGalleryImageUrlFromName(
                      event.id,
                      event.cover_image_url
                    )}
                    alt={event.title + " cover image"}
                  />
                ) : (
                  <div className="h-24 w-24 flex items-center justify-center bg-muted rounded-md">
                    <ImageIcon />
                  </div>
                )}
                <CardHeader className="self-center">
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="">
                    on {formatTimeStamp(event.event_start)}
                  </CardDescription>
                </CardHeader>
              </div>
              <Separator className="my-2" />
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
      </div>
      <Separator className="w-auto my-16 lg:hidden" />
      <Separator
        className="h-auto mx-5 hidden lg:block"
        orientation="vertical"
      />
      <div className="flex-1">
        <UsersPage />
      </div>
    </div>
  );
};

export default AdminDashboard;
