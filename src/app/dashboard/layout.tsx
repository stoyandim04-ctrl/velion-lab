import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Начало",
  description: "Личен кабинет на Velion Lab — твоят прогрес, последен урок, дневна практика.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
