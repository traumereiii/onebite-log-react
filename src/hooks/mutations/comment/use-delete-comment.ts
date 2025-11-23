import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";
import { deleteComment } from "@/api/comment.ts";

export function useDeleteComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
