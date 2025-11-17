import { useQuery } from "@tanstack/react-query";
import { createProfile, fetchProfile } from "@/api/profile.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { PostgrestError } from "@supabase/supabase-js";
import { useSession } from "@/store/session.ts";

export function useProfileData(userId?: string) {
  const session = useSession();
  const isMine = userId === session?.user.id;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          return await createProfile(userId!);
        }
        throw error;
      }
    },
    enabled: !!userId,
  });
}
