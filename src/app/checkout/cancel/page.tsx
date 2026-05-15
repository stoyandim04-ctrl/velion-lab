import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative">
      <div
        className="spotlight"
        style={{
          width: "600px",
          height: "600px",
          background: "rgba(30, 58, 138, 0.25)",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Link href="/" className="mb-10 hover:opacity-80 transition relative z-10">
        <Logo />
      </Link>

      <div className="w-full max-w-lg card rounded-3xl p-8 md:p-10 text-center relative z-10">
        <span className="eyebrow mb-6 inline-flex">Прекъснато</span>

        <h1 className="silver-text text-3xl md:text-4xl font-bold leading-tight mt-4">
          Плащането не беше завършено.
        </h1>

        <p className="text-gray-400 leading-relaxed mt-5">
          Нищо не ти беше таксувано. Можеш да опиташ отново или да се върнеш
          към началната страница.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            href="/checkout"
            className="btn-primary flex-1 px-6 py-3.5 rounded-xl font-semibold text-white inline-flex items-center justify-center gap-2"
          >
            Опитай пак
          </Link>
          <Link
            href="/"
            className="btn-ghost flex-1 px-6 py-3.5 rounded-xl font-semibold text-white inline-flex items-center justify-center gap-2"
          >
            Към началото
          </Link>
        </div>

        <p className="mt-7 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-600">
          Имаш въпрос? Пиши на support@velion-lab.com
        </p>
      </div>
    </main>
  );
}
