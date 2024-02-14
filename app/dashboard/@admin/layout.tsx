import { Separator } from "@/components/ui/separator";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  events: ReactNode;
  users: ReactNode;
};

const AdminLayout = ({ children, events, users }: Props) => {
  return (
    <div className="flex flex-row gap-5">
      <div className="flex-1">{events}</div>
      <Separator orientation="vertical" className="h-auto" />
      <div className="flex-1">{users}</div>
    </div>
  );
};

export default AdminLayout;
