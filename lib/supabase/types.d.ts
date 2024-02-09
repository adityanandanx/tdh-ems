import { Database } from "@/schema.gen";
import { SupabaseClient } from "@supabase/supabase-js";

export type UsersRow = Database["public"]["Tables"]["users"]["Row"];
export type EventsRow = Database["public"]["Tables"]["events"]["Row"];

export type EventsColumn = keyof EventsRow;

export type TypedSupabaseClient = SupabaseClient<Database>;
