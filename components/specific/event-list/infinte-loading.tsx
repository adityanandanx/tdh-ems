"use client";
import { MotionButton } from "@/components/ui/button";
import { EventsRow } from "@/lib/dbTypes";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useScroll, useSpring, useTransform } from "framer-motion";
import { RotateCw } from "lucide-react";
import React, { RefObject, useRef } from "react";

type Props = {
  eventsQuery: ReturnType<
    typeof useInfiniteQuery<{ events: EventsRow[]; pageParam: number }>
  >;
  containerRef?: RefObject<HTMLElement>;
};

const InfiniteLoading = ({ eventsQuery, containerRef }: Props) => {
  const { isFetching, isFetchingNextPage, fetchNextPage } = eventsQuery;

  const loaderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: loaderRef,
    offset: ["start end", "end end"],
  });
  let rotateZ = useSpring(scrollYProgress);
  rotateZ = useTransform(rotateZ, [0, 1], ["0deg", "360deg"]);

  return (
    <div ref={loaderRef} className="self-center py-20">
      <MotionButton
        size={"icon"}
        variant={"ghost"}
        disabled={isFetching || isFetchingNextPage}
        style={{ rotateZ: rotateZ }}
        onViewportEnter={() => fetchNextPage()}
        onClick={() => fetchNextPage()}
        className={cn(
          isFetching || isFetchingNextPage ? "animate-spin" : "mx-auto"
        )}
      >
        <RotateCw />
      </MotionButton>
    </div>
  );
};

export default InfiniteLoading;
