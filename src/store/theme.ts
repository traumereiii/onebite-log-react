import { create } from "zustand";
import { combine, devtools, persist } from "zustand/middleware";
import { Theme } from "@/types.ts";

type State = {
  theme: Theme;
};

const initialState: State = {
  theme: "light",
};

export const useThemeStore = create(
  devtools(
    persist(
      combine(initialState, (set, get) => ({
        actions: {
          setTheme: (theme: Theme) => {
            const htmlTag = document.documentElement;
            htmlTag.classList.remove("dark", "light");
            if (theme === "system") {
              const isDarkTheme = window.matchMedia(
                "(prefers-color-scheme: dark)",
              ).matches;

              htmlTag.classList.add(isDarkTheme ? "dark" : "light");
            } else {
              htmlTag.classList.add(theme);
            }

            set({ theme });
          },
        },
      })), // end of combine
      { name: "ThemeStore", partialize: (store) => ({ theme: store.theme }) },
    ),
    { name: "ThemeStore" },
  ), // end of devtools
);

export const useTheme = () => useThemeStore((store) => store.theme);
export const useSetTheme = () =>
  useThemeStore((store) => store.actions.setTheme);
