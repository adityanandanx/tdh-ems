import React, { Suspense } from "react";
import { getEvent } from "../../actions";
import { notFound } from "next/navigation";
import { EditEventForm } from "../../edit-event-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Gallery } from "../../gallery-edit";

type Props = {};

const EditEventPage = async ({}: Props) => {
  return (
    <div className="max-w-md w-full mx-auto">
      <Suspense fallback={<Skeleton className="h-96" />}>
        <EditEventForm action="create" />
      </Suspense>
    </div>
  );
};

export default EditEventPage;
