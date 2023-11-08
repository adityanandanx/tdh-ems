"use server";

import { getSupabase } from "@/lib/supabase";
import { currentUserActions } from "@/lib/userActions";
import { revalidatePath } from "next/cache";

export const editAvatar = async (fdata: FormData) => {
  const supabase = getSupabase();

  const user = await currentUserActions.getUser();
  if (!user) throw new Error("User not logged in.");
  console.log(`/${user.id}/profile`);
  const avatar = fdata.get("avatar");
  console.log(fdata);
  console.log(avatar);

  if (!avatar) return;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`${user.id}/profile`, avatar, { upsert: true });
  // console.log({ data });

  if (error) throw new Error(error.message);
  revalidatePath("/dashboard");
};
