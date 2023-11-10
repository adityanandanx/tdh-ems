"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "./schema";
import { EventsRow } from "@/lib/dbTypes";
import { createEvent, updateEvent } from "@/app/dashboard/@admin/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatTimeStamp } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { redirect } from "next/navigation";
import { Switch } from "@/components/ui/switch";

type Props = {
  defaultValues?: EventsRow;
  action?: "update" | "create";
};

const EditEventForm = ({ defaultValues, action = "update" }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      created_at: undefined,
      cover_image_url: null,
      event_end: null,
      event_start: null,
      registration_end: null,
      registration_start: null,
      published: undefined,
      ...defaultValues,
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log(values);
    switch (action) {
      case "update":
        if (!defaultValues?.id) throw new Error("No ID for event update");
        startTransition(() => updateEvent({ id: defaultValues.id, ...values }));
        break;
      case "create":
        startTransition(async () => {
          const id = await createEvent({ ...values, published: false });
          redirect(`/dashboard/e/event/${id}`);
        });
        break;
    }
  }

  const onChangeDateToString = (
    date: Date | undefined,
    onChange: (s: string) => void
  ) => {
    if (!date) return;
    onChange(date.toISOString());
  };

  return (
    <Form {...form}>
      <div className="flex-1">
        {/* <Button onClick={() => console.log(form.getValues())}>LOG</Button> */}
        <h1 className="text-2xl font-medium">Event Details</h1>
        <p className="text-sm mb-4">All the details regarding the event</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Venue</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Venue"
                    {...field}
                    value={field.value || undefined}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="registration_start"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Registrations Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {formatTimeStamp(field.value, "Pick a date")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) =>
                          onChangeDateToString(d, field.onChange)
                        }
                        // disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registration_end"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Registrations End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {formatTimeStamp(field.value, "Pick a Date")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) =>
                          onChangeDateToString(d, field.onChange)
                        }
                        // disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="flex gap-5 w-full">
            <FormField
              control={form.control}
              name="event_start"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Event Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {formatTimeStamp(field.value, "Pick a date")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) =>
                          onChangeDateToString(d, field.onChange)
                        }
                        // disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_end"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel>Event End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {formatTimeStamp(field.value, "Pick a Date")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) =>
                          onChangeDateToString(d, field.onChange)
                        }
                        // disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-1 justify-between items-center border rounded-lg p-5">
                <div className="">
                  <FormLabel className="text-base">Published</FormLabel>
                  <FormDescription>
                    Make event publically available and allow registrations
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit">
            Save
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default EditEventForm;
