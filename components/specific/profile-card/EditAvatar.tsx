"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { FormEvent, useCallback, useState, useTransition } from "react";
import { User as UserIcon, Pencil, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editAvatar } from "./actions";
import { Input } from "@/components/ui/input";
import useCurrentUserAvatarMutation from "@/hooks/mutations/useCurrentUserAvatarMutation";

type Props = {
  full_name: string | null;
  avatar_url: string | null;
};

const EditAvatar = ({ full_name, avatar_url }: Props) => {
  const { mutate, isPending } = useCurrentUserAvatarMutation();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      // onDrop,
      accept: {
        "image/*": [],
      },
      maxFiles: 1,
    });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!acceptedFiles[0]) return;
    mutate(acceptedFiles[0]);
  };

  return (
    <div className="relative self-center group">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <button className="">
              <Avatar className="w-48 h-48 text-5xl self-center">
                <AvatarImage
                  src={avatar_url || undefined}
                  alt={`${full_name}'s profile picture`}
                  className="object-cover"
                />

                <AvatarFallback>
                  <UserIcon width={64} height={64} />
                </AvatarFallback>
              </Avatar>
            </button>
            <Button
              className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              variant={"secondary"}
              size={"icon"}
            >
              <Pencil />
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Picture</DialogTitle>
            <DialogDescription>Change your profile picture</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} encType="multipart/form-data" method="POST">
            {/* <input type="file" name="avatar" /> */}
            <Avatar className="relative group w-full h-auto aspect-square">
              <AvatarImage
                className="object-cover opacity-100 group-hover:opacity-25 transition-opacity"
                src={
                  (acceptedFiles[0] && URL.createObjectURL(acceptedFiles[0])) ||
                  avatar_url ||
                  undefined
                }
                alt={"Uploaded image preview"}
              />
              <AvatarFallback
                delayMs={1000}
                className="opacity-100 group-hover:opacity-25 transition-opacity"
              >
                <UserIcon width={128} height={128} />
              </AvatarFallback>
              <div
                className="absolute cursor-pointer rounded-full inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                {...getRootProps()}
              >
                <input {...getInputProps({ name: "avatar", type: "file" })} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p className="max-w-xs text-center">
                    Drag and drop an image here, or click to select image
                  </p>
                )}
              </div>
            </Avatar>
            <DialogFooter>
              <Button disabled={isPending}>
                <Save /> Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditAvatar;
