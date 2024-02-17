import React from "react";
import Team from "./Team";
import teamImg from "./assets/team.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

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
          <h1 className="relative text-4xl font-semibold">
            About Us
            <div className="bg-primary h-1 absolute left-0 right-0"></div>
          </h1>
          <div className="space-y-4">
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
      <Team />
    </>
  );
};

export default About;
