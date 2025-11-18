import { usePostsData } from "@/hooks/queries/use-posts-data.ts";
import Fallback from "@/components/Fallback.tsx";
import Loader from "@/components/Loader.tsx";
import PostItem from "@/components/post/PostItem.tsx";

export default function PostFeed() {
  const { data, error, isPending } = usePostsData();

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div>
      {data.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
