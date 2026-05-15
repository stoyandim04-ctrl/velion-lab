import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { modules } from "@/lib/content";

const completedLessonIds = new Set(["1-1", "1-2", "1-3"]);

export function generateStaticParams() {
  return modules.map((m) => ({ id: m.id }));
}

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mod = modules.find((m) => m.id === id);
  if (!mod) notFound();

  const total = mod.lessons.length;
  const done = mod.lessons.filter((l) => completedLessonIds.has(l.id)).length;
  const percent = Math.round((done / total) * 100);
  const isComplete = done === total;

  const currentIndex = modules.findIndex((m) => m.id === mod.id);
  const prevMod = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextMod =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <AppShell>
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Breadcrumb === */}
        <Link
          href="/modules"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-gray-500 hover:text-blue-300 transition mb-10"
        >
          <span aria-hidden>←</span>
          Всички модули
        </Link>

        {/* === Hero === */}
        <section className="fade-up mb-12">
          <div className="flex items-center gap-5 mb-6">
            <div className="num-badge text-xl" style={{ width: "3.5rem", height: "3.5rem" }}>
              {mod.number}
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-blue-300/80">
                Модул {mod.number}
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mt-1">
                {total} урока · ~{total * 9} мин
              </div>
            </div>
          </div>

          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            {mod.title}
          </h1>
          <p className="blue-text text-xl md:text-2xl font-mono tracking-wide uppercase mt-4">
            {mod.subtitle}
          </p>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl leading-relaxed">
            {mod.description}
          </p>
        </section>

        {/* === Progress bar === */}
        <section className="card rounded-2xl p-6 md:p-7 mb-14 fade-up">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <span className="eyebrow">Прогрес на модула</span>
            <span className="font-mono text-blue-300 text-sm tracking-wider">
              {done} / {total} · {percent}%
            </span>
          </div>
          <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                background:
                  "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                boxShadow: percent > 0 ? "0 0 14px rgba(59, 130, 246, 0.5)" : "none",
              }}
            />
          </div>
          {isComplete && (
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80 mt-4">
              Модулът е завършен — продължи към следващия.
            </p>
          )}
        </section>

        <div className="divider mb-12" />

        {/* === Lessons list === */}
        <section className="fade-up">
          <div className="mb-8">
            <span className="eyebrow">Уроците в модула</span>
            <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3">
              Три урока. Един път.
            </h2>
          </div>

          <ol className="flex flex-col gap-5">
            {mod.lessons.map((lesson, idx) => {
              const isDone = completedLessonIds.has(lesson.id);
              const lessonNumber = `${mod.number}.${idx + 1}`;

              return (
                <li key={lesson.id}>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="card rounded-2xl p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6 group"
                  >
                    {/* Number + status */}
                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-2 md:w-32 shrink-0">
                      <div className="num-badge text-base">{lessonNumber}</div>
                      <span
                        className={`text-[0.65rem] font-mono uppercase tracking-[0.2em] ${
                          isDone ? "text-blue-300" : "text-gray-500"
                        }`}
                      >
                        {isDone ? "✓ Завършен" : "Предстои"}
                      </span>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug mb-2 group-hover:text-blue-200 transition">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-3">
                        {lesson.description}
                      </p>
                      <p className="text-xs font-mono uppercase tracking-[0.2em] text-blue-300/70">
                        Извод — {lesson.takeaway}
                      </p>
                    </div>

                    {/* Right meta */}
                    <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                      <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                        {lesson.duration}
                      </span>
                      <span
                        aria-hidden
                        className="text-blue-300 text-lg group-hover:translate-x-1 transition-transform"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        {/* === Prev / Next nav === */}
        <div className="divider mt-16 mb-10" />

        <nav className="grid sm:grid-cols-2 gap-4 fade-up">
          {prevMod ? (
            <Link
              href={`/modules/${prevMod.id}`}
              className="card rounded-2xl p-5 flex items-center gap-4 group"
            >
              <span
                aria-hidden
                className="text-blue-300 text-lg group-hover:-translate-x-1 transition-transform"
              >
                ←
              </span>
              <div className="min-w-0">
                <div className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500">
                  Предишен модул · {prevMod.number}
                </div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition mt-1">
                  {prevMod.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextMod ? (
            <Link
              href={`/modules/${nextMod.id}`}
              className="card rounded-2xl p-5 flex items-center justify-end gap-4 text-right group"
            >
              <div className="min-w-0">
                <div className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500">
                  Следващ модул · {nextMod.number}
                </div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition mt-1">
                  {nextMod.title}
                </div>
              </div>
              <span
                aria-hidden
                className="text-blue-300 text-lg group-hover:translate-x-1 transition-transform"
              >
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
