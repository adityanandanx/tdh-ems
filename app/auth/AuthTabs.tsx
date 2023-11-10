"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const AuthTabs = ({ children }: Props) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const value = path.split("/").at(-1);

  const addSearchParams = (href: string) => {
    return href + "?" + searchParams.toString();
  };

  return (
    <Tabs value={value} className="flex flex-col w-full max-w-md py-10 mx-auto">
      <TabsList className="w-fit mx-auto">
        <Link href={addSearchParams("/auth/login")}>
          <TabsTrigger value="login">Login</TabsTrigger>
        </Link>
        <Link href={addSearchParams("/auth/signup")}>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </Link>
      </TabsList>
      <TabsContent className="" value={value || ""}>
        {children}
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
