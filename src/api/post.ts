import supabase from "@/lib/supabase.ts";
import { uploadImage } from "@/api/image.ts";
import { PostEntity } from "@/types.ts";

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
