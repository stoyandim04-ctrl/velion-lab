"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { modules, exercises } from "@/lib/content";
import { ProgressRing } from "@/components/ProgressRing";
import { ParallaxLayer } from "@/components/Cinematic";
import { ModuleArtwork } from "@/components/ModuleArtwork";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const cardContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

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
      {/* Cinematic ambient orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ParallaxLayer speed={0.3} className="absolute inset-0">
          <div className="orb orb-blue" style={{ width: 600, height: 600, top: -200, right: -150 }} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.5} className="absolute inset-0">
          <div className="orb orb-deep" style={{ width: 480, height: 480, top: 700, left: -180 }} />
        </ParallaxLayer>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
        >
          <div>
            <span className="eyebrow mb-5">Личен кабинет</span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
              <span className="shimmer-text">Здравей, {userName}.</span>
            </h1>
            <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
              Един урок на ден. Без бързане, без претоварване. Програмата работи,
              когато ти се появяваш — не когато бързаш.
            </p>
            <div className="mt-6 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-blue-300/80">
              <span className="glow-dot" />
              Активен сезон · Vol. 01
            </div>
          </div>
        </motion.section>

        {/* === Progress hero card with ring === */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="glass-strong gradient-border rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <div className="grid-floor" />
            </div>
            <div className="relative grid md:grid-cols-[auto_1fr] gap-10 items-center">
              <ProgressRing percent={progressPercent} label="Завършено" />
              <div>
                <span className="eyebrow">Твоят прогрес</span>
                <h2 className="silver-text text-3xl md:text-4xl font-bold mt-3 leading-tight">
                  {completedLessons} от {totalLessons} урока
                </h2>
                <p className="text-gray-400 mt-4 max-w-md leading-relaxed">
                  Модул I завършен — продължаваш към Модул II. Тихо. Дисциплинирано. По твое темпо.
                </p>

                <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden mt-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)",
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                    }}
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-6 text-xs font-mono uppercase tracking-[0.25em] text-gray-500">
                  <span>· Серия: 5 дни</span>
                  <span>· Последно: вчера</span>
                  <span>· Тон: тихо</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* === Two cards: last lesson + daily exercise === */}
        <motion.section
          variants={cardContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6 mb-14"
        >
          {/* Last lesson */}
          <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="glass tilt-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group">
              <span className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)", filter: "blur(20px)" }} />
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
                <Link href={`/lessons/${nextLesson.id}`} className="btn-cinematic !px-6 !py-3 text-sm">
                  <span className="shimmer" />
                  <span className="relative z-[1] inline-flex items-center gap-2">
                    Продължи <span aria-hidden>→</span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Daily task */}
          <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div className="glass tilt-card rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group">
              <span className="absolute -top-12 -left-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle, rgba(147,197,253,0.35), transparent 70%)", filter: "blur(20px)" }} />
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
                <Link href="/exercises" className="btn-ghost-cinematic !px-6 !py-3 text-sm">
                  Започни →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* === Divider === */}
        <div className="divider mb-12" />

        {/* === Quick links to modules === */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
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

          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {quickModules.map((mod) => (
              <motion.div
                key={mod.id}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <Link href={`/modules/${mod.id}`} className="block group">
                  <div className="glass tilt-card rounded-2xl h-full flex flex-col relative overflow-hidden">
                    {/* Artwork header */}
                    <div className="relative h-28 md:h-32 overflow-hidden">
                      <ModuleArtwork moduleId={mod.id} className="absolute inset-0" intensity="subtle" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080a14]/90" />
                      <div className="absolute top-4 right-4 text-[0.6rem] font-mono uppercase tracking-[0.3em] text-blue-300/40">
                        {mod.number}
                      </div>
                    </div>

                    <div className="p-7 flex flex-col flex-1">
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

                      <div className="mt-6 pt-5 border-t border-white/5 text-xs font-mono uppercase tracking-[0.25em] text-blue-300/80 group-hover:text-blue-200 transition flex items-center justify-between">
                        Отвори модула
                        <span className="transform transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* === Stats strip === */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { v: "5",   l: "Дни поредно" },
            { v: "3",   l: "Урока завършени" },
            { v: "12", l: "Мин/ден" },
            { v: "I",   l: "Активен модул" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-5 text-center">
              <div className="silver-text text-3xl font-bold leading-none">{s.v}</div>
              <div className="text-[0.6rem] font-mono uppercase tracking-[0.3em] text-gray-500 mt-3">{s.l}</div>
            </div>
          ))}
        </motion.section>

        {/* === Footer note === */}
        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Образователно съдържание · Не замества лекар или сексолог
        </p>
      </main>
    </AppShell>
  );
}
