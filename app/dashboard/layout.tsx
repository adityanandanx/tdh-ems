import { currentUserActions } from "@/lib/userActions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const user = await currentUserActions.getUser();
  if (!user) redirect("/auth/login");
  return (
    <main>
      <section>
        <div className="max-w-screen-xl mx-auto">{children}</div>
      </section>
    </main>
  );
};

export default DashboardLayout;
