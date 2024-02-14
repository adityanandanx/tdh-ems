import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  imgUrls: string[];
};

const Gallery = ({ imgUrls }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  return (
    <>
      <div className="flex flex-wrap items-start justify-stretch gap-5">
        {imgUrls.map((url, i) => (
          <Image
            key={url}
            className="w-auto flex-1 max-w-[512px] max-h-[256px] h-full rounded cursor-pointer object-cover"
            onClick={() => {
              setModalOpen(true);
              setCurrent(i);
            }}
            src={url}
            alt="image"
            width={512}
            height={256}
          />
        ))}
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-full p-0 max-w-screen-lg h-[98vh]">
          <Carousel
            opts={{ startIndex: current, loop: true }}
            className="my-auto"
          >
            <CarouselContent className="">
              {imgUrls.map((url) => (
                <CarouselItem key={url}>
                  <Image
                    className="w-auto h-full max-h-[98vh] rounded-lg object-contain cursor-pointer mx-auto"
                    src={url}
                    alt="image"
                    width={1080}
                    height={512}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { Gallery };
