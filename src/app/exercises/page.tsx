import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { exercises, type Exercise } from "@/lib/content";

const categoryLabels: Record<Exercise["category"], { title: string; subtitle: string; symbol: string }> = {
  breath: {
    title: "Дишане",
    subtitle: "Основата на контрола",
    symbol: "I",
  },
  control: {
    title: "Контрол",
    subtitle: "Сила в момента",
    symbol: "II",
  },
  awareness: {
    title: "Осъзнатост",
    subtitle: "Виж себе си",
    symbol: "III",
  },
  confidence: {
    title: "Увереност",
    subtitle: "Тихото присъствие",
    symbol: "IV",
  },
};

const categoryOrder: Exercise["category"][] = ["breath", "control", "awareness", "confidence"];

const dailyExerciseId = "ex-1";

export default function ExercisesPage() {
  const daily = exercises.find((e) => e.id === dailyExerciseId)!;

  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <section className="fade-up mb-14">
          <span className="eyebrow mb-5">Практиката</span>
          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
            Упражнения.
            <br />
            Всеки ден по едно.
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Теорията дава посока. Практиката дава резултат. Избери едно
            упражнение днес — и го направи. Утре — следващото.
          </p>
        </section>

        {/* === Daily tracker === */}
        <section className="card rounded-2xl p-8 md:p-10 mb-16 fade-up">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 min-w-0">
              <span className="eyebrow mb-4">Днешната задача</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mt-3">
                {daily.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mt-3 max-w-xl">
                {daily.description}
              </p>
              <div className="flex items-center gap-5 mt-5 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80">
                  {categoryLabels[daily.category].title}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                  · {daily.duration}
                </span>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                  · 4 — 4 — 4 — 4
                </span>
              </div>
            </div>

            {/* Streak / day mark */}
            <div className="shrink-0 flex items-center gap-4 md:flex-col md:items-end">
              <div className="text-right">
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                  Поредни дни
                </div>
                <div className="blue-text text-5xl font-bold font-mono mt-1 leading-none">
                  07
                </div>
              </div>
              <button
                type="button"
                className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Маркирай готово
                <span aria-hidden>✓</span>
              </button>
            </div>
          </div>

          {/* Week strip */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-3">
              Тази седмица
            </div>
            <div className="grid grid-cols-7 gap-2">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day, i) => {
                const isDone = i < 5;
                const isToday = i === 5;
                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-mono ${
                      isDone
                        ? "bg-blue-500/15 border border-blue-400/40 text-blue-200"
                        : isToday
                        ? "border border-blue-400/30 text-blue-300 bg-blue-500/5"
                        : "border border-white/5 text-gray-600"
                    }`}
                  >
                    <span className="uppercase tracking-wider">{day}</span>
                    <span className="text-base mt-0.5">
                      {isDone ? "✓" : isToday ? "·" : " "}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="divider mb-12" />

        {/* === Categories === */}
        <section className="fade-up space-y-16">
          {categoryOrder.map((cat) => {
            const inCat = exercises.filter((e) => e.category === cat);
            if (inCat.length === 0) return null;
            const label = categoryLabels[cat];

            return (
              <div key={cat}>
                <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="num-badge text-base">{label.symbol}</div>
                    <div>
                      <span className="eyebrow">{label.subtitle}</span>
                      <h2 className="silver-text text-3xl font-bold mt-2">
                        {label.title}
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                    {inCat.length} упражнения
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {inCat.map((ex) => (
                    <Link
                      key={ex.id}
                      href={`/exercises#${ex.id}`}
                      id={ex.id}
                      className="card rounded-2xl p-6 md:p-7 flex flex-col group"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-white leading-snug group-hover:text-blue-200 transition">
                          {ex.title}
                        </h3>
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80 shrink-0">
                          {ex.duration}
                        </span>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-sm flex-1">
                        {ex.description}
                      </p>
                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 group-hover:text-blue-300 transition">
                          Започни упражнението
                        </span>
                        <span
                          aria-hidden
                          className="text-blue-300 group-hover:translate-x-1 transition-transform"
                        >
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
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
