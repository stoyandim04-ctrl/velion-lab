import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цени · Достъп",
  description:
    "Три плана. Един достъп. Пожизнен. 49, 99 или 199 лв — еднократно, без месечен абонамент.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
