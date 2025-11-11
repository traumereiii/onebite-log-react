import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth.ts";
import { UseMutationCallback } from "@/types.ts";

export function useSignInWithOauth(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
