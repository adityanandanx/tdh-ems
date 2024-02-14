"use client";
import { Link } from "lucide-react";
import React from "react";
import { UsersTable } from "../../../components/specific/UsersTable";
import { useAllUsersQuery } from "@/components/specific/UsersTable/hooks/query";
import UsersTableSkeleton from "@/components/specific/UsersTable/UsersTableSkeleton";

type Props = {};

const AllUsersView = (props: Props) => {
  const { data: users, isPending, isError } = useAllUsersQuery();
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-medium">Users</h1>
          <p className="text-muted-foreground">Create, Edit or Delete users</p>
        </div>
      </div>
      {isPending ? (
        <UsersTableSkeleton />
      ) : isError ? (
        <></>
      ) : (
        <>
          <UsersTable users={users} />
        </>
      )}
    </>
  );
};

export default AllUsersView;
