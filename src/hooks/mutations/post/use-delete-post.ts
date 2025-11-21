import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/api/post.ts";
import { UseMutationCallback } from "@/types.ts";
import { deleteImagesInPath } from "@/api/image.ts";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
      if (deletePost.image_urls && deletePost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletePost.author_id}/${deletePost.id}`);
      }
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
