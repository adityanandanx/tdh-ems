"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

const NavLinks = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const handleResize = () => {
    setOpen(false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="block">
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed flex flex-col -z-20 right-0 left-0 top-full opacity-100 p-10 bg-background shadow-xl gap-5 md:static md:flex-row md:p-0 md:items-center transform transition-[transform,opacity] md:translate-y-0",
          open
            ? "translate-y-0 opacity-100"
            : "-translate-y-1/2 pointer-events-none opacity-0 md:opacity-100 md:pointer-events-auto"
        )}
      >
        {children}
      </div>
      <Button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden"
        size={"icon"}
        variant={"ghost"}
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default NavLinks;
