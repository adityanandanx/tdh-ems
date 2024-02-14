import { useSupabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useRegisteredUsersQuery = (eventId: string) => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ["registrations", eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select(
          `
        *,
        users (
          *
        )
        `
        )
        .eq("event_id", eventId);
      if (error) throw error;
      return data;
    },
  });
};
