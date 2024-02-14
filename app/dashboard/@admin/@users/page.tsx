import { Link } from "lucide-react";
import React from "react";
import {UsersTable} from "./UsersTable";

type Props = {};

const UsersPage = (props: Props) => {
  return (
    <>
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-medium">Users</h1>
          <p className="text-muted-foreground">Create, Edit or Delete users</p>
        </div>
      </div>
      <UsersTable />
    </>
  );
};

export default UsersPage;
