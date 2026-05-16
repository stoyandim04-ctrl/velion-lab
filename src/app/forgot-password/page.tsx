"use client";

import { useState } from "react";
import { AuthShell, AuthInput } from "@/components/AuthShell";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = (form.get("email") as string).trim();

    if (!hasSupabase) {
      setTimeout(() => setSent(true), 400);
      return;
    }

    const supabase = createClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/account`,
    });

    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setSent(true);
  };

  return (
    <AuthShell
      title={sent ? "Изпратихме" : "Забравена парола"}
      subtitle={sent
        ? "Провери email-а си за линк за нова парола."
        : "Въведи email-а си и ще получиш инструкции."}
      footerText="Сети се за паролата?"
      footerLink={{ href: "/login", label: "Влез →" }}
    >
      {sent ? (
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <p className="text-gray-400 text-sm">
            Ако този email е регистриран, линк ще пристигне до минута.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <AuthInput label="Email" type="email" name="email" placeholder="ti@example.com" required />

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
            {loading ? "Изпращам..." : "Изпрати линк за нова парола"}
          </button>

          {!hasSupabase && (
            <p className="mt-5 text-center text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-600">
              Demo режим · Supabase не е свързан
            </p>
          )}
        </form>
      )}
    </AuthShell>
  );
}
