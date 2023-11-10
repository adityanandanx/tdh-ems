import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { currentUserActions } from "@/lib/userActions";
import ThemeDropdown from "../ui/theme-dropdown";
import { ProfileCardDialog } from "../specific/profile-card";

type Props = {};

const Nav = async (props: Props) => {
  const user = await currentUserActions.getUser();
  return (
    <header className="px-5 py-2 border-b sticky top-0 w-full bg-background/25 backdrop-blur-md z-50">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="font-bold text-xl">EvE</h1>
        </Link>
        <div className="flex gap-5 items-center">
          <Link href="/events">Events</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
          {user ? (
            <Link href="/dashboard">
              <Button size={"sm"}>Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant={"secondary"} size={"sm"}>
                  Log In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size={"sm"}>Sign Up</Button>
              </Link>
            </>
          )}
          <div className="flex gap-1">
            <ThemeDropdown />
            {user ? <ProfileCardDialog /> : null}
          </div>
        </div>
      </nav>
    </header>
  );
};

export { Nav };
