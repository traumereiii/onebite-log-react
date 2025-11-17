import CreatePostButton from "@/components/post/CreatePostButton.tsx";
import PostEditorModal from "@/components/modal/PostEditorModal.tsx";
import { useState } from "react";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostEditorModal />
    </div>
  );
}
