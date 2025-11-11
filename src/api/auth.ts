import supabase from "@/lib/supabase.ts";
import type { AuthResponse } from "@supabase/auth-js/src/lib/types.ts";
import { Provider } from "@supabase/supabase-js";

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

export async function sigInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithOAuth(provider: Provider) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
  });

  if (error) throw error;
  return data;
}
