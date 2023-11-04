import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUserActions } from "@/lib/userActions";
import React from "react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditName from "./EditName";
import LogoutButton from "@/app/auth/logout/LogoutButton";

type Props = {};

const ProfileCard = async (props: Props) => {
  const user = await currentUserActions.getUser();
  const userDetails = await currentUserActions.getDetails();

  return (
    <Card className="max-w-xs w-full">
      <CardHeader>
        <Avatar className="w-48 h-48 text-5xl self-center">
          <AvatarImage src="" alt="" />
          <AvatarFallback>
            {userDetails.full_name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <CardTitle>
          <EditName full_name={userDetails.full_name} />
        </CardTitle>
        <CardDescription>{user?.email || user?.phone}</CardDescription>
      </CardHeader>

      <CardContent>
        <LogoutButton />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
