"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import type { EventsRow } from "@/lib/supabase/types";
import useNavHeight from "@/hooks/useNavHeight";
import { cn, formatTimeStamp } from "@/lib/utils";
import Image from "next/image";
import { CheckIcon, ImageIcon } from "lucide-react";
import { getGalleryImageUrlFromName } from "@/lib/actions/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { registerForEvent } from "./actions";
import useActionTransition from "@/hooks/useActionTransition";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  event: EventsRow;
  registered?: boolean;
};

const EventListItem = ({ event, registered = false }: Props) => {
  const registerAction = useActionTransition(registerForEvent);
  const navHeight = useNavHeight();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const getSearchURLByTag = (tag: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tag", tag);
    return "/events?" + newParams.toString();
  };

  const handleRegister = () => {
    registerAction.runAction(event.id.toString());
    queryClient.invalidateQueries({ queryKey: ["events", "registered"] });
  };

  return (
    <Card
      className={cn(
        "relative group w-full max-w-md snap-center shrink-0 z-0 flex flex-col justify-end overflow-hidden",
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
      <div className="w-full z-20 bg-gradient-to-t from-card to-transparent">
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
                disabled={registered || registerAction.isPending}
                onClick={handleRegister}
                className="w-fit"
                size={"sm"}
                variant={"default"}
              >
                {registered ? (
                  <>
                    Registered <CheckIcon size={16} />
                  </>
                ) : (
                  "Register"
                )}
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
