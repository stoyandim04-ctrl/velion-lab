import Link from "next/link";
import { Logo } from "@/components/Logo";
import { getPlan } from "@/lib/plans";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ demo?: string; plan?: string; session_id?: string }>;
}) {
  const params = await searchParams;
  const isDemo = params.demo === "1";
  const plan = params.plan ? getPlan(params.plan) : undefined;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div
        className="spotlight"
        style={{
          width: "700px",
          height: "700px",
          background: "rgba(30, 58, 138, 0.35)",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Link href="/" className="mb-10 hover:opacity-80 transition relative z-10">
        <Logo />
      </Link>

      <div className="w-full max-w-lg card rounded-3xl p-8 md:p-10 text-center relative z-10">
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 border"
          style={{
            background:
              "linear-gradient(135deg, rgba(37, 99, 235, 0.4) 0%, rgba(15, 29, 74, 0.6) 100%)",
            borderColor: "rgba(96, 165, 250, 0.4)",
            boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
          }}
        >
          <span className="text-4xl text-blue-200">✓</span>
        </div>

        <span className="eyebrow mb-6 inline-flex">Добре дошъл</span>

        <h1 className="silver-text text-4xl md:text-5xl font-bold leading-tight mt-4">
          Влезе в Velion Lab.
        </h1>

        <p className="text-gray-400 text-base leading-relaxed mt-5">
          {isDemo
            ? "Това е demo режим — Stripe още не е свързан. Когато бъде, тази страница ще се показва след истинско плащане."
            : "Плащането мина успешно. Достъпът ти е активиран. Получаваш email с потвърждение."}
        </p>

        {plan && (
          <div className="mt-7 pt-7 border-t border-white/5 flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                План
              </p>
              <p className="text-white font-semibold">{plan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                Сума
              </p>
              <p className="blue-text font-bold font-mono text-xl">
                {plan.price} {plan.currency}
              </p>
            </div>
          </div>
        )}

        <Link
          href="/dashboard"
          className="btn-primary w-full px-6 py-4 rounded-xl font-semibold text-white inline-flex items-center justify-center gap-3 mt-8"
        >
          Към личния кабинет
          <span aria-hidden>→</span>
        </Link>

        <p className="mt-6 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-600">
          Velion Lab · Защитена зона
        </p>
      </div>
    </main>
  );
}
