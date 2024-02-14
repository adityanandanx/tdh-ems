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
import React, { useState } from "react";
import { useChangeRoleMutation } from "./hooks/mutation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  userId: string;
  currentRole: UsersRow["role"];
};

const UserRolesSelect = ({ currentRole, userId }: Props) => {
  const { mutate, isPending } = useChangeRoleMutation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [value, setValue] = useState<UsersRow["role"]>(currentRole);
  return (
    <>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will give access to all admin actions to this user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setValue(currentRole)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => mutate({ role: value, userId: userId })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Select
        disabled={isPending}
        // defaultValue={currentRole}
        value={value}
        onValueChange={(v: UsersRow["role"]) => {
          setValue(v);
          if (v === "ADMIN") {
            setAlertOpen(true);
          } else {
            mutate({ role: v, userId });
          }
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
    </>
  );
};

export default UserRolesSelect;
