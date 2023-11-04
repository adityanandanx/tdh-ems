import { currentUserActions } from "@/lib/userActions";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileCard } from "./ProfileCard";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await currentUserActions.getUser();
  return (
    <div className="flex">
      <Suspense fallback={<Skeleton className="w-32 h-32" />}>
        <ProfileCard />
      </Suspense>
      <div className="flex-1"></div>
    </div>
  );
};

export default Dashboard;
