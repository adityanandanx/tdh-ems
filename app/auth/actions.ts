"use server";

import { getSupabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { loginFormSchema, signUpFormSchema } from "./formSchema";
import { z } from "zod";

export const handleSignUp = async (d: z.infer<typeof signUpFormSchema>) => {
  "use server";

  const { email, password } = signUpFormSchema.parse(d);

  const supabase = getSupabase();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/");
};

export const handleLogin = async (d: z.infer<typeof loginFormSchema>) => {
  "use server";

  const { email, password } = loginFormSchema.parse(d);

  const supabase = getSupabase();

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/", "layout");
  redirect("/");
};

