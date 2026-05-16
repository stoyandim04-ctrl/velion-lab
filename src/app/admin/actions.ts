"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Module, Exercise } from "@/lib/content";

const ADMIN_EMAIL = "stoyan.dim04@gmail.com";

const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type ContentPayload = {
  brand: { name: string; tagline: string; description: string };
  modules: Module[];
  exercises: Exercise[];
};

async function assertAdmin() {
  if (!hasSupabase) {
    throw new Error("Admin недостъпен — Supabase не е конфигуриран.");
  }
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user || data.user.email !== ADMIN_EMAIL) {
    throw new Error("Нямаш достъп.");
  }
}

function esc(s: string) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function generateContentFile(payload: ContentPayload): string {
  const { brand, modules, exercises } = payload;

  const modulesStr = modules
    .map((m) => {
      const lessonsStr = m.lessons
        .map(
          (l) =>
            `      { id: "${esc(l.id)}", moduleId: "${esc(l.moduleId)}", title: \`${esc(l.title)}\`, duration: \`${esc(l.duration)}\`, description: \`${esc(l.description)}\`, takeaway: \`${esc(l.takeaway)}\`, exercise: \`${esc(l.exercise)}\` },`,
        )
        .join("\n");
      return `  {
    id: "${esc(m.id)}",
    number: "${esc(m.number)}",
    title: \`${esc(m.title)}\`,
    subtitle: \`${esc(m.subtitle)}\`,
    description: \`${esc(m.description)}\`,
    lessons: [
${lessonsStr}
    ],
  },`;
    })
    .join("\n");

  const exercisesStr = exercises
    .map(
      (e) =>
        `  { id: "${esc(e.id)}", title: \`${esc(e.title)}\`, category: "${e.category}", duration: \`${esc(e.duration)}\`, description: \`${esc(e.description)}\` },`,
    )
    .join("\n");

  return `// === Velion Lab — Централно съдържание ===
// Този файл се генерира автоматично от /admin страницата.
// Можеш и ръчно да го редактираш — но следващото запазване от admin ще го пренапише.

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  description: string;
  /** Кратък ключов извод */
  takeaway: string;
  /** Конкретно упражнение след урока */
  exercise: string;
};

export type Module = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
};

export type Exercise = {
  id: string;
  title: string;
  category: "breath" | "control" | "awareness" | "confidence";
  duration: string;
  description: string;
};

// === МОДУЛИ ===
export const modules: Module[] = [
${modulesStr}
];

// === УПРАЖНЕНИЯ ===
export const exercises: Exercise[] = [
${exercisesStr}
];

// === БРАНД ТЕКСТОВЕ (за лесна редакция) ===
export const brand = {
  name: \`${esc(brand.name)}\`,
  tagline: \`${esc(brand.tagline)}\`,
  description: \`${esc(brand.description)}\`,
};
`;
}

export async function saveContent(payload: ContentPayload) {
  await assertAdmin();

  const filePath = path.join(process.cwd(), "src", "lib", "content.ts");
  const out = generateContentFile(payload);
  await fs.writeFile(filePath, out, "utf-8");

  revalidatePath("/", "layout");

  return { ok: true, message: "Запазено успешно." };
}
