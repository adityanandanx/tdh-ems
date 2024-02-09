"use server";

import { createClient } from "@/lib/supabase/server";
import { ServerActionResponse } from "@/lib/types";
import { getUser } from "@/lib/userActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const registerForEvent = async (
  eventId: string
): Promise<ServerActionResponse> => {
  const supabase = createClient(cookies());
  const user = await getUser();
  if (!user) redirect(`/auth/login?register=${eventId}`);
  const { data, error } = await supabase
    .from("registrations")
    .insert({ event_id: parseInt(eventId) });
  return { error: error?.message };
};

export { registerForEvent };
