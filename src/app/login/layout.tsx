import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход",
  description: "Влез в Velion Lab — затворен клуб за мъже.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
