import { combine, devtools } from "zustand/middleware";
import { create } from "zustand";

const initialState = {
  isOpen: false,
};

export const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })), // end of combine
    { name: "post-editor-modalStore" }, // options of devtools
  ), // end of devtools
);

export const useOpenPostEditorModal = () =>
  usePostEditorModalStore((state) => state.actions.open);

export const useClosePostEditorModal = () =>
  usePostEditorModalStore((state) => state.actions.close);

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();
  return { isOpen, open, close };
};
