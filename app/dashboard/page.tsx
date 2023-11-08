import { currentUserActions } from "@/lib/userActions";
import React from "react";
import { redirect } from "next/navigation";
import { EventList } from "@/components/specific/event-list";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await currentUserActions.getUser();
  if (!user) redirect("/login");
  return (
    <div className="flex gap-5 items-start">
      <EventList />
    </div>
  );
};

export default Dashboard;
