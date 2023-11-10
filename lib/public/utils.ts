const getGalleryImageUrlFromName = (eventId: string | number, name: string) => {
  const publicUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/event/${eventId}/gallery/${name}`;
  return publicUrl;
};

export { getGalleryImageUrlFromName };
