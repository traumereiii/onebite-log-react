import { useMutation } from "@tanstack/react-query";
import { sigInWithPassword } from "@/api/auth.ts";
import { UseMutationCallback } from "@/types.ts";

export function useSignInWithPassword(callbacks: UseMutationCallback) {
  return useMutation({
    mutationFn: sigInWithPassword,
    onError: (error) => {
      if (callbacks.onError) {
        callbacks.onError(error);
      }
    },
  });
}
