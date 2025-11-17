import { type ReactNode, useEffect } from "react";
import {
  useIsSessionLoaded,
  useSession,
  useSetSession,
} from "@/store/session.ts";
import supabase from "@/lib/supabase.ts";
import RootRoute from "@/RootRoute.tsx";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";
import GlobalLoader from "@/components/GlobalLoader.tsx";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();

  /**
   * isPending: data가 없으면 무조건 true
   * isLoading: quernFn이 실행중일 때 true, 종료 시 false
   */
  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    return () => {
      // onUnmount cleanup if needed
    };
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;
  if (isProfileLoading) return <GlobalLoader />;
  return children;
}
