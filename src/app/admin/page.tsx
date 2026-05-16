// Admin страница — само за собственика на проекта.
// Middleware вече блокира достъпа, но повтаряме проверката тук за защита в дълбочина.

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { brand, modules, exercises } from "@/lib/content";
import { AdminForm } from "./AdminForm";

const ADMIN_EMAIL = "stoyan.dim04@gmail.com";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default async function AdminPage() {
  if (!hasSupabase) {
    redirect("/");
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user || data.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <main className="relative min-h-screen px-6 py-16">
      <div className="spotlight" style={{ width: "600px", height: "600px", background: "rgba(30, 58, 138, 0.25)", top: "-200px", left: "50%", transform: "translateX(-50%)" }} />

      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="eyebrow mb-5">Admin · {data.user.email}</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
            <span className="silver-text">Редактор на</span>{" "}
            <span className="blue-text">съдържание.</span>
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Промениш ли тук — сайтът се обновява автоматично. Файлът{" "}
            <code className="text-blue-300 font-mono text-sm">src/lib/content.ts</code> се пренаписва при всяко запазване.
          </p>
        </div>

        <AdminForm
          initialBrand={brand}
          initialModules={modules}
          initialExercises={exercises}
        />
      </div>
    </main>
  );
}
