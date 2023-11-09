import { getSupabase } from "../supabase";

const getCoverImageUrlFromName = (
  eventId: string | number,
  name: string | null
) => {
  const publicUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/event/${eventId}/gallery/${name}`;
  return publicUrl;
};

export { getCoverImageUrlFromName };
