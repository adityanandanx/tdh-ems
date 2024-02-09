import Image from "next/image";
import React from "react";
import logoImg from "@/components/shared/assets/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InstagramIcon, LinkedinIcon } from "lucide-react";
import SocialLink from "@/components/specific/social-link/SocialLink";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto py-20 px-5 xl:px-0 flex flex-col lg:flex-row gap-20">
        <div className="max-w-sm flex-1">
          <Image
            src={logoImg}
            className="invert w-32 h-auto mb-4"
            alt="TDH Logo"
          />
          <h1 className="text-2xl">The Designnovation Hub</h1>
          <p className="text-muted-foreground text-sm">
            Innovation and impact through design thinking, software development
            and research.
          </p>
          <p className="mt-4 md:mt-10 text-sm">
            &copy; 2024 The Designnovation Hub | All Rights Reserved
          </p>
        </div>
        <div className="flex-1 dark flex flex-col gap-2">
          <h1 className="text-2xl">Socials</h1>
          <div className="flex gap-2">
            <SocialLink
              name="TDH Instagram"
              link="https://www.instagram.com/tdhgeu/"
              icon={<InstagramIcon />}
            />
            <SocialLink
              name="TDH Linkedin"
              link="https://www.linkedin.com/company/thedesignnovationhub"
              icon={<LinkedinIcon />}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Link href="/events">Events</Link>
          <Link href="/about">About</Link>
          <Link href="https://www.instagram.com/tdhgeu" target="_blank">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
