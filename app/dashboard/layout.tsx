import { getUser, getUserRole } from "@/lib/userActions";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import NameAlert from "./NameAlert/NameAlert";

type Props = {
  children: ReactNode;
  admin: ReactNode;
  participant: ReactNode;
  volunteer: ReactNode;
};

const DashboardLayout = async ({
  children,
  admin,
  participant,
  volunteer,
}: Props) => {
  const user = await getUser();
  if (!user) redirect("/auth/login");
  const role = await getUserRole();
  return (
    <main>
      <section>
        <NameAlert />
        <div className="max-w-screen-xl mx-auto">
          {(() => {
            switch (role) {
              case "PARTICIPANT":
                return participant;
              case "VOLUNTEER":
                return volunteer;
              case "ADMIN":
                return admin;
              default:
                return <>WTF</>;
            }
          })()}
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
