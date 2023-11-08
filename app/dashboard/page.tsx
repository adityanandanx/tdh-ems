import { currentUserActions } from "@/lib/userActions";
import React from "react";
import { redirect } from "next/navigation";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await currentUserActions.getUser();
  const role = await currentUserActions.getRole();
  if (!user) redirect("/login");
  return <div className="flex gap-5 items-start">this is main page</div>;
};

export default Dashboard;
