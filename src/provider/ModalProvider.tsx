import { ReactNode } from "react";
import { createPortal } from "react-dom";
import PostEditorModal from "@/components/modal/PostEditorModal.tsx";

export default function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
}
