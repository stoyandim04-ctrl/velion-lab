import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velion Lab — Лаборатория за мъжки контрол",
  description:
    "Premium програма за мъже: контрол над еякулацията, увереност, разбиране на жените, мъжка психология и сексуална сила.",
  keywords: [
    "мъжки контрол",
    "преждевременна еякулация",
    "сексуална увереност",
    "мъжка психология",
    "Velion Lab",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
