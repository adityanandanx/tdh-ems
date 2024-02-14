"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UsersRow } from "@/lib/supabase/types";
import React from "react";
import { useChangeRoleMutation } from "../mutation-hooks";

type Props = {
  userId: string;
  currentRole: UsersRow["role"];
};

const UserRolesSelect = ({ currentRole, userId }: Props) => {
  const { mutate, isPending } = useChangeRoleMutation();
  return (
    <Select
      disabled={isPending}
      defaultValue={currentRole}
      onValueChange={(v: UsersRow["role"]) => {
        mutate({ userId, role: v });
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
        <SelectItem value="PARTICIPANT">Participant</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserRolesSelect;
