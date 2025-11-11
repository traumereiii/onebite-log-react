import supabase from "@/lib/supabase.ts";
import type { AuthResponse } from "@supabase/auth-js/src/lib/types.ts";

export async function signUp({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
}
