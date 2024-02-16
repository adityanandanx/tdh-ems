import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/lib/supabase/client";
import { UsersRow } from "@/lib/supabase/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { count } from "console";

export default function useUserDataMutation() {
  const supabase = useSupabase();
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (newValues: Partial<UsersRow> & { id: string }) => {
      const { data, error, count } = await supabase
        .from("users")
        .update(newValues)
        .eq("id", newValues.id);
      if (error) throw error;
      return count;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user", "data"] });
    },
    onError: (error) => {
      console.error(error);
      toast({ title: "An error occured", description: error.message });
    },
  });
}
