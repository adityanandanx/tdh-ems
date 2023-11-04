import { Button } from "@/components/ui/button";
import { getSupabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const LogoutButton = (props: Props) => {
  const handleLogout = async () => {
    "use server";
    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    redirect("/");
  };
  return (
    <form action={handleLogout}>
      <Button variant={"destructive"} size={"sm"}>
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
