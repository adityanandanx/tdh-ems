import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from "@/lib/supabase/client";
import { UsersRow } from "@/lib/supabase/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "../queries";

export default function useUserDataMutation() {
  const supabase = useSupabase();
  const { data: user } = useUserQuery();
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (newValues: Partial<UsersRow>) => {
      if (!user?.id) {
        toast({
          title: "You are not logged in.",
          description: "Login first to change data.",
        });
        return null;
      }
      const { data, error, count } = await supabase
        .from("users")
        .update(newValues)
        .eq("id", user.id);
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
