import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  name: string;
  link: string;
  icon: ReactNode;
};

const SocialLink = ({ name, link, icon }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <Link target="_blank" href={link}>
              {icon}
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SocialLink;
