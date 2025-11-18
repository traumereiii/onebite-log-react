import CreatePostButton from "@/components/post/CreatePostButton.tsx";
import PostEditorModal from "@/components/modal/PostEditorModal.tsx";
import { useState } from "react";
import PostFeed from "@/components/post/PostFeed.tsx";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
