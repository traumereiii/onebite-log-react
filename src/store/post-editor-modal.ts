import { combine, devtools } from "zustand/middleware";
import { create } from "zustand";

type CreateMode = {
  isOpen: true;
  type: "CREATE";
};

type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;

type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;

const initialState = {
  isOpen: false,
} as State;

export const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "EDIT", ...param });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })), // end of combine
    { name: "postEditorModalStore" }, // options of devtools
  ), // end of devtools
);

export const useOpenCreatePostEditorModal = () =>
  usePostEditorModalStore((state) => state.actions.openCreate);

export const useOpenEditPostEditorModal = () =>
  usePostEditorModalStore((state) => state.actions.openEdit);

export const useClosePostEditorModal = () =>
  usePostEditorModalStore((state) => state.actions.close);

export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();
  return store as typeof store & State;
};
