"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { HTMLAttributes, HTMLProps, Suspense } from "react";
import EditName from "./EditName";
import LogoutButton from "@/app/auth/logout/LogoutButton";
import ProfileCardSkeleton from "./ProfileCardSkeleton";
import EditAvatar from "./EditAvatar";
import { getUser, getUserAvatarURL, getUserDetails } from "@/lib/userActions";
import { useUserDataQuery, useUserQuery } from "@/hooks/queries";
import { useToast } from "@/components/ui/use-toast";
import useCurrentUserAvatarQuery from "@/hooks/queries/useCurrentUserAvatarQuery";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ProfileCard = (props: Props) => {
  const { data, isPending, isError, error } = useUserDataQuery();
  const {
    data: userAvatarUrl,
    isPending: avatarPending,
    isError: avatarIsError,
    error: avatarError,
  } = useCurrentUserAvatarQuery();
  const { toast } = useToast();
  if (isPending || avatarPending) return <ProfileCardSkeleton />;
  if (isError || avatarIsError) {
    toast({
      title: "An Error Occurred",
      description: error?.message || avatarError?.message,
    });
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="w-full" {...props}>
      <CardHeader>
        <EditAvatar full_name={data.full_name} avatar_url={userAvatarUrl} />
        <CardTitle>
          <EditName full_name={data.full_name} />
        </CardTitle>
        <CardDescription>
          <div className="capitalize">{data.role.toLocaleLowerCase()}</div>
          {data.email}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LogoutButton />
      </CardContent>
    </Card>
  );
};

export { ProfileCard };
