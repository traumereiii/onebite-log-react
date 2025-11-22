import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProfileEntity, UseMutationCallback } from "@/types.ts";
import { updateProfile } from "@/api/profile.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useUpdateProfile(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedProfile) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      // 캐시 업데이트
      queryClient.setQueryData<ProfileEntity>(
        QUERY_KEYS.profile.byId(updatedProfile.id),
        updatedProfile,
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
