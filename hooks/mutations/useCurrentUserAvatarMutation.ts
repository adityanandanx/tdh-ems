import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "../queries";
import { useSupabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function useCurrentUserAvatarMutation() {
  const { data: user } = useUserQuery();
  const supabase = useSupabase();
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (avatar: File) => {
      if (!user) {
        throw new Error("User not found.");
      }
      const { data, error } = await supabase.storage
        .from("avatar")
        .upload(`${user.id}/profile`, avatar, { upsert: true });
      if (error) throw error;
      return data.path;
    },
    onSuccess() {
      qc.invalidateQueries({ queryKey: ["user", "avatar"] });
    },
    onError(error) {
      console.error(error);
      toast({ title: "An Error Occurred.", description: error.message });
    },
  });
}
