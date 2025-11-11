import { useMutation } from "@tanstack/react-query";
import { sigInWithPassword } from "@/api/auth.ts";

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: sigInWithPassword,
  });
}
