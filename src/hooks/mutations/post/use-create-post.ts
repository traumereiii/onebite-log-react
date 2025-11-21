import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostWithImages } from "@/api/post.ts";
import { UseMutationCallback } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useCreatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
      // 1. 캐시 아예 초기화 O
      // 2. 캐시 데이터에 완성된 포스트만 추가 X
      // 3. 낙관적 업데이트 방식 X

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
