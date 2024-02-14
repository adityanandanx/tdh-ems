import { useSupabase } from "@/lib/supabase/client";
import { UsersRow } from "@/lib/supabase/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeRoleMutation = () => {
  const supabase = useSupabase();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: UsersRow["role"];
    }) => {
      return await supabase.from("users").update({ role }).eq("id", userId);
    },
    onSuccess: (_, { userId }) => {
      qc.invalidateQueries({ queryKey: ["users", userId] });
    },
  });
};
