import { getEvents } from "@/components/specific/event-list/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatTimeStamp } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    page: string;
  };
};

const AdminDashboard = async ({ searchParams: { page = "0" } }: Props) => {
  const pageNum = parseInt(page);
  const events = await getEvents(pageNum, 10);
  if (events.length === 0 && pageNum > 0) redirect(`?page=${pageNum - 1}`);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {events.map((event) => (
          <Link href={`/dashboard/e/event/${event.id}`} className="">
            <Card key={event.id} className="w-full h-full">
              <CardHeader>
                <Image src={""} alt={event.title + " cover image"} />
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
