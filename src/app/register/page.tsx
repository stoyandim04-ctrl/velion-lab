"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthShell, AuthInput } from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const passwordConfirm = form.get("passwordConfirm") as string;
    const name = form.get("name") as string;

    if (password !== passwordConfirm) {
      setError("Паролите не съвпадат.");
      return;
    }
    if (password.length < 8) {
      setError("Паролата трябва да е минимум 8 символа.");
      return;
    }

    setLoading(true);

    if (!hasSupabase) {
      setTimeout(() => router.push("/dashboard"), 400);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <AuthShell
      title="Заяви достъп"
      subtitle="Стани един от мъжете, които владеят момента."
      footerText="Вече имаш профил?"
      footerLink={{ href: "/login", label: "Влез →" }}
    >
      <form onSubmit={handleSubmit}>
        <AuthInput label="Име" type="text" name="name" placeholder="Иван" required />
        <AuthInput label="Email" type="email" name="email" placeholder="ti@example.com" required />
        <AuthInput label="Парола" type="password" name="password" placeholder="Минимум 8 символа" required />
        <AuthInput label="Повтори паролата" type="password" name="passwordConfirm" placeholder="••••••••" required />

        <label className="flex items-start gap-3 mb-6 text-sm text-gray-300 leading-relaxed cursor-pointer select-none p-3 rounded-xl border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition">
          <input
            type="checkbox"
            required
            className="mt-1 w-5 h-5 accent-blue-500 cursor-pointer shrink-0"
          />
          <span>
            Приемам, че съдържанието е образователно и не замества медицинска консултация.
          </span>
        </label>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={buttonVariants({
            variant: "default",
            className:
              "btn-primary w-full px-6 py-3.5 rounded-xl font-semibold text-white text-base h-auto bg-transparent disabled:opacity-60 disabled:cursor-not-allowed",
          })}
        >
          {loading ? "Създавам..." : "Заяви достъп"}
        </button>

        {!hasSupabase && (
          <p className="mt-5 text-center text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-600">
            Demo режим · Supabase не е свързан
          </p>
        )}
      </form>
    </AuthShell>
  );
}
