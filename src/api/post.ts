import supabase from "@/lib/supabase.ts";
import { uploadImage } from "@/api/image.ts";
import { Post, PostEntity } from "@/types.ts";
import { use } from "react";

export async function fetchPosts({
  from,
  to,
  userId,
}: {
  from: number;
  to: number;
  userId: string;
}): Promise<Post[]> {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked: like!post_id (*)")
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);
  if (error) throw error;
  return data.map((post) => ({
    ...post,
    isLiked: post.myLiked && post.myLiked.length > 0,
  }));
}

export async function fetchPostById({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}): Promise<Post> {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked: like!post_id (*)")
    .eq("id", postId)
    .eq("like.user_id", userId)
    .single();
  if (error) throw error;
  return {
    ...data,
    isLiked: data.myLiked && data.myLiked.length > 0,
  };
}

export async function createPost(content: string): Promise<PostEntity> {
  const { data, error } = await supabase
    .from("post")
    .insert({ content })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}): Promise<PostEntity> {
  // 1. 새로운 포스트 생성
  const post: PostEntity = await createPost(content);
  if (images.length === 0) return post;

  // 2.이미지 업로드
  try {
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${crypto.randomUUID()}.${fileExtension}`;
        return uploadImage({
          file: image,
          filePath: `${userId}/${post.id}/${fileName}`,
        });
      }),
    );
    // 3. 포스트 테이블 업데이트
    return await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });
  } catch (error) {
    await deletePost(post.id);
    throw error;
  }
}

export async function updatePost(
  post: Partial<PostEntity> & { id: number },
): Promise<PostEntity> {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePost(postId: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", postId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  console.log("togglePostLike api", postId, userId);
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });

  if (error) throw error;
  return data;
}
