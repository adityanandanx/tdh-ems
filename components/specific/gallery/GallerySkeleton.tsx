import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const GallerySkeleton = (props: Props) => {
  return (
    <div className="flex flex-1 gap-5 flex-wrap">
      {[...Array(10)].map((_, i) => (
        <>
          <Skeleton
            key={_ + i}
            className="h-[256px] rounded cursor-pointer object-contain"
            style={{ width: Math.floor(400 - Math.random() * 100) }}
          />
        </>
      ))}
    </div>
  );
};

export { GallerySkeleton };
