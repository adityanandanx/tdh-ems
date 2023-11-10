"use server";

import { getSupabase } from "@/lib/supabase";
import { currentUserActions } from "@/lib/userActions";
import { redirect } from "next/navigation";

const registerForEvent = async (eventId: string) => {
  const supabase = getSupabase();
  const user = await currentUserActions.getUser();
  if (!user) redirect(`/auth/login?register=${eventId}`);
  const { data, error } = await supabase
    .from("registrations")
    .insert({ event_id: parseInt(eventId) });
};

export { registerForEvent };
