import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { modules, exercises } from "@/lib/content";

export default function DashboardPage() {
  const userName = "Иван";

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = 3;
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  const nextLesson = modules[1].lessons[0];
  const nextLessonModule = modules[1];

  const dailyExercise = exercises.find((e) => e.id === "ex-1")!;

  const quickModules = modules.slice(0, 3);

  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <section className="fade-up mb-14">
          <span className="eyebrow mb-5">Личен кабинет</span>
          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
            Здравей, {userName}.
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Един урок на ден. Без бързане, без претоварване. Програмата работи,
            когато ти се появяваш — не когато бързаш.
          </p>
        </section>

        {/* === Progress widget === */}
        <section className="card rounded-2xl p-8 md:p-10 mb-10 fade-up">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <span className="eyebrow">Твоят прогрес</span>
              <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3">
                {completedLessons} от {totalLessons} урока
              </h2>
            </div>
            <div className="text-right">
              <div className="font-mono text-blue-300 text-sm tracking-[0.2em] uppercase">
                Завършено
              </div>
              <div className="blue-text text-5xl font-bold font-mono mt-1">
                {progressPercent}%
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progressPercent}%`,
                background:
                  "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
              }}
            />
          </div>

          <p className="text-gray-500 text-sm mt-5 font-mono tracking-wide">
            Модул I завършен — продължаваш към Модул II.
          </p>
        </section>

        {/* === Two cards: last lesson + daily exercise === */}
        <section className="grid md:grid-cols-2 gap-6 mb-14 fade-up">
          {/* Last lesson */}
          <div className="card rounded-2xl p-8 flex flex-col">
            <span className="eyebrow mb-5">Последен урок</span>

            <div className="flex items-center gap-4 mb-5">
              <div className="num-badge text-lg">{nextLessonModule.number}</div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                {nextLessonModule.title}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white leading-snug mb-3">
              {nextLesson.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 flex-1">
              {nextLesson.description}
            </p>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                {nextLesson.duration}
              </span>
              <Link
                href={`/lessons/${nextLesson.id}`}
                className="btn-primary rounded-xl px-6 py-3 text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Продължи
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Daily task */}
          <div className="card rounded-2xl p-8 flex flex-col">
            <span className="eyebrow mb-5">Дневна задача</span>

            <div className="flex items-center gap-3 mb-5">
              <div className="num-badge text-base">◯</div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                Дишане · {dailyExercise.duration}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white leading-snug mb-3">
              {dailyExercise.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 flex-1">
              {dailyExercise.description}
            </p>

            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80">
                4 — 4 — 4 — 4
              </span>
              <Link
                href="/exercises"
                className="btn-ghost rounded-xl px-6 py-3 text-sm font-semibold text-white inline-flex items-center gap-2"
              >
                Започни
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* === Divider === */}
        <div className="divider mb-12" />

        {/* === Quick links to modules === */}
        <section className="fade-up">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="eyebrow">Твоите модули</span>
              <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3">
                Започни от началото
              </h2>
            </div>
            <Link
              href="/modules"
              className="text-sm font-mono uppercase tracking-[0.25em] text-blue-300 hover:text-blue-200 transition"
            >
              Виж всички →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickModules.map((mod) => (
              <Link
                key={mod.id}
                href={`/modules/${mod.id}`}
                className="card rounded-2xl p-7 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="num-badge">{mod.number}</div>
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                    {mod.lessons.length} урока
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white leading-snug mb-2 group-hover:text-blue-200 transition">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-500 font-mono tracking-wide uppercase mb-3">
                  {mod.subtitle}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {mod.description}
                </p>

                <div className="mt-6 pt-5 border-t border-white/5 text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80 group-hover:text-blue-200 transition">
                  Отвори модула →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
