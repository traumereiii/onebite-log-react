import CommentItem from "@/components/comment/CommentItem";
import { useCommentsData } from "@/hooks/queries/use-comments-data.ts";
import Fallback from "@/components/Fallback.tsx";
import Loader from "@/components/Loader.tsx";

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  return (
    <div className="flex flex-col gap-5">
      0
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
