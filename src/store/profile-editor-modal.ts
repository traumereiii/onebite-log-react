import {
  combine,
  subscribeWithSelector,
  persist,
  createJSONStorage,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

const initialState = {
  isOpen: false,
};

export const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })), // end of combine
    { name: "ProfileEditorModalStore" }, // options of devtools
  ), // end of devtools
);

export const useOpenProfileEditorModal = () =>
  useProfileEditorModalStore((store) => store.actions.open);

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
