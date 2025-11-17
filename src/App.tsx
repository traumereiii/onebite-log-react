import "./App.css";
import RootRoute from "@/RootRoute.tsx";
import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useIsSessionLoaded, useSetSession } from "@/store/session.ts";
import SessionProvider from "@/provider/SessionProvider.tsx";
import GlobalLoader from "@/components/GlobalLoader.tsx";

function App() {
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

  if (!isSessionLoaded) return <GlobalLoader />;

  return (
    <SessionProvider>
      <RootRoute />
    </SessionProvider>
  );
}

export default App;
