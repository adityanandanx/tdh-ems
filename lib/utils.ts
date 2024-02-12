import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeStamp = (
  ts: string | null | undefined,
  null_msg: string = "Coming soon"
) => {
  if (!ts) return null_msg;
  const t = new Date(ts);
  return format(t, "EEEE, do MMM yyyy, hh:mm aa");
};
