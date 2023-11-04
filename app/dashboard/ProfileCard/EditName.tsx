"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";
import React, { useRef, useState, useTransition } from "react";
import { editDetails } from "./actions/editDetails";

type Props = {
  full_name: string | null;
};

const EditName = ({ full_name }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const nameInpRef = useRef<null | HTMLInputElement>(null);

  const handleNameChange = async () => {
    startTransition(async () => {
      await editDetails({ full_name: nameInpRef.current?.value });
      setIsEditing(false);
    });
  };

  return (
    <div className="flex items-center gap-3">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNameChange();
          }}
          className="flex items-center gap-3 flex-1"
        >
          <Input
            ref={nameInpRef}
            className="w-full flex-1"
            defaultValue={full_name || ""}
            name="full_name"
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
          <span className="w-full flex-1">{full_name || "Your Name"}</span>
          <Button
            onClick={() => setIsEditing(true)}
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
