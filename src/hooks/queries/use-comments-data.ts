import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants.ts";
import { fetchComments } from "@/api/comment.ts";

export function useCommentsData(postId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.comment.post(postId),
    queryFn: () => fetchComments(postId),
  });
}
