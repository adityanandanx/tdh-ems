"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useUserDataMutation } from "@/hooks/mutations";

type Props = {
  full_name: string | null;
};

const EditName = ({ full_name }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync, isPending } = useUserDataMutation();
  const nameInpRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    nameInpRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="flex items-center gap-3 group">
      {isEditing ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await mutateAsync({ full_name: nameInpRef.current?.value });
            setIsEditing(false);
          }}
          className="flex items-center gap-3 flex-1"
        >
          <Input
            ref={nameInpRef}
            className="w-full flex-1"
            defaultValue={full_name || ""}
            name="full_name"
            disabled={isPending}
          />
          <Button
            type="submit"
            size={"icon"}
            disabled={isPending}
            variant={"secondary"}
          >
            <Check />
          </Button>
        </form>
      ) : (
        <>
          <span
            className="w-full flex-1 select-none"
            onDoubleClick={() => setIsEditing(true)}
          >
            {full_name || "Your Name"}
          </span>
          <Button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity z-10"
            size={"icon"}
            variant={"secondary"}
          >
            <Pencil />
          </Button>
        </>
      )}
    </div>
  );
};

export default EditName;
