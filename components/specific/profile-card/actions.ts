"use server";

import { getSupabase } from "@/lib/supabase";
import { currentUserActions } from "@/lib/userActions";
import { revalidatePath } from "next/cache";
import type { UsersRow } from "@/lib/dbTypes";

export const editAvatar = async (fdata: FormData) => {
  const supabase = getSupabase();

  const user = await currentUserActions.getUser();
  if (!user) throw new Error("User not logged in.");
  const avatar = fdata.get("avatar");

  if (!avatar) return;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`${user.id}/profile`, avatar, { upsert: true });
  // console.log({ data });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
};


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
