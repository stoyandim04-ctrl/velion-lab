import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Модули",
  description:
    "Осем модула. Двадесет и четири урока. Подредени стъпка по стъпка. Програмата на Velion Lab.",
};

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
