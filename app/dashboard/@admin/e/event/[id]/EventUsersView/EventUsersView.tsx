"use client";
import React from "react";
import { useRegisteredUsersQuery } from "./hooks/query";
import { UsersRow } from "@/lib/supabase/types";
import UsersTableSkeleton from "@/components/specific/UsersTable/UsersTableSkeleton";
import { toast } from "@/components/ui/use-toast";
import { UsersTable } from "@/components/specific/UsersTable";

type Props = {
  eventId: string;
};

const EventUsersView = ({ eventId }: Props) => {
  const { data, isPending, isError, error } = useRegisteredUsersQuery(eventId);
  const users: UsersRow[] = [];
  if (isError) {
    toast({ title: "An error occured", description: error.message });
    return null;
  }
  data?.forEach((d) => {
    if (d.users) users.push(d.users);
  });
  return (
    <div className="mb-20">
      <h1 className="text-2xl font-medium">Registered Users</h1>
      {isPending ? <UsersTableSkeleton /> : <UsersTable users={users} />}
    </div>
  );
};

export default EventUsersView;
