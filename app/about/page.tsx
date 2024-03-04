import React from "react";
import Team from "./Team";
import teamImg from "./assets/team.jpg";
import founderImg from "./assets/founder.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <>
      <section className="relative px-5 flex flex-col items-center justify-center text-center py-64 gap-5 overflow-hidden">
        <Image
          src={teamImg}
          alt="Team image"
          priority
          className="absolute w-full h-full left-0 top-0 object-cover object-top"
        />
      </section>

      <section className="px-5 flex flex-col items-center justify-center text-left py-32 gap-5">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-5 items-start justify-center">
          <div className="text-justify space-y-4">
            <h1 className="text-center relative text-4xl font-semibold inline">
              About Us
              <div className="bg-primary h-1 absolute left-0 right-0"></div>
            </h1>
            <p>
              The Designnovation Hub (TDH) is a dynamic student organization
              operating at the college level as a club, uniting the brightest
              young minds from various disciplines across campus. With a vision
              to foster impactful technological innovations and inspire students
              to approach real-world problems with fresh perspectives, TDH
              provides the ideal platform for collaborative innovation.
            </p>

            <p>
              At TDH, we believe in the power of technology and creativity to
              drive positive change. Through workshops, sessions, and hands-on
              projects, we equip our members with the knowledge and tools needed
              to tackle complex challenges head-on. Our mission is not only to
              promote human-centered design but also to facilitate
              interdisciplinary collaboration and contribute to the advancement
              of society.
            </p>

            <p>
              Within the nurturing environment of TDH, students have the
              opportunity to engage in product innovations that blend
              cutting-edge technology with human-centered design principles. By
              harnessing their diverse talents and perspectives, our members
              work together to develop innovative solutions that address the
              needs and aspirations of communities both locally and globally.
            </p>
            <p>
              Join TDH and be part of a vibrant community dedicated to
              harnessing the power of innovation to shape a brighter future for
              all.
            </p>
            <Button size={"lg"} variant={"secondary"}>
              <SiWhatsapp className="mr-2" size={16} /> Join our Community
            </Button>
          </div>
        </div>
      </section>
      <section className="px-5 flex flex-col items-center justify-center text-left py-32 gap-5">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-5 items-start justify-center">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="max-w-md min-w-[256px] w-full flex-1">
              <Image
                className="rounded h-auto w-full"
                src={founderImg}
                alt="TDH Founder Photo"
              />
            </div>
            <div className="space-y-4 flex-1">
              <h1 className="relative text-4xl font-semibold inline">
                Founder{"'"}s message
                <div className="bg-primary h-1 absolute left-0 right-0"></div>
              </h1>
              <p>
                We embarked on this journey as a trio of nervous, yet determined
                students, fueled by a shared vision to cultivate a community of
                creative problem solvers. In our early college years, navigating
                the unfamiliar terrain, we grappled with countless uncertainties
                and hurdles, unsure of how to translate our aspirations into
                reality. It was a journey marked by numerous outreach efforts,
                endless steps, and the collaboration of numerous individuals.
              </p>

              <p>
                Today, as I sit down to pen this founder{"'"}s note for our very
                own website, I am filled with a profound sense of gratitude and
                accomplishment. What began as a humble idea has blossomed into a
                thriving club comprising over 60 dedicated student members.
                Together, we embark on exhilarating research and development
                projects, fostering an environment where learning is abundant
                and growth is inevitable.
              </p>

              <p>
                At the core of our mission lies the promotion of
                interdisciplinary collaboration and the cultivation of
                innovative ideas. We strive to broaden the horizons of our
                members, providing them with opportunities to expand their
                skills and perspectives.
              </p>
              <p>
                Being a part of The Designnovation Hub (TDH) has been an honor
                and a privilege. Witnessing the transformation of our juniors as
                they evolve into confident, capable individuals has been nothing
                short of inspiring. I sincerely hope that every member, present
                and future, of TDH finds as much enrichment and inspiration in
                this journey as we have.
              </p>
              <p>
                Here{"'"}s to the continued growth and success of TDH, and to
                the bright futures of all its members. Cheers!{'"'}
              </p>
              <Button size={"lg"} variant={"secondary"}>
                <SiWhatsapp className="mr-2" size={16} /> Join our Community
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Team />
    </>
  );
};

export default About;
