import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";
import { Session } from "@supabase/supabase-js";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialSessionState = {
  isLoaded: false,
  session: null,
} as State;

export const useSessionStore = create(
  devtools(
    combine(initialSessionState, (set, get) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })), // end of combine
    {
      name: "SessionStore",
    },
  ), // end of devtools
);

export const useSession = () => {
  const session = useSessionStore((store) => store.session);
  return session;
};
export const useIsSessionLoaded = () => {
  const isLoaded = useSessionStore((store) => store.isLoaded);
  return isLoaded;
};
export const useSetSession = () => {
  const setSession = useSessionStore((store) => store.actions.setSession);
  return setSession;
};
