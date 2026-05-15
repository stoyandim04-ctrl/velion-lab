import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { modules } from "@/lib/content";

const completedByModule: Record<string, number> = {
  "1": 3,
};

export default function ModulesPage() {
  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <section className="fade-up mb-14">
          <span className="eyebrow mb-5">Програмата</span>
          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
            Осем модула.
            <br />
            Един път.
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Минаваш ги по ред. Всеки следващ стъпва на предишния. Не прескачай —
            не защото е забранено, а защото е безсмислено.
          </p>
        </section>

        <div className="divider mb-12" />

        {/* === Modules grid === */}
        <section className="grid md:grid-cols-2 gap-6 fade-up">
          {modules.map((mod) => {
            const total = mod.lessons.length;
            const done = completedByModule[mod.id] ?? 0;
            const percent = Math.round((done / total) * 100);
            const isComplete = done === total;
            const isStarted = done > 0;

            return (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                className="card rounded-2xl p-8 flex flex-col group"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="num-badge text-lg">{mod.number}</div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                        Модул {mod.number}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80 mt-1">
                        {total} урока
                      </div>
                    </div>
                  </div>

                  {/* Status pill */}
                  <span
                    className={`text-[0.65rem] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                      isComplete
                        ? "border-blue-400/40 text-blue-200 bg-blue-500/10"
                        : isStarted
                        ? "border-blue-400/20 text-blue-300/80"
                        : "border-white/10 text-gray-500"
                    }`}
                  >
                    {isComplete
                      ? "Завършен"
                      : isStarted
                      ? "В ход"
                      : "Предстои"}
                  </span>
                </div>

                {/* Title + subtitle */}
                <h2 className="text-2xl font-semibold text-white leading-snug mb-2 group-hover:text-blue-200 transition">
                  {mod.title}
                </h2>
                <p className="text-sm text-blue-300/70 font-mono tracking-wide uppercase mb-4">
                  {mod.subtitle}
                </p>
                <p className="text-gray-400 leading-relaxed mb-7 flex-1">
                  {mod.description}
                </p>

                {/* Progress bar */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                    Прогрес
                  </span>
                  <span className="text-xs font-mono text-blue-300/80">
                    {done} / {total}
                  </span>
                </div>
                <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                    style={{
                      width: `${percent}%`,
                      background:
                        "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                      boxShadow: percent > 0 ? "0 0 12px rgba(59, 130, 246, 0.5)" : "none",
                    }}
                  />
                </div>

                {/* CTA row */}
                <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 group-hover:text-blue-300 transition">
                    {isStarted ? "Продължи модула" : "Започни модула"}
                  </span>
                  <span
                    aria-hidden
                    className="text-blue-300 group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
