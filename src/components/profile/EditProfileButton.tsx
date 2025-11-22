import { Button } from "@/components/ui/button.tsx";
import { useOpenProfileEditorModal } from "@/store/profile-editor-modal.ts";

export default function EditProfileButton() {
  const openProfileEditModal = useOpenProfileEditorModal();
  return (
    <Button
      onClick={openProfileEditModal}
      variant={"secondary"}
      className="cursor-pointer"
    >
      프로필 수정
    </Button>
  );
}
