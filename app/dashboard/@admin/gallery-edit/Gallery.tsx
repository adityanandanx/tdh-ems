import React from "react";
import UploadDropZone from "./UploadDropZone";
import GalleryImage from "./GalleryImage";
import { getEventGallery } from "@/lib/actions/events";
import CoverImage from "./CoverImage";
import { Separator } from "@/components/ui/separator";
import { getSupabase } from "@/lib/supabase/server";

type Props = {
  eventId: string;
};

const Gallery = async ({ eventId }: Props) => {
  const supabase = getSupabase();
  const imageURLs = await getEventGallery(supabase, eventId);
  return (
    <div className="flex-1">
      <CoverImage eventId={eventId} />
      <Separator className="my-10" />
      <h1 className="text-2xl font-medium">Gallery</h1>
      <p className="text-sm">Right click on an image for more options</p>
      {imageURLs.length === 0 && (
        <div className="text-center p-10">
          No images Found. Try Uploading some.
        </div>
      )}
      <div className="flex flex-wrap flex-row gap-2 py-4">
        {imageURLs.map((u) => (
          <GalleryImage key={u} eventId={eventId} url={u} />
        ))}
      </div>
      <UploadDropZone eventId={eventId} />
    </div>
  );
};

export default Gallery;
