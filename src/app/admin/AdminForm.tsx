"use client";

import { useState, useTransition } from "react";
import type { Module, Exercise } from "@/lib/content";
import { saveContent, type ContentPayload } from "./actions";

type BrandT = { name: string; tagline: string; description: string };

type Props = {
  initialBrand: BrandT;
  initialModules: Module[];
  initialExercises: Exercise[];
};

const labelCls =
  "block text-[0.7rem] tracking-[0.3em] uppercase text-blue-300/70 font-mono mb-2";
const inputCls =
  "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-blue-400/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition";
const textareaCls = `${inputCls} min-h-[80px] resize-y leading-relaxed`;

export function AdminForm({ initialBrand, initialModules, initialExercises }: Props) {
  const [brand, setBrand] = useState<BrandT>(initialBrand);
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [activeTab, setActiveTab] = useState<"brand" | "modules" | "exercises">("brand");
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function updateModule(i: number, patch: Partial<Module>) {
    setModules((prev) => prev.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  }
  function updateLesson(mi: number, li: number, patch: Partial<Module["lessons"][number]>) {
    setModules((prev) =>
      prev.map((m, idx) =>
        idx === mi
          ? { ...m, lessons: m.lessons.map((l, ldx) => (ldx === li ? { ...l, ...patch } : l)) }
          : m,
      ),
    );
  }
  function updateExercise(i: number, patch: Partial<Exercise>) {
    setExercises((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)));
  }

  function onSave() {
    setMessage(null);
    const payload: ContentPayload = { brand, modules, exercises };
    startTransition(async () => {
      try {
        const res = await saveContent(payload);
        setMessage({ ok: res.ok, text: res.message });
      } catch (e) {
        setMessage({ ok: false, text: e instanceof Error ? e.message : "Грешка." });
      }
    });
  }

  const tabs: { key: typeof activeTab; label: string; count?: number }[] = [
    { key: "brand", label: "Бранд" },
    { key: "modules", label: "Модули", count: modules.length },
    { key: "exercises", label: "Упражнения", count: exercises.length },
  ];

  return (
    <div className="relative">
      {/* === Sticky save bar === */}
      <div className="sticky top-4 z-30 mb-10">
        <div className="card rounded-2xl px-5 py-4 flex items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            {tabs.map((t) => {
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.2em] transition whitespace-nowrap ${
                    active
                      ? "bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/50"
                      : "text-gray-500 hover:text-blue-300"
                  }`}
                >
                  {t.label}
                  {t.count !== undefined && (
                    <span className="ml-2 text-blue-400/70">{t.count}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {message && (
              <span
                className={`text-xs font-mono uppercase tracking-[0.2em] ${
                  message.ok ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.text}
              </span>
            )}
            <button
              type="button"
              onClick={onSave}
              disabled={pending}
              className="btn-primary px-6 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? "Запазвам…" : "Запази"}
            </button>
          </div>
        </div>
      </div>

      {/* === BRAND === */}
      {activeTab === "brand" && (
        <div className="card rounded-3xl p-8 space-y-6">
          <div>
            <label className={labelCls}>Име на бранда</label>
            <input
              className={inputCls}
              value={brand.name}
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>Tagline (главен hero текст)</label>
            <input
              className={inputCls}
              value={brand.tagline}
              onChange={(e) => setBrand({ ...brand, tagline: e.target.value })}
            />
          </div>
          <div>
            <label className={labelCls}>Описание</label>
            <textarea
              className={textareaCls}
              value={brand.description}
              onChange={(e) => setBrand({ ...brand, description: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* === MODULES === */}
      {activeTab === "modules" && (
        <div className="space-y-6">
          {modules.map((m, mi) => (
            <details
              key={m.id}
              className="card rounded-3xl p-6 group"
              open={mi === 0}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="num-badge shrink-0">{m.number}</span>
                  <div>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-[0.2em]">
                      Модул {m.number}
                    </p>
                    <h3 className="text-lg font-semibold text-white">{m.title}</h3>
                  </div>
                </div>
                <span className="text-blue-400 text-2xl group-open:rotate-45 transition-transform font-light">
                  +
                </span>
              </summary>

              <div className="mt-6 grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Заглавие</label>
                  <input
                    className={inputCls}
                    value={m.title}
                    onChange={(e) => updateModule(mi, { title: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Subtitle</label>
                  <input
                    className={inputCls}
                    value={m.subtitle}
                    onChange={(e) => updateModule(mi, { subtitle: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelCls}>Описание</label>
                  <textarea
                    className={textareaCls}
                    value={m.description}
                    onChange={(e) => updateModule(mi, { description: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/70 mb-4">
                  Уроци ({m.lessons.length})
                </p>
                <div className="space-y-5">
                  {m.lessons.map((l, li) => (
                    <div
                      key={l.id}
                      className="rounded-2xl border border-white/5 bg-black/20 p-5"
                    >
                      <p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-gray-500 mb-3">
                        Урок {l.id}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className={labelCls}>Заглавие на урока</label>
                          <input
                            className={inputCls}
                            value={l.title}
                            onChange={(e) =>
                              updateLesson(mi, li, { title: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Продължителност</label>
                          <input
                            className={inputCls}
                            value={l.duration}
                            onChange={(e) =>
                              updateLesson(mi, li, { duration: e.target.value })
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelCls}>Описание</label>
                          <textarea
                            className={textareaCls}
                            value={l.description}
                            onChange={(e) =>
                              updateLesson(mi, li, { description: e.target.value })
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelCls}>Ключов извод</label>
                          <textarea
                            className={textareaCls}
                            value={l.takeaway}
                            onChange={(e) =>
                              updateLesson(mi, li, { takeaway: e.target.value })
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={labelCls}>Упражнение след урока</label>
                          <textarea
                            className={textareaCls}
                            value={l.exercise}
                            onChange={(e) =>
                              updateLesson(mi, li, { exercise: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* === EXERCISES === */}
      {activeTab === "exercises" && (
        <div className="grid md:grid-cols-2 gap-5">
          {exercises.map((ex, i) => (
            <div key={ex.id} className="card rounded-3xl p-6 space-y-4">
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.3em] text-blue-300/70">
                {ex.category} · {ex.id}
              </p>
              <div>
                <label className={labelCls}>Заглавие</label>
                <input
                  className={inputCls}
                  value={ex.title}
                  onChange={(e) => updateExercise(i, { title: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls}>Продължителност</label>
                <input
                  className={inputCls}
                  value={ex.duration}
                  onChange={(e) => updateExercise(i, { duration: e.target.value })}
                />
              </div>
              <div>
                <label className={labelCls}>Описание</label>
                <textarea
                  className={textareaCls}
                  value={ex.description}
                  onChange={(e) => updateExercise(i, { description: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
