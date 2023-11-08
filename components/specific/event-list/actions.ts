"use server";
import { getSupabase } from "@/lib/supabase";

const getAllEvents = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("events").select();
  if (error) throw new Error(error.message);
  return data;
};

const getEvents = async (page: number, limit = 10) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("events")
    .select()
    .range(page * limit, page * limit + limit - 1);
  if (error) throw new Error(error.message);
  console.log(page);

  return data;
};

export { getEvents, getAllEvents };
