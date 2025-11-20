import { useMutation } from "@tanstack/react-query";
import { deletePost, updatePost } from "@/api/post.ts";
import { UseMutationCallback } from "@/types.ts";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
