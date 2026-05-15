"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { plans, type Plan } from "@/lib/plans";

export default function CheckoutPage() {
  const initial = plans.find((p) => p.highlight)?.id ?? plans[0].id;
  const [selected, setSelected] = useState<Plan["id"]>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedPlan = plans.find((p) => p.id === selected)!;

  const handleCheckout = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selected }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Нещо се обърка. Опитай пак.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Връзката към платежната система не е активна.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative">
      <div
        className="spotlight"
        style={{
          width: "700px",
          height: "700px",
          background: "rgba(30, 58, 138, 0.3)",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* === Header === */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center hover:opacity-80 transition">
            <Logo />
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-blue-300 transition font-mono uppercase tracking-[0.2em] text-xs"
          >
            Вече имам достъп →
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-20 pb-12 text-center relative z-10">
        <span className="eyebrow mb-6 inline-flex">Затворен достъп</span>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight mt-6 max-w-3xl mx-auto">
          <span className="silver-text">Избери своя път.</span>
          <br />
          <span className="blue-text">Влез веднъж. Остани завинаги.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed mt-7">
          Еднократно плащане. Без скрити такси. Без обвързване с месечен абонамент.
        </p>
      </section>

      {/* === Plans === */}
      <section className="max-w-6xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isActive = selected === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelected(plan.id)}
                className={`card rounded-2xl p-8 text-left flex flex-col group transition-all ${
                  isActive
                    ? "border-blue-400/60 -translate-y-1"
                    : "hover:border-blue-400/30"
                }`}
                style={
                  isActive
                    ? {
                        boxShadow:
                          "0 0 0 1px rgba(96, 165, 250, 0.4) inset, 0 0 40px rgba(59, 130, 246, 0.25)",
                      }
                    : undefined
                }
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80">
                      {plan.tagline}
                    </p>
                    <h2 className="text-2xl font-semibold text-white mt-2">
                      {plan.name}
                    </h2>
                  </div>
                  {plan.highlight && (
                    <span className="text-[0.6rem] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-blue-400/40 text-blue-200 bg-blue-500/10 shrink-0">
                      Препоръчан
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <span className="silver-text text-5xl font-bold font-mono">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2 font-mono">
                    {plan.currency}
                  </span>
                  <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mt-2">
                    {plan.oneTime ? "Еднократно" : "Месечно"}
                  </p>
                </div>

                <ul className="space-y-3 mb-7 flex-1">
                  {plan.perks.map((perk) => (
                    <li
                      key={perk}
                      className="text-sm text-gray-300 leading-relaxed flex gap-3"
                    >
                      <span
                        aria-hidden
                        className="text-blue-300 mt-0.5 shrink-0"
                      >
                        ✓
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-5 border-t border-white/5">
                  <div
                    className={`text-xs font-mono uppercase tracking-[0.25em] flex items-center justify-between ${
                      isActive ? "text-blue-200" : "text-gray-500"
                    }`}
                  >
                    <span>{isActive ? "Избран" : "Избери"}</span>
                    <span
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                        isActive
                          ? "border-blue-400 bg-blue-500/20"
                          : "border-white/15"
                      }`}
                    >
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-blue-300" />
                      )}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* === Checkout summary + button === */}
      <section className="max-w-2xl mx-auto px-6 pb-24 relative z-10">
        <div className="card rounded-2xl p-7 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                Избран план
              </p>
              <p className="text-xl font-semibold text-white">
                {selectedPlan.name}{" "}
                <span className="text-gray-500 font-normal">
                  · {selectedPlan.tagline}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                За плащане
              </p>
              <p className="blue-text text-3xl font-bold font-mono">
                {selectedPlan.price} {selectedPlan.currency}
              </p>
            </div>
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleCheckout}
            disabled={loading}
            className="btn-primary w-full px-6 py-4 rounded-xl font-semibold text-white text-base disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3"
          >
            {loading ? (
              "Пренасочване..."
            ) : (
              <>
                Към сигурно плащане
                <span aria-hidden>→</span>
              </>
            )}
          </button>

          <p className="mt-5 text-center text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-600">
            Плащане през Stripe · SSL защита · 14 дни гаранция
          </p>
        </div>

        {/* === Reassurance ribbon === */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          <div className="card rounded-xl p-4">
            <p className="text-blue-300 font-mono text-lg">∞</p>
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-2">
              Пожизнен достъп
            </p>
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-blue-300 font-mono text-lg">14</p>
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-2">
              Дни гаранция
            </p>
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-blue-300 font-mono text-lg">●</p>
            <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-2">
              100% дискретно
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 font-mono uppercase tracking-[0.25em] mt-10">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </section>
    </main>
  );
}
