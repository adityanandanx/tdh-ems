import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const Fallback = (props: Props) => {
  return <Skeleton className="max-w-xs w-full h-96" />;
};

export default Fallback;
