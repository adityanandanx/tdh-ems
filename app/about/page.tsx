import React from "react";
import Team from "./Team";
import teamImg from "./assets/team.jpg";
import Image from "next/image";

const About = () => {
  return (
    <>
      <section className="relative px-5 flex flex-col items-center justify-center text-center py-64 gap-5 overflow-hidden">
        <Image
          src={teamImg}
          alt="Team image"
          priority
          className="absolute w-full h-full left-0 top-0 object-cover object-center"
        />
      </section>

      <section className="px-5 flex flex-col items-center justify-center text-left py-32 gap-5">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-5 items-start justify-center">
          <h1 className="relative text-4xl font-semibold">
            About Us
            <div className="bg-primary h-1 absolute left-0 right-0"></div>
          </h1>
          <p>
            The Designnovation Hub has the vision to create impactful
            technological innovations and inspire students to innovate and bring
            fresh perspectives to real-world problems.The club aims to promote
            design thinking and creativity, collaborate with other clubs in
            various fields, and contribute to the growth of society. The mission
            includes providing knowledge about design thinking, conducting
            workshops and sessions, facilitating team projects. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Laudantium cupiditate
            hic nemo odio nisi veniam libero consequatur, doloribus cumque
            praesentium. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Harum cupiditate laboriosam similique? Ea ullam non nemo modi
            autem excepturi eos.
          </p>
        </div>
      </section>
      <Team />
    </>
  );
};

export default About;
