// Middleware helper — обновява сесия cookie на всяка заявка
// и защитава вътрешните routes (dashboard, modules, lessons и т.н.)

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Routes, до които може само логнат потребител
const PROTECTED = ["/dashboard", "/modules", "/lessons", "/exercises", "/progress", "/account", "/admin"];

// Routes, до които НЕ трябва да достигне логнат потребител (login страници)
const AUTH_ONLY = ["/login", "/register", "/forgot-password"];

// Routes, до които може само admin (по email)
const ADMIN_ONLY = ["/admin"];
const ADMIN_EMAIL = "stoyan.dim04@gmail.com";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Опит за вземане на потребителя — обновява cookie ако трябва
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED.some((p) => path.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => path.startsWith(p));
  const isAdminOnly = ADMIN_ONLY.some((p) => path.startsWith(p));

  // Без логин — пращаме към /login
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }

  // Admin route — само за стопанина
  if (isAdminOnly && user?.email !== ADMIN_EMAIL) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Логнат, но влиза в /login — пращаме към dashboard
  if (user && isAuthOnly) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}
