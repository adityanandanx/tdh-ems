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
import Fallback from "./Fallback";
import EditAvatar from "./EditAvatar";
import { getUser, getUserAvatarURL, getUserDetails } from "@/lib/userActions";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const ProfileCard = async (props: Props) => {
  const user = await getUser();
  const userDetails = await getUserDetails();
  const userAvatarUrl = await getUserAvatarURL();

  return (
    <Card className="w-full" {...props}>
      <CardHeader>
        <EditAvatar
          full_name={userDetails.full_name}
          avatar_url={userAvatarUrl}
        />
        <CardTitle>
          <EditName full_name={userDetails.full_name} />
        </CardTitle>
        <CardDescription>
          <div className="capitalize">
            {userDetails.role.toLocaleLowerCase()}
          </div>
          {user?.email || user?.phone}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <LogoutButton />
      </CardContent>
    </Card>
  );
};

const ProfileCardWithSuspense = ({ ...props }: Props) => {
  return (
    <Suspense fallback={<Fallback />}>
      <ProfileCard {...props} />
    </Suspense>
  );
};

export { ProfileCardWithSuspense as ProfileCard };
