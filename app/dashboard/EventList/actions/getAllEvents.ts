import { getSupabase } from "@/lib/supabase";

const getAllEvents = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("events").select();
  if (error) throw new Error(error.message);
  return data;
};

export default getAllEvents;
