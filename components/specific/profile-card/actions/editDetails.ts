"use server";

import type { UsersRow } from "@/lib/dbTypes";
import { getSupabase } from "@/lib/supabase";
import { currentUserActions } from "@/lib/userActions";
import { revalidatePath } from "next/cache";

export const editDetails = async (newdata: Partial<UsersRow>) => {
  const supabase = getSupabase();
  const user = await currentUserActions.getUser();
  if (!user) throw new Error("No user");
  const { error } = await supabase
    .from("users")
    .update({ ...newdata, role: undefined })
    .eq("id", user.id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
};
