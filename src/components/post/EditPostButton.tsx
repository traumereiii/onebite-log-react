import { Button } from "@/components/ui/button.tsx";
import { useOpenEditPostEditorModal } from "@/store/post-editor-modal.ts";
import { PostEntity } from "@/types.ts";

export default function EditPostButton(props: PostEntity) {
  const openEditPostEditorModal = useOpenEditPostEditorModal();

  const handleButtonClick = () => {
    openEditPostEditorModal({
      postId: props.id,
      content: props.content,
      imageUrls: props.image_urls,
    });
  };

  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      수정
    </Button>
  );
}
