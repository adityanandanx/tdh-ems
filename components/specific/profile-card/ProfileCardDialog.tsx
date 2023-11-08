import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { User } from "lucide-react";
import React from "react";
import { ProfileCard } from ".";

type Props = {};

const ProfileCardDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <User />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs p-0">
        <ProfileCard className="bg-transparent border-none" />
      </DialogContent>
    </Dialog>
  );
};

export { ProfileCardDialog };
