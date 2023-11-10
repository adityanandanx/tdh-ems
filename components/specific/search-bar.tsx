"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, HTMLProps, useState } from "react";
import _ from "lodash";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props extends HTMLProps<HTMLDivElement> {}

const SearchBar = ({ className, ...props }: Props) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const router = useRouter();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget) return;
    router.push(`?search=${e.currentTarget.value}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("my-5", className)}
          variant={"outline"}
          size={"icon"}
        >
          <SearchIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={24} asChild>
        <Input
          autoFocus
          name="search"
          className="z-20"
          defaultValue={search || undefined}
          onChange={_.throttle(change, 500)}
          placeholder="Search for an event..."
          type="search"
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
