"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useTransition } from "react";
import type { EventsRow } from "@/lib/dbTypes";
import { Table, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import useNavHeight from "@/hooks/useNavHeight";
import { cn, formatTimeStamp } from "@/lib/utils";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getGalleryImageUrlFromName } from "@/lib/public/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { revalidateTag } from "next/cache";
import { registerForEvent } from "./actions";

type Props = {
  event: EventsRow;
};

const EventListItem = ({ event }: Props) => {
  const [isPending, startTransition] = useTransition();
  const navHeight = useNavHeight();
  const searchParams = useSearchParams();

  const getSearchURLByTag = (tag: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", tag);
    return "/events?" + newParams.toString();
  };

  const handleRegister = () => {
    startTransition(() => registerForEvent(event.id.toString()));
  };

  return (
    <Card
      className={cn(
        "relative group w-auto aspect-9/16 snap-center shrink-0 z-0 flex flex-col justify-end overflow-hidden",
        event.published ? "" : "hidden"
      )}
      style={{ height: window.innerHeight - navHeight - 32 }}
    >
      {event.cover_image_url ? (
        <Image
          width={384 * 2}
          height={606 * 2}
          src={getGalleryImageUrlFromName(event.id, event.cover_image_url)}
          className="absolute inset-0 opacity-100 -z-10 rounded-lg w-full h-full object-cover"
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
      <div className="max-w-sm w-full z-20 bg-gradient-to-t from-card to-transparent">
        <CardHeader className="pb-2 pt-20">
          <div>
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription className="text-sm text-foreground opacity-75">
              {formatTimeStamp(event.event_start)}
            </CardDescription>
          </div>
          {event.registration_start &&
          new Date() > new Date(event.registration_start) ? (
            <div className="flex flex-col text-center">
              <Button
                disabled={isPending}
                onClick={handleRegister}
                className="w-fit"
                size={"sm"}
                variant={"default"}
              >
                Register
              </Button>
              {/* <span className="text-xs">
                {formatTimeStamp(event.registration_end)}
              </span> */}
            </div>
          ) : (
            <div className="text-sm underline">Registrations start soon</div>
          )}
        </CardHeader>
        <CardContent className="">
          <p className="text-xs overflow-hidden line-clamp-2">{event.desc}</p>
          <div className="flex flex-wrap gap-1 leading-none my-2 text-xs">
            {event.tags.map((tag) => (
              <Link
                key={tag}
                href={getSearchURLByTag(tag)}
                className="hover:underline"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventListItem;
