"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useTransition } from "react";
import { ControllerRenderProps, Field, useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import { eventSchema } from "./schema";
import { EventsRow } from "@/lib/supabase/types";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

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
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { createEvent, updateEvent } from "../actions";

type Props = {
  defaultValues?: EventsRow;
  action?: "update" | "create";
};

const EditEventForm = ({ defaultValues, action = "update" }: Props) => {
  const updateEventMutation = useMutation({
    mutationKey: ["event", defaultValues?.id],
    mutationFn: updateEvent,
  });
  const createEventMutation = useMutation({
    mutationKey: ["event"],
    mutationFn: createEvent,
  });
  const router = useRouter();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

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
      tags: [],
      ...defaultValues,
    },
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    
    switch (action) {
      case "update":
        if (!defaultValues?.id) throw new Error("No ID for event update");
        updateEventMutation.mutate({ id: defaultValues.id, ...values });
        break;
      case "create":
        createEventMutation.mutate({ ...values });
        const id = createEventMutation.data?.data;
        router.push(`event/${id}`);
        break;
    }
  }

  function isString(value: any): value is string {
    if (typeof value === "string") return true;
    return false;
  }

  function handleTimeChange<T extends keyof z.infer<typeof eventSchema>>(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof eventSchema>, T>
  ) {
    const time = e.target.value;
    if (!isString(field.value)) return;
    if (!field.value) {
      field.onChange(time);
      return;
    }
    const olddate = new Date(field.value);
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newdate = new Date(
      olddate.getFullYear(),
      olddate.getMonth(),
      olddate.getDate(),
      hours,
      minutes
    );
    field.onChange(newdate.toISOString());
  }

  function handleDateChange<T extends keyof z.infer<typeof eventSchema>>(
    d: Date | undefined,
    field: ControllerRenderProps<z.infer<typeof eventSchema>, T>
  ) {
    if (!d || !isString(field.value)) return;
    const olddate = new Date(field.value);
    const newdate = new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      olddate.getHours(),
      olddate.getMinutes()
    );
    field.onChange(newdate.toISOString());
  }

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
                  <SimpleMDE placeholder="Describe the event" {...field} />
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
                    <PopoverContent className="w-auto p-0 flex" align="start">
                      <Calendar
                        mode="single"
                        footer={
                          <>
                            <p>
                              Pick a time:{" "}
                              <Input
                                type="time"
                                defaultValue={
                                  field.value
                                    ? format(new Date(field.value), "hh:mm")
                                    : undefined
                                }
                                onChange={(e) => handleTimeChange(e, field)}
                              />
                            </p>
                          </>
                        }
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => handleDateChange(d, field)}
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
                        footer={
                          <>
                            <p>
                              Pick a time:{" "}
                              <Input
                                type="time"
                                defaultValue={
                                  field.value
                                    ? format(new Date(field.value), "hh:mm")
                                    : undefined
                                }
                                onChange={(e) => handleTimeChange(e, field)}
                              />
                            </p>
                          </>
                        }
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => handleDateChange(d, field)}
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
                        footer={
                          <>
                            <p>
                              Pick a time:{" "}
                              <Input
                                type="time"
                                defaultValue={
                                  field.value
                                    ? format(new Date(field.value), "hh:mm")
                                    : undefined
                                }
                                onChange={(e) => handleTimeChange(e, field)}
                              />
                            </p>
                          </>
                        }
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => handleDateChange(d, field)}
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
                        footer={
                          <>
                            <p>
                              Pick a time:{" "}
                              <Input
                                type="time"
                                defaultValue={
                                  field.value
                                    ? format(new Date(field.value), "hh:mm")
                                    : undefined
                                }
                                onChange={(e) => handleTimeChange(e, field)}
                              />
                            </p>
                          </>
                        }
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(d) => handleDateChange(d, field)}
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
              <FormItem className="flex flex-1 gap-5 items-center border p-5 rounded-lg">
                {field.value ? <EyeIcon /> : <EyeOffIcon />}
                <div className="flex-1 flex flex-col pb-2">
                  <FormLabel className="text-base m-0">Published</FormLabel>
                  <FormDescription className="m-0">
                    Make event publically available and allow registrations
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    className=""
                    checked={field.value || undefined}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormDescription>An event can have upto 7 tags</FormDescription>
                <FormControl>
                  <TagInput
                    textCase={"lowercase"}
                    variant={"default"}
                    maxTags={7}
                    delimiterList={[",", "Enter", "Tab"]}
                    tags={field.value.map((f) => ({
                      id: f,
                      text: f,
                    }))}
                    placeholder="Enter comma separated values"
                    setTags={(tags) => {
                      form.setValue(
                        "tags",
                        // @ts-ignore IDK why is this giving error :P
                        tags.map((t) => t.text.replaceAll(" ", "-"))
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={
              updateEventMutation.isPending || createEventMutation.isPending
            }
            type="submit"
          >
            {action === "update" ? "Save Changes" : "Create Event"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default EditEventForm;
