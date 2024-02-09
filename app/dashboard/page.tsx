import React from "react";
import { redirect } from "next/navigation";
import { getUser, getUserRole } from "@/lib/userActions";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await getUser();
  if (!user) redirect("/login");
  return <div className="flex gap-5 items-start">this is main page</div>;
};

export default Dashboard;
