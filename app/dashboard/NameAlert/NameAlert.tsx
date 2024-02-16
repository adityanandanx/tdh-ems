"use client";
import { useUserDataQuery } from "@/hooks/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import { useUserDataMutation } from "@/hooks/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ActivityIcon, ActivitySquare, Loader2 } from "lucide-react";
import Loading from "@/components/ui/loading";

type Props = {};

const NameAlert = (props: Props) => {
  const {
    data: userData,
    isPending: queryPending,
    isError,
    error,
  } = useUserDataQuery();
  const { mutate, isPending: mutationPending } = useUserDataMutation();
  const nameRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  if (isError) {
    toast({ title: "An Error Occurred", description: error.message });
    return null;
  }

  return (
    <>
      <Loading open={queryPending} />
      {!queryPending && userData && (
        <AlertDialog open={!!!userData.full_name}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Set your full name to continue
              </AlertDialogTitle>
              <AlertDialogDescription>
                You can always change this later.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate({ id: userData.id, full_name: nameRef.current?.value });
              }}
            >
              <Input className="mb-2" placeholder="Full Name" ref={nameRef} />
              <AlertDialogFooter>
                <AlertDialogAction asChild>
                  <Button type="submit" disabled={mutationPending}>
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default NameAlert;
