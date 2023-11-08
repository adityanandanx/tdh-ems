import { currentUserActions } from "@/lib/userActions";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileCard } from "./ProfileCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QRCode from "react-qr-code";
import { redirect } from "next/navigation";
import { EventList } from "./EventList";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await currentUserActions.getUser();
  if (!user) redirect("/login");
  return (
    <div className="flex gap-5 items-start">
      <ProfileCard />
      <EventList />
    </div>
  );
};

export default Dashboard;
