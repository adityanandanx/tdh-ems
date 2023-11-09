import { z } from "zod";

const dateSchema = z.coerce.string().optional().nullable();

const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.string(),
  desc: z.string(),
  venue: z.string().nullable(),
  registration_start: dateSchema,
  registration_end: dateSchema,
  event_start: dateSchema,
  event_end: dateSchema,
});

export { eventSchema };
