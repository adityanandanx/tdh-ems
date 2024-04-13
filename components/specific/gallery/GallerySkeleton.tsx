import { Skeleton } from "@/components/ui/skeleton";
import React, { useCallback, useMemo } from "react";

type Props = {};

const randomWidths = [...Array(10)].map((_, i) =>
  Math.floor(400 - Math.random() * 100)
);

const GallerySkeleton = (props: Props) => {
  return (
    <div className="flex flex-1 gap-5 flex-wrap">
      {randomWidths.map((w, i) => (
        <>
          <Skeleton
            key={w + i}
            className="h-[256px] rounded cursor-pointer object-contain"
            style={{ width: w }}
          />
        </>
      ))}
    </div>
  );
};

export { GallerySkeleton };
