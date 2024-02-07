import Link from "next/link";
import React from "react";
import { Button } from "../../ui/button";
import ThemeDropdown from "../../ui/theme-dropdown";
import { ProfileCardDialog } from "../../specific/profile-card";
import { getUser } from "@/lib/userActions";
import Image from "next/image";
import logoImg from "../assets/logo.png";
import NavLinks from "./NavLinks";

type Props = {};

const Nav = async (props: Props) => {
  const user = await getUser();
  return (
    <header className="px-5 py-2 border-b sticky top-0 w-full bg-background/25 backdrop-blur-md z-50">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href={"/"} className="flex items-center gap-4">
          <Image
            src={logoImg}
            alt="TDH logo"
            className="h-12 w-auto invert-0 dark:invert"
          />
          <h1 className="font-thin text-base leading-none">
            The Designnovation Hub
          </h1>
        </Link>
        <NavLinks>
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
        </NavLinks>
      </nav>
    </header>
  );
};

export { Nav };
