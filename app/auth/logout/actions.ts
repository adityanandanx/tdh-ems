"use server";

import { getSupabase } from "@/lib/supabase/server";
import { ServerActionResponse } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const logoutAction = async (): Promise<ServerActionResponse<boolean>> => {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/");
  return { data: true, error: error?.message };
};

export { logoutAction };
