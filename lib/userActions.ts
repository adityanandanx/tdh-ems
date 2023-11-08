import "server-only";
import { cache } from "react";
import { User } from "@supabase/supabase-js";
import { getSupabase } from "./supabase";

class CurrentUserActions {
  getUser = cache(async () => {
    const supabase = getSupabase();
    const { data } = await supabase.auth.getUser();
    return data.user;
  });

  getRole = cache(async () => {
    const supabase = getSupabase();
    const user = await this.getUser();
    if (!user) throw new Error("User not logged in.");
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id);
    if (error) throw new Error(error.message);
    return data[0].role;
  });

  getDetails = cache(async () => {
    const supabase = getSupabase();
    const user = await this.getUser();
    if (!user) throw new Error("User not logged in.");
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", user.id);
    if (error) throw new Error(error.message);
    return data[0];
  });

  getUserAvatarURL = cache(async () => {
    const supabase = getSupabase();
    const user = await this.getUser();
    if (!user) throw new Error("User not logged in.");
    const { data } = supabase.storage
      .from("avatar")
      .getPublicUrl(user.id + "/profile?time=" + new Date().getMilliseconds());
    return data.publicUrl;
  });
}

const currentUserActions = new CurrentUserActions();

export { currentUserActions };
