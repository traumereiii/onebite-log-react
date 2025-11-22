import { ReactNode } from "react";
import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/PostEditorModal.tsx";
import AlertModal from "@/components/modal/AlertModal.tsx";
import ProfileEditorModal from "@/components/modal/ProfileEditorModal.tsx";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
          <ProfileEditorModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
