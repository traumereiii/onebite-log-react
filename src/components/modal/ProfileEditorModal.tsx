import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { useSession } from "@/store/session.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import Fallback from "@/components/Fallback.tsx";
import Loader from "@/components/Loader.tsx";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useProfileEditorModal } from "@/store/profile-editor-modal.ts";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useUpdateProfile } from "@/hooks/mutations/profile/use-update-profile.ts";
import { toast } from "sonner";

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;
  type Image = { file: File; previewUrl: string };
  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateProfile, isPending: isUpdateProfilePending } =
    useUpdateProfile({
      onSuccess: () => {
        close();
      },
      onError: (error) => {
        toast.error("프로필 수정에 실패했습니다.", { position: "top-center" });
      },
    });
  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) {
        URL.revokeObjectURL(avatarImage.previewUrl);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null);
    }
  }, [profile, isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };
  const handleUpdateClick = () => {
    if (nickname.trim() === "") return;
    updateProfile({
      userId: session!.user.id,
      nickname: nickname,
      bio: bio,
      avatarImageFile: avatarImage?.file,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        {fetchProfileError && <Fallback />}
        {isFetchProfilePending && <Loader />}
        {!fetchProfileError && !isFetchProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <Input
                disabled={isUpdateProfilePending}
                ref={fileInputRef}
                onChange={handleSelectImage}
                type="file"
                accept="images/*"
                className="hidden"
              />
              <img
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                src={
                  avatarImage?.previewUrl || profile.avatar_url || defaultAvatar
                }
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              />
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground">닉네임</div>
          <Input
            disabled={isUpdateProfilePending}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-muted-foreground">소개</div>
          <Input
            disabled={isUpdateProfilePending}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <Button
          disabled={isUpdateProfilePending}
          onClick={handleUpdateClick}
          className="cursor-pointer"
        >
          수정하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}
