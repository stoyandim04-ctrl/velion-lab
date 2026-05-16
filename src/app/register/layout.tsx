import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Заяви достъп до Velion Lab. Premium програма за мъже — контрол, присъствие, дисциплина.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
