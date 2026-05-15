// Next.js middleware — изпълнява се на всяка заявка
// и защитава вътрешните страници със Supabase

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Само ако имаме истински Supabase ключове, иначе пропускаме (mock режим)
const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function middleware(request: NextRequest) {
  if (!hasSupabase) {
    // Mock режим — пропускаме всичко (login/register просто симулират)
    return;
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Прихваща всичко освен:
     * - _next/static (статични файлове)
     * - _next/image (оптимизирани изображения)
     * - favicon, public assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
