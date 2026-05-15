// Supabase клиент за БРАУЗЪР (client components)
// Използва се в "use client" страници — login, register, dashboard interactivity

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
