import { type ReactNode, useEffect } from "react";
import { useIsSessionLoaded, useSetSession } from "@/store/session.ts";
import supabase from "@/lib/supabase.ts";
import RootRoute from "@/RootRoute.tsx";

export default function SessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      // onUnmount cleanup if needed
    };
  }, []);

  if (!isSessionLoaded) return <div>로딩 중...</div>;

  return children
}
