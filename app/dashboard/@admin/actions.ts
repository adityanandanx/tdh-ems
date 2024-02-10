import { EventsRow, TypedSupabaseClient } from "@/lib/supabase/types";
import { getEventCoverImage } from "@/lib/actions/events";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

const getEvent = async (
  id: string,
  supabase: TypedSupabaseClient
): Promise<ServerActionResponse<EventsRow>> => {
  const { data, error } = await supabase.from("events").select().eq("id", id);
  console.log(data, error);

  return { error: error?.message, data: data?.[0] };
};

const updateEvent = async (
  newdata: Partial<EventsRow> & { id: string | number }
): Promise<ServerActionResponse> => {
  console.log("UPDATING", newdata);

  const { error } = await supabase
    .from("events")
    .update(newdata)
    .eq("id", newdata.id);
  return { error: error?.message };
};

const createEvent = async (
  newdata: Omit<EventsRow, "id" | "created_at" | "published" | "owner" | "tags">
): Promise<ServerActionResponse<number | undefined>> => {
  const { data, error } = await supabase
    .from("events")
    .insert(newdata)
    .select("id");
  console.log("CREATED", newdata);

  return { error: error?.message, data: data?.[0].id };
};

const deleteEvent = async (id: string): Promise<ServerActionResponse> => {
  const { error } = await supabase.from("events").delete().eq("id", id);
  return { error: error?.message };
};

const uploadImageToGallery = async (eventId: string, fdata: FormData) => {
  const file = fdata.get("image")! as File;
  const { data, error } = await supabase.storage
    .from("event")
    .upload(
      `${eventId}/gallery/${file.name.replaceAll(
        " ",
        "_"
      )}_t=${new Date().getMilliseconds()}`,
      file
    );
  // revalidatePath(`/dashboard/e/event/${eventId}`);
  // revalidatePath("/events");
  if (error) throw error;
  // return { error: error?.message };
};

const deleteImageFromGallery = async (eventId: string, imageURL: string) => {
  console.log("SLFDKJ");

  const imgPath = imageURL.split("event/")[1];
  const coverURL = await getEventCoverImage(supabase, eventId);
  if (coverURL === imageURL) {
    setEventCoverImage(eventId, null);
  }
  const { data, error } = await supabase.storage
    .from("event")
    .remove([imgPath]);
  if (error) throw error;
};

const setEventCoverImage = async (
  eventId: string,
  publicUrl: string | null
): Promise<ServerActionResponse> => {
  const { error } = await supabase
    .from("events")
    .update({ cover_image_url: publicUrl?.split("/").at(-1) })
    .eq("id", eventId);
  // revalidatePath(`/dashboard/e/event/${eventId}`);
  // revalidatePath("/events");
  return { error: error?.message };
};

export {
  getEvent,
  updateEvent,
  createEvent,
  deleteEvent,
  setEventCoverImage,
  uploadImageToGallery,
  deleteImageFromGallery,
};
