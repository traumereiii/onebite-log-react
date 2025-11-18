import { ReactNode } from "react";
import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/PostEditorModal.tsx";
import AlertModal from "@/components/modal/AlertModal.tsx";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <>
          <PostEditorModal />
          <AlertModal />
        </>,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
