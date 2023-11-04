import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./LoginForm";

type Props = {};

const LoginPage = (props: Props) => {
  const handleLogin = async (fdata: FormData) => {
    "use server";

    const supabase = getSupabase();

    const email = fdata.get("email") as string;
    const password = fdata.get("password") as string;
    if (!email || !password) return null;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    redirect("/");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
};

export default LoginPage;
