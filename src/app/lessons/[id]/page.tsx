import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { modules } from "@/lib/content";

const completedLessonIds = new Set(["1-1", "1-2", "1-3"]);

const allLessonsFlat = modules.flatMap((m) =>
  m.lessons.map((l, idx) => ({ lesson: l, mod: m, indexInModule: idx })),
);

export function generateStaticParams() {
  return allLessonsFlat.map(({ lesson }) => ({ id: lesson.id }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const flatIdx = allLessonsFlat.findIndex((x) => x.lesson.id === id);
  if (flatIdx === -1) notFound();

  const { lesson, mod, indexInModule } = allLessonsFlat[flatIdx];
  const isComplete = completedLessonIds.has(lesson.id);

  const lessonNumber = `${mod.number}.${indexInModule + 1}`;
  const prev = flatIdx > 0 ? allLessonsFlat[flatIdx - 1] : null;
  const next = flatIdx < allLessonsFlat.length - 1 ? allLessonsFlat[flatIdx + 1] : null;

  return (
    <AppShell>
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Breadcrumb === */}
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-10 flex-wrap">
          <Link href="/modules" className="hover:text-blue-300 transition">
            Модули
          </Link>
          <span aria-hidden className="text-gray-700">/</span>
          <Link href={`/modules/${mod.id}`} className="hover:text-blue-300 transition">
            Модул {mod.number}
          </Link>
          <span aria-hidden className="text-gray-700">/</span>
          <span className="text-blue-300/80">Урок {lessonNumber}</span>
        </div>

        {/* === Hero === */}
        <section className="fade-up mb-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="num-badge text-base">{lessonNumber}</div>
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
              {mod.title} · {lesson.duration}
            </div>
          </div>

          <h1 className="silver-text text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-gray-400 text-lg mt-5 leading-relaxed max-w-2xl">
            {lesson.description}
          </p>
        </section>

        {/* === Video placeholder === */}
        <section className="fade-up mb-12">
          <div
            className="card rounded-2xl relative overflow-hidden"
            style={{ aspectRatio: "16 / 9" }}
          >
            <div
              className="spotlight"
              style={{
                width: "500px",
                height: "500px",
                background: "rgba(59, 130, 246, 0.25)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5 border"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37, 99, 235, 0.4) 0%, rgba(15, 29, 74, 0.6) 100%)",
                  borderColor: "rgba(96, 165, 250, 0.4)",
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
                }}
              >
                <span className="text-3xl text-blue-200 ml-1.5">▶</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-blue-300/80">
                Видео скоро
              </div>
              <div className="text-sm text-gray-500 mt-2 max-w-md">
                Записът на този урок ще бъде наличен в следващото обновление.
              </div>
            </div>
          </div>
        </section>

        {/* === Takeaway === */}
        <section className="card rounded-2xl p-8 md:p-10 mb-8 fade-up">
          <span className="eyebrow mb-5">Ключов извод</span>
          <p className="silver-text text-2xl md:text-3xl font-semibold leading-snug mt-4">
            — {lesson.takeaway}
          </p>
        </section>

        {/* === Exercise after lesson === */}
        <section className="card rounded-2xl p-8 md:p-10 mb-12 fade-up">
          <div className="flex items-start gap-5">
            <div className="num-badge shrink-0">◯</div>
            <div className="flex-1 min-w-0">
              <span className="eyebrow">Упражнение след урока</span>
              <p className="text-gray-300 text-lg leading-relaxed mt-4">
                {lesson.exercise}
              </p>
              <Link
                href="/exercises"
                className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300 hover:text-blue-200 transition inline-flex items-center gap-2 mt-5"
              >
                Виж всички упражнения
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* === Mark complete === */}
        <section className="text-center fade-up mb-14">
          {isComplete ? (
            <div className="inline-flex items-center gap-3 px-7 py-4 rounded-xl border border-blue-400/40 bg-blue-500/10 text-blue-200">
              <span aria-hidden className="text-xl">✓</span>
              <span className="font-mono text-sm uppercase tracking-[0.25em]">
                Урокът е завършен
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="btn-primary rounded-xl px-8 py-4 text-sm font-semibold text-white inline-flex items-center gap-3"
            >
              Маркирай като завършен
              <span aria-hidden>✓</span>
            </button>
          )}
          <p className="text-xs text-gray-600 font-mono uppercase tracking-[0.2em] mt-4">
            {isComplete
              ? "Продължи към следващия урок"
              : "Гледай видеото и направи упражнението преди да маркираш"}
          </p>
        </section>

        <div className="divider mb-10" />

        {/* === Prev / Next === */}
        <nav className="grid sm:grid-cols-2 gap-4 fade-up">
          {prev ? (
            <Link
              href={`/lessons/${prev.lesson.id}`}
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
                  Предишен · {prev.mod.number}.{prev.indexInModule + 1}
                </div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition mt-1">
                  {prev.lesson.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link
              href={`/lessons/${next.lesson.id}`}
              className="card rounded-2xl p-5 flex items-center justify-end gap-4 text-right group"
            >
              <div className="min-w-0">
                <div className="text-[0.65rem] font-mono uppercase tracking-[0.25em] text-gray-500">
                  Следващ · {next.mod.number}.{next.indexInModule + 1}
                </div>
                <div className="text-sm font-semibold text-white truncate group-hover:text-blue-200 transition mt-1">
                  {next.lesson.title}
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
