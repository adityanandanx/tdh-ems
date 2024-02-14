"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useUserAvatarQuery } from "./hooks/query";
import { Skeleton } from "@/components/ui/skeleton";
import { UserIcon } from "lucide-react";

type Props = {
  userId: string;
};

const UserAvatar = ({ userId }: Props) => {
  const { data, isPending } = useUserAvatarQuery(userId);

  return (
    <Avatar>
      {isPending && <Skeleton className="w-4 h-4 rounded-full" />}
      <AvatarImage className="object-cover" src={data} />
      <AvatarFallback>
        <UserIcon />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
