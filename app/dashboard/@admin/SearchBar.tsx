"use client";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent } from "react";
import _ from "lodash";

type Props = {};

const SearchBar = (props: Props) => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const router = useRouter();

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget) return;
    router.push(`?search=${e.currentTarget.value}`);
  };

  return (
    <div className="flex gap-4 items-center my-5">
      <SearchIcon />
      <Input
        autoFocus
        name="search"
        defaultValue={search || undefined}
        onChange={_.throttle(change, 500)}
        placeholder="Search for an event..."
        type="search"
      />
    </div>
  );
};

export default SearchBar;
