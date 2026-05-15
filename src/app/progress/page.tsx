import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { modules } from "@/lib/content";

const completedLessonIds = new Set(["1-1", "1-2", "1-3"]);

const lessonLog = [
  { id: "1-3", date: "2026-05-13", label: "13 май" },
  { id: "1-2", date: "2026-05-12", label: "12 май" },
  { id: "1-1", date: "2026-05-11", label: "11 май" },
];

const streakDays = 7;
const weekStrip = [
  { day: "Пн", done: true },
  { day: "Вт", done: true },
  { day: "Ср", done: true },
  { day: "Чт", done: true },
  { day: "Пт", done: true },
  { day: "Сб", done: false, today: true },
  { day: "Нд", done: false },
];

export default function ProgressPage() {
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => completedLessonIds.has(l.id)).length,
    0,
  );
  const percent = Math.round((completedLessons / totalLessons) * 100);

  const radius = 88;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  const allLessons = modules.flatMap((m) => m.lessons);
  const lookupLesson = (id: string) => allLessons.find((l) => l.id === id);
  const lookupModuleByLessonId = (id: string) =>
    modules.find((m) => m.lessons.some((l) => l.id === id));

  return (
    <AppShell>
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <section className="fade-up mb-14">
          <span className="eyebrow mb-5">Твоят път</span>
          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
            Прогрес.
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Това, което не се измерва — не се подобрява. Виж докъде си стигнал.
            Без бързане.
          </p>
        </section>

        {/* === Top row: circular % + streak === */}
        <section className="grid md:grid-cols-3 gap-6 mb-16 fade-up">
          {/* Circular progress */}
          <div className="card rounded-2xl p-8 md:col-span-2 flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <svg
                width={radius * 2 + stroke * 2}
                height={radius * 2 + stroke * 2}
                className="-rotate-90"
              >
                {/* Track */}
                <circle
                  cx={radius + stroke}
                  cy={radius + stroke}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth={stroke}
                />
                {/* Filled arc */}
                <circle
                  cx={radius + stroke}
                  cy={radius + stroke}
                  r={radius}
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  style={{ filter: "drop-shadow(0 0 12px rgba(59, 130, 246, 0.6))" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="blue-text text-5xl font-bold font-mono leading-none">
                  {percent}%
                </div>
                <div className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500 mt-2">
                  Завършено
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <span className="eyebrow">Целият курс</span>
              <h2 className="silver-text text-3xl font-bold mt-3">
                {completedLessons} от {totalLessons} урока
              </h2>
              <p className="text-gray-400 leading-relaxed mt-3">
                Един урок на ден. След три седмици — финал.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/modules"
                  className="btn-primary rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Към модулите
                </Link>
                <Link
                  href="/exercises"
                  className="btn-ghost rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Дневна задача
                </Link>
              </div>
            </div>
          </div>

          {/* Streak card */}
          <div className="card rounded-2xl p-8 flex flex-col">
            <span className="eyebrow mb-4">Поредни дни</span>
            <div className="blue-text text-7xl font-bold font-mono leading-none">
              {String(streakDays).padStart(2, "0")}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mt-3">
              Дисциплината е сила. Не я губи за един ден.
            </p>

            <div className="mt-auto pt-6 grid grid-cols-7 gap-1.5">
              {weekStrip.map((d, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-md flex items-center justify-center text-[0.6rem] font-mono ${
                    d.done
                      ? "bg-blue-500/15 border border-blue-400/40 text-blue-200"
                      : d.today
                      ? "border border-blue-400/30 text-blue-300"
                      : "border border-white/5 text-gray-600"
                  }`}
                  title={d.day}
                >
                  {d.day}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider mb-12" />

        {/* === Modules progress list === */}
        <section className="fade-up mb-16">
          <div className="mb-8">
            <span className="eyebrow">По модули</span>
            <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3">
              Където стоиш в програмата
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {modules.map((mod) => {
              const total = mod.lessons.length;
              const done = mod.lessons.filter((l) => completedLessonIds.has(l.id)).length;
              const pct = Math.round((done / total) * 100);
              const isComplete = done === total;
              const isStarted = done > 0;

              return (
                <Link
                  key={mod.id}
                  href={`/modules/${mod.id}`}
                  className="card rounded-2xl p-5 md:p-6 flex items-center gap-5 group"
                >
                  <div className="num-badge text-base shrink-0">{mod.number}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <h3 className="text-base md:text-lg font-semibold text-white truncate group-hover:text-blue-200 transition">
                        {mod.title}
                      </h3>
                      <span
                        className={`text-[0.65rem] font-mono uppercase tracking-[0.2em] ${
                          isComplete
                            ? "text-blue-200"
                            : isStarted
                            ? "text-blue-300/80"
                            : "text-gray-500"
                        }`}
                      >
                        {done} / {total} · {pct}%
                      </span>
                    </div>
                    <div className="relative h-1 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                          boxShadow: pct > 0 ? "0 0 10px rgba(59, 130, 246, 0.5)" : "none",
                        }}
                      />
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="text-blue-300 shrink-0 group-hover:translate-x-1 transition-transform"
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="divider mb-12" />

        {/* === Lesson log === */}
        <section className="fade-up">
          <div className="mb-8">
            <span className="eyebrow">Дневник</span>
            <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3">
              Завършените уроци
            </h2>
          </div>

          <ol className="flex flex-col gap-3">
            {lessonLog.map((entry) => {
              const lesson = lookupLesson(entry.id);
              const mod = lookupModuleByLessonId(entry.id);
              if (!lesson || !mod) return null;

              return (
                <li key={entry.id}>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="card rounded-xl p-5 flex items-center gap-5 group"
                  >
                    <div className="text-center shrink-0 w-16">
                      <div className="text-blue-300 text-base font-mono font-semibold">
                        ✓
                      </div>
                      <div className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                        {entry.label}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-blue-300/70 mb-1">
                        Модул {mod.number} · {mod.title}
                      </div>
                      <div className="text-base md:text-lg font-semibold text-white truncate group-hover:text-blue-200 transition">
                        {lesson.title}
                      </div>
                    </div>

                    <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 shrink-0">
                      {lesson.duration}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
