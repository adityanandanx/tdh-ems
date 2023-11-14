import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { EditEventForm } from "../../../edit-event-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Gallery } from "../../../gallery-edit";
import { Separator } from "@/components/ui/separator";
import { getEvent } from "../../../actions";

type Props = {
  params: {
    id?: string;
  };
};

const EditEventPage = async ({ params }: Props) => {
  if (!params.id) notFound();
  const { data: event } = await getEvent(params.id);
  return (
    <div className="relative flex flex-col lg:flex-row gap-16 items-stretch">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <EditEventForm defaultValues={event} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-96" />}>
        <Gallery eventId={params.id} />
      </Suspense>
    </div>
  );
};

export default EditEventPage;
