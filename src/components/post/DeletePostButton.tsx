import { Button } from "@/components/ui/button.tsx";
import { useAlertModal, useOpenAlertModal } from "@/store/alert-modal.ts";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post.ts";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("포스트 삭제에 실패했습니다.", { position: "top-center" });
    },
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "포스트 삭제",
      description: "삭제한 포스트는 되돌릴 수 없습니다. 정말 삭제하시겠습니까?",
      onPositive: () => {
        deletePost(id);
      },

      onNegative: () => {},
    });
  };

  return (
    <Button onClick={handleDeleteClick} className="cursor-pointer" variant={"ghost"}>
      삭제
    </Button>
  );
}
