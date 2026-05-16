"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { modules } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const completedByModule: Record<string, number> = {
  "1": 3,
};

const completedLessonIds = new Set(["1-1", "1-2", "1-3"]);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function ModulesPage() {
  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
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
        </motion.section>

        <div className="divider mb-12" />

        {/* === Modules accordion === */}
        <motion.section
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <Accordion
            multiple
            defaultValue={["1"]}
            className="flex flex-col gap-4"
          >
            {modules.map((mod) => {
              const total = mod.lessons.length;
              const done = completedByModule[mod.id] ?? 0;
              const percent = Math.round((done / total) * 100);
              const isComplete = done === total;
              const isStarted = done > 0;

              return (
                <motion.div
                  key={mod.id}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <AccordionItem
                    value={mod.id}
                    className="card rounded-2xl p-6 md:p-7 border-0 last:border-0 not-last:border-0"
                  >
                    <AccordionTrigger className="!py-0 !border-transparent hover:no-underline group/trigger items-start text-left">
                      <div className="flex-1 min-w-0 pr-4">
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
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

                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-white leading-snug mb-2 group-hover/trigger:text-blue-200 transition">
                          {mod.title}
                        </h2>
                        <p className="text-sm text-blue-300/70 font-mono tracking-wide uppercase mb-3">
                          {mod.subtitle}
                        </p>
                        <p className="text-gray-400 leading-relaxed mb-5">
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
                              boxShadow:
                                percent > 0 ? "0 0 12px rgba(59, 130, 246, 0.5)" : "none",
                            }}
                          />
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 mt-2 border-t border-white/5">
                      <div className="mb-4">
                        <span className="eyebrow">Уроците в модула</span>
                      </div>
                      <ol className="flex flex-col gap-3">
                        {mod.lessons.map((lesson, idx) => {
                          const isDone = completedLessonIds.has(lesson.id);
                          const lessonNumber = `${mod.number}.${idx + 1}`;
                          return (
                            <li key={lesson.id}>
                              <Link
                                href={`/lessons/${lesson.id}`}
                                className="rounded-xl p-4 flex items-center gap-4 group hover:bg-white/5 transition border border-white/5 hover:border-blue-400/30"
                              >
                                <div className="num-badge text-sm shrink-0" style={{ width: "2rem", height: "2rem" }}>
                                  {lessonNumber}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-base font-semibold text-white leading-snug group-hover:text-blue-200 transition">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-xs text-gray-500 mt-1 font-mono uppercase tracking-[0.2em]">
                                    {lesson.duration}
                                    {isDone && " · ✓ Завършен"}
                                  </p>
                                </div>
                                <span
                                  aria-hidden
                                  className="text-blue-300 text-lg group-hover:translate-x-1 transition-transform"
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ol>
                      <Link
                        href={`/modules/${mod.id}`}
                        className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300 hover:text-blue-200 transition inline-flex items-center gap-2 mt-5"
                      >
                        {isStarted ? "Продължи модула" : "Започни модула"}
                        <span aria-hidden>→</span>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.section>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
