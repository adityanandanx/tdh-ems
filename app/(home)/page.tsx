import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import React from "react";
import partyImg from "./assets/party.jpeg";
import Image from "next/image";
import EventsCards from "./EventsCards";
import Link from "next/link";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
// import Card from "../components/ui/Card";
// import EventGallery from "../components/EventGallery";

const Home = () => {
  return (
    <>
      <section className="flex flex-col gap-5 justify-center items-center px-5 pt-10">
        <h1 className="text-3xl text-center sm:text-2xl">
          Join Freshers Group 2024
        </h1>
        <Link
          className="text-center"
          href="https://chat.whatsapp.com/JT5CEE94crK72VviHrSqW9"
          target="_blank"
        >
          <Button size={"lg"}>
            Join Group
            <ChevronRightIcon className="-mr-3 ml-3" size={16} />
          </Button>
        </Link>
      </section>

      <section className="flex flex-col gap-5 justify-center items-center px-5 py-32 text-center">
        <h1 className="py-2 max-w-2xl text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b sm:text-5xl md:text-6xl from-foreground to-foreground/75">
          &ldquo;Technology is Best when it brings people together&rdquo;
        </h1>
        <p className="max-w-screen-md text-base sm:text-xl text-muted-foreground">
          The Designnovation Hub has the vision to create impactful technologies
          innovations and inspire students to innovate and bring fresh
          perspectives to real-world problems. The club aims to promote design
          thinking and creativity.
        </p>
        <div className="flex gap-5">
          <Link href="/events">
            <Button size={"lg"} variant={"secondary"}>
              Know More <ChevronRightIcon className="-mr-3 ml-3" size={16} />
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button size={"lg"}>
              Sign Up <ChevronRightIcon className="-mr-3 ml-3" size={16} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="flex flex-col gap-5 justify-center items-center px-5 py-32 text-left">
        <div className="flex flex-col gap-5 mx-auto max-w-screen-xl sm:flex-row">
          <div className="flex-1 max-h-[400px]">
            <Image
              className="object-cover w-full h-full rounded-md"
              alt="partying image"
              src={partyImg}
            />
          </div>
          <div className="flex flex-col flex-1 gap-5 justify-center">
            <h1 className="relative text-4xl font-semibold">Community</h1>
            <p>
              Unlock your potential and join us on a journey of knowledge,
              growth, and inspiration. Our seminars are designed to empower you
              with the tools, strategies, and insights needed to thrive in today
              {"'"}s ever-changing world. Don{"'"}t miss the opportunity.
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="https://chat.whatsapp.com/C1OgteyQ9FQFoej3srNIX7"
                target="_blank"
              >
                <Button size={"lg"} variant={"default"}>
                  <SiWhatsapp className="mr-2" size={16} /> Join our Whatsapp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-5 justify-center items-center px-5 py-32 text-left">
        <div className="flex flex-col gap-10 justify-center items-start mx-auto w-full max-w-screen-xl">
          <h1 className="relative text-4xl font-semibold">
            Take a sneak peek into our efforts
            <div className="absolute right-0 left-0 h-1 bg-primary"></div>
          </h1>
          <EventsCards />
        </div>
      </section>
    </>
  );
};

export default Home;
