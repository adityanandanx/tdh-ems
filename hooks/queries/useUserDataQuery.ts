import { useQuery } from "@tanstack/react-query";
import useUserQuery from "./useUserQuery";
import { useSupabase } from "@/lib/supabase/client";

export default function useUserDataQuery() {
  const { data: user } = useUserQuery();
  const supabase = useSupabase();
  return useQuery({
    enabled: !!user,
    queryKey: ["user", "data"],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", user.id)
        .limit(1)
        .single();
      if (error) throw error;
      return data;
    },
  });
}
