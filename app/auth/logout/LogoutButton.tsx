"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { logoutAction } from "./actions";
import useActionTransition from "@/hooks/useActionTransition";

type Props = {};

const LogoutButton = (props: Props) => {
  const { isPending, runAction } = useActionTransition(logoutAction);
  const handleLogout = async () => {
    runAction();
  };
  return (
    <form action={handleLogout}>
      <Button disabled={isPending} variant={"destructive"} size={"sm"}>
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
