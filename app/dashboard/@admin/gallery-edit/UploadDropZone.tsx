"use client";
import { uploadImageToGallery } from "@/app/dashboard/@admin/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon, Trash2Icon } from "lucide-react";
import React, { FormEvent, useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  eventId: string;
};

const UploadDropZone = ({ eventId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop(acceptedFiles) {
        setFiles((prev) => [...prev, ...acceptedFiles]);
      },
      accept: {
        "image/*": [],
      },
    });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    files.forEach((file) => {
      const fdata = new FormData();
      fdata.append("image", file);
      console.log(fdata.get("image"));
      startTransition(async () => {
        const { error } = await uploadImageToGallery(eventId, fdata);

        setFiles((f) => f.filter((p) => p !== file));
      });
    });
  };

  return (
    <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
      <>
        <h1 className="mt-5 text-lg">Select Images</h1>
        <div className="flex flex-wrap gap-2 p-2">
          {files.map((file) => (
            <div key={file.name} className="relative group h-32">
              <img
                onClick={() => setFiles((f) => f.filter((p) => p !== file))}
                className="h-full w-auto rounded cursor-pointer group-hover:opacity-50 transition-opacity"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Trash2Icon className="absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
          <div
            className="cursor-pointer rounded-xl items-center justify-center p-10 border border-dashed"
            {...getRootProps()}
          >
            <input {...getInputProps({ name: "image", type: "file" })} />
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <span className="flex gap-2">
                Select More <PlusIcon />
              </span>
            )}
          </div>
        </div>
        <Button disabled={isPending} type="submit">
          Upload All Selected
        </Button>
      </>
    </form>
  );
};

export default UploadDropZone;
