"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthShell, AuthInput } from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/client";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    // Без Supabase keys — mock режим
    if (!hasSupabase) {
      setTimeout(() => router.push(params.get("next") || "/dashboard"), 400);
      return;
    }

    // Истински Supabase login
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push(params.get("next") || "/dashboard");
    router.refresh();
  };

  return (
    <AuthShell
      title="Влез в Лабораторията"
      subtitle="Само за регистрирани мъже."
      footerText="Все още нямаш достъп?"
      footerLink={{ href: "/register", label: "Заяви тук →" }}
    >
      <form onSubmit={handleSubmit}>
        <AuthInput label="Email" type="email" name="email" placeholder="ti@example.com" required />
        <AuthInput label="Парола" type="password" name="password" placeholder="••••••••" required />

        <div className="text-right mb-6 -mt-2">
          <Link
            href="/forgot-password"
            className="text-xs text-gray-400 hover:text-blue-300 font-mono uppercase tracking-[0.15em]"
          >
            Забравена парола?
          </Link>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full px-6 py-3.5 rounded-xl font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Влизам..." : "Влез"}
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
