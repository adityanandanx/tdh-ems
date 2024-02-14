import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const GallerySkeleton = (props: Props) => {
  return (
    <div className="flex flex-1">
      {[...Array(10)].map((_, i) => (
        <>
          <Skeleton
            key={i}
            className="w-auto max-h-[256px] rounded cursor-pointer object-contain"
          />
        </>
      ))}
    </div>
  );
};

export { GallerySkeleton };
