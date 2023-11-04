"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const AuthTabs = ({ children }: Props) => {
  const path = usePathname();
  const value = path.split("/").at(-1);

  return (
    <Tabs value={value} className="flex flex-col w-full max-w-md py-10 mx-auto">
      <TabsList className="w-fit mx-auto">
        <Link href={"login"}>
          <TabsTrigger value="login">Login</TabsTrigger>
        </Link>
        <Link href={"signup"}>
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
