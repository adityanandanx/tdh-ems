"use server";

import { EventsRow } from "@/lib/dbTypes";
import { getEventCoverImage } from "@/lib/public/actions";
import { createClient } from "@/lib/supabase/server";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getEvent = async (
  id: string
): Promise<ServerActionResponse<EventsRow>> => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("events").select().eq("id", id);
  return { error: error?.message, data: data?.[0] };
};

const updateEvent = async (
  newdata: Partial<EventsRow> & { id: string | number }
): Promise<ServerActionResponse> => {
  const supabase = createClient(cookies());
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
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("events")
    .insert(newdata)
    .select("id");
  console.log("CREATED", newdata);

  return { error: error?.message, data: data?.[0].id };
};

const deleteEvent = async (id: string): Promise<ServerActionResponse> => {
  const supabase = createClient(cookies());
  const { error } = await supabase.from("events").delete().eq("id", id);
  return { error: error?.message };
};

const uploadImageToGallery = async (
  eventId: string,
  fdata: FormData
): Promise<ServerActionResponse> => {
  const file = fdata.get("image")! as File;
  const supabase = createClient(cookies());
  const { data, error } = await supabase.storage
    .from("event")
    .upload(
      `${eventId}/gallery/${file.name.replaceAll(
        " ",
        "_"
      )}_t=${new Date().getMilliseconds()}`,
      file
    );
  revalidatePath(`/dashboard/e/event/${eventId}`);
  revalidatePath("/events");
  return { error: error?.message };
};

const deleteImageFromGallery = async (
  eventId: string,
  imageURL: string
): Promise<ServerActionResponse> => {
  const supabase = createClient(cookies());
  const imgPath = imageURL.split("event/")[1];
  const coverURL = await getEventCoverImage(eventId);
  if (coverURL === imageURL) {
    setEventCoverImage(eventId, null);
  }
  const { data, error } = await supabase.storage
    .from("event")
    .remove([imgPath]);

  revalidatePath(`/dashboard/e/event/${eventId}`);
  revalidatePath("/events");
  return { error: error?.message };
};

const setEventCoverImage = async (
  eventId: string,
  publicUrl: string | null
): Promise<ServerActionResponse> => {
  const supabase = createClient(cookies());
  const { error } = await supabase
    .from("events")
    .update({ cover_image_url: publicUrl?.split("/").at(-1) })
    .eq("id", eventId);
  revalidatePath(`/dashboard/e/event/${eventId}`);
  revalidatePath("/events");
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
