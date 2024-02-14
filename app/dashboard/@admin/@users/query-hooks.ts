import { useSupabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useAllUsersQuery = () => {
  const supabase = useSupabase();
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .order("email");
      if (error) throw error;
      return data;
    },
  });
  return usersQuery;
};

export const useUserAvatarQuery = (userId: string) => {
  const supabase = useSupabase();
  return useQuery({
    queryKey: ["users", userId, "avatar"],
    queryFn: () => {
      const { data } = supabase.storage
        .from("avatar")
        .getPublicUrl(userId + "/profile?time=" + new Date().getMilliseconds());
      return data.publicUrl;
    },
  });
};
