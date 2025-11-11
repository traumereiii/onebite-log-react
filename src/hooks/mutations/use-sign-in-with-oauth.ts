import { useMutation } from "@tanstack/react-query";
import { signInWithOAuth } from "@/api/auth.ts";

export function useSignInWithOauth() {
  return useMutation({
    mutationFn: signInWithOAuth,
  });
}
