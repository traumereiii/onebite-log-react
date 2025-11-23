import { useMutation } from "@tanstack/react-query";
import type { UseMutationCallback } from "@/types.ts";
import { updateComment } from "@/api/comment.ts";

export function useUpdateComment(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
