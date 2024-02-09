"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  paths: string[];
};

const HideOnPaths = ({ children, paths }: Props) => {
  const path = usePathname();
  const hidden = paths.includes(path);
  if (hidden) return null;
  return children;
};

export { HideOnPaths };
