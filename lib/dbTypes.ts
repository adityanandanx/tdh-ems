import { Database } from "@/schema.gen";

export type UsersRow = Database["public"]["Tables"]["users"]["Row"];
export type EventsRow = Database["public"]["Tables"]["events"]["Row"];

export type EventsColumn = keyof EventsRow;
