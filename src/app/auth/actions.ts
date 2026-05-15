"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function logout() {
  if (hasSupabase) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
