import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment, UseMutationCallback } from "@/types.ts";
import { deleteComment } from "@/api/comment.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useDeleteComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deleteComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(deleteComment.post_id),
        (comments) => {
          if (!comments)
            throw new Error("댓글이 캐시 데이터에 보관 되어 있지 않습니다.");

          return comments.filter((comment) => comment.id !== deleteComment.id);
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
