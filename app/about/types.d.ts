import { TEAMS } from "./constants";

export type TeamMember = {
  name: string;
  team: Team;
  imgPath: string;
  social: Social;
};

export type Social = {
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  insta?: string;
};

export type Team = (typeof TEAMS)[number];
