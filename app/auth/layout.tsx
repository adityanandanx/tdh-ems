import { Card } from "@/components/ui/card";
import React, { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthTabs from "./AuthTabs";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main>
      <section className="max-w-screen-xl mx-auto">
        <AuthTabs>{children}</AuthTabs>
      </section>
    </main>
  );
};

export default Layout;
