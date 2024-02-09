"use server";
import { cache } from "react";
import { createClient } from "./supabase/server";
import { EventsColumn, EventsRow } from "./dbTypes";
import { cookies } from "next/headers";

const getUser = cache(async () => {
  const supabase = createClient(cookies());
  const { data } = await supabase.auth.getUser();
  return data.user;
});

const getUserRole = cache(async () => {
  const supabase = createClient(cookies());
  const user = await getUser();
  if (!user) throw new Error("User not logged in.");
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  return data[0].role;
});

const getUserDetails = cache(async () => {
  const supabase = createClient(cookies());
  const user = await getUser();
  if (!user) throw new Error("User not logged in.");
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  return data[0];
});

const getUserAvatarURL = cache(async () => {
  const supabase = createClient(cookies());
  const user = await getUser();
  if (!user) throw new Error("User not logged in.");
  const { data } = supabase.storage
    .from("avatar")
    .getPublicUrl(user.id + "/profile?time=" + new Date().getMilliseconds());
  return data.publicUrl;
});

const getUserRegisteredEvents = cache(async () => {
  const supabase = createClient(cookies());
  const user = await getUser();
  if (!user) throw new Error("User not logged in.");
  const { data, error } = await supabase
    .from("registrations")
    .select(
      `
    events (
      *
    )
    `
    )
    .eq("user_id", user.id);
  if (error) throw new Error(error.message);
  const res: EventsRow[] = [];
  data.forEach((d) => {
    if (!d.events) return;
    res.push(d.events);
  });
  return res;
});

export {
  getUser,
  getUserAvatarURL,
  getUserRole,
  getUserRegisteredEvents,
  getUserDetails,
};
