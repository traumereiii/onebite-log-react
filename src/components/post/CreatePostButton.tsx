import { PlusCircle } from "lucide-react";
import { useOpenCreatePostEditorModal } from "@/store/post-editor-modal.ts";

export default function CreatePostButton() {
  const openPostEditorModal = useOpenCreatePostEditorModal();

  return (
    <div
      onClick={openPostEditorModal}
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircle className="h-5 w-5" />
      </div>
    </div>
  );
}
