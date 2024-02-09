"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { eventSchema } from "./schema";
import { EventsRow } from "@/lib/supabase/types";
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
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { useToast } from "@/components/ui/use-toast";
import useActionTransition from "@/hooks/useActionTransition";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/lib/supabase/client";

type Props = {
  defaultValues?: EventsRow;
  action?: "update" | "create";
};

const EditEventForm = ({ defaultValues, action = "update" }: Props) => {
  // const [isPending, startTransition] = useTransition();
  const updateEventAction = useActionTransition(updateEvent);
  const createEventAction = useActionTransition(createEvent);
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
    console.log(values);
    switch (action) {
      case "update":
        if (!defaultValues?.id) throw new Error("No ID for event update");
        updateEventAction.runAction(supabase, {
          id: defaultValues.id,
          ...values,
        });
        break;
      case "create":
        const id = await createEventAction.runAction(supabase, { ...values });
        console.log(id);
        router.push(`event/${id}`);

        // redirect(`/dashboard/e/${id}`);
        break;
    }
    queryClient.invalidateQueries({ queryKey: ["events"] });
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
              updateEventAction.isPending || createEventAction.isPending
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
