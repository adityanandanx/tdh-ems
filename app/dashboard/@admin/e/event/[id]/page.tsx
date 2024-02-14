import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditEventForm } from "../../../edit-event-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Gallery } from "../../../gallery-edit";
import { getSupabase } from "@/lib/supabase/server";
import { getEvent } from "@/lib/actions/events";
import { EventUsersView } from "./EventUsersView";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: {
    id?: string;
  };
};

const EditEventPage = async ({ params }: Props) => {
  if (!params.id) notFound();
  const supabase = getSupabase();
  const event = await getEvent(params.id, supabase);
  if (!event) notFound();
  return (
    <div>
      <div className="relative flex flex-col lg:flex-row gap-16 items-stretch">
        <Suspense fallback={<Skeleton className="h-96" />}>
          <div className="flex-1">
            <EditEventForm
              defaultValues={{ ...event, id: parseInt(params.id) }}
            />
          </div>
        </Suspense>
        <Suspense fallback={<Skeleton className="h-96" />}>
          <div className="flex-1">
            <Gallery eventId={params.id} />
          </div>
        </Suspense>
      </div>
      <Separator className="w-full my-10" />
      <EventUsersView eventId={params.id} />
    </div>
  );
};

export default EditEventPage;
