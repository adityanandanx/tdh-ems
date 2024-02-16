import { useQuery } from "@tanstack/react-query";
import { useUserQuery } from ".";
import { useSupabase } from "@/lib/supabase/client";

export default function useCurrentUserAvatarQuery() {
  const { data: user } = useUserQuery();
  const supabase = useSupabase();
  return useQuery({
    enabled: !!user,
    queryKey: ["user", "avatar"],
    queryFn: async () => {
      if (!user) throw new Error("User not logged in.");
      const { data } = supabase.storage
        .from("avatar")
        .getPublicUrl(
          user.id + "/profile?time=" + new Date().getMilliseconds()
        );
      return data.publicUrl;
    },
  });
}
