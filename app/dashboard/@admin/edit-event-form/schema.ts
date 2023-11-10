import { z } from "zod";

const dateSchema = z.coerce.string().nullable();

const eventSchema = z.object({
  title: z.string(),
  created_at: z.string().optional(),
  desc: z.string(),
  venue: z.string().nullable(),
  registration_start: dateSchema,
  registration_end: dateSchema,
  event_start: dateSchema,
  event_end: dateSchema,
  cover_image_url: z.string().nullable(),
  published: z.boolean().optional(),
  tags: z.array(z.string()).max(7, "You can only select upto 10 tags"),
});

export { eventSchema };
