import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post, UseMutationCallback } from "@/types.ts";
import { togglePostLike } from "@/api/post.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      console.log("useTogglePostLike onMutate", postId);
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId),
      );
      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw Error("포스트가 존재하지 않습니다.");
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });
      console.log("useTogglePostLike onMutate 2");
      return {
        prevPost,
      };
    },
    onSuccess: async (deletePost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context && context.prevPost) {
        queryClient.setQueryData<Post>(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
