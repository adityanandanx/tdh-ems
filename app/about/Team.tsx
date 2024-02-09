"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import React from "react";
import { TEAMS, teamData } from "./constants";
import {
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SocialLink from "@/components/specific/social-link/SocialLink";

const Team = () => {
  return (
    <section className="px-5 flex flex-col items-center justify-center text-left py-32 gap-5">
      <div className="max-w-screen-xl w-full mx-auto flex flex-col gap-10 items-start justify-center">
        <h1 className="relative text-4xl font-semibold">
          The Team
          <div className="bg-primary h-1 absolute left-0 right-0"></div>
        </h1>
        <Tabs defaultValue="tech">
          <TabsList>
            {TEAMS.map((team) => (
              <TabsTrigger className="capitalize" value={team}>
                {team}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {teamData.map((person) => (
              <TabsContent key={person.name} value={person.team}>
                <Card className="h-full overflow-hidden text-center">
                  <CardHeader>
                    <Image
                      className="rounded-full aspect-square"
                      alt={person.name + " photo"}
                      src={person.imgPath}
                      width={512}
                      height={512}
                    />
                    <Separator />
                    <CardTitle>{person.name}</CardTitle>
                    <CardDescription>{person.team}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-2 flex-wrap justify-center">
                    {person.social.website && (
                      <SocialLink
                        name="Website"
                        icon={<GlobeIcon />}
                        link={person.social.website}
                      />
                    )}
                    {person.social.github && (
                      <SocialLink
                        name="Github"
                        icon={<GithubIcon />}
                        link={person.social.github}
                      />
                    )}
                    {person.social.linkedin && (
                      <SocialLink
                        name="Linkedin"
                        icon={<LinkedinIcon />}
                        link={person.social.linkedin}
                      />
                    )}
                    {person.social.twitter && (
                      <SocialLink
                        name="Twitter"
                        icon={<TwitterIcon />}
                        link={person.social.twitter}
                      />
                    )}
                    {person.social.insta && (
                      <SocialLink
                        name="Instagram"
                        icon={<InstagramIcon />}
                        link={person.social.insta}
                      />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default Team;
