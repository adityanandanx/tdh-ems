import {
  deleteImageFromGallery,
  getEventGallery,
} from "@/app/dashboard/@admin/actions";
import Image from "next/image";
import React from "react";
import UploadDropZone from "./UploadDropZone";
import { Button } from "@/components/ui/button";
import GalleryImage from "./GalleryImage";

type Props = {
  eventId: string;
};

const Gallery = async ({ eventId }: Props) => {
  const imageURLs = await getEventGallery(eventId);
  return (
    <div>
      {imageURLs.length === 0 && (
        <div className="text-center p-10">
          No images Found. Try Uploading some.
        </div>
      )}
      <div className="flex flex-wrap gap-2 p-2">
        {imageURLs.map((u) => (
          <GalleryImage eventId={eventId} url={u} />
        ))}
      </div>
      <UploadDropZone eventId={eventId} />
    </div>
  );
};

export default Gallery;
