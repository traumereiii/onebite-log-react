import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";
import { createComment } from "@/api/comment.ts";

export function useCreateComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
