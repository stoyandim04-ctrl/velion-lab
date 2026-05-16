import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Velion Lab — Бавният мъж владее",
    template: "%s · Velion Lab",
  },
  description:
    "Premium програма за мъже, които искат контрол — без срам и хаос. 8 модула, 24+ урока, 10 минути дневна практика.",
  keywords: [
    "мъжки контрол",
    "преждевременна еякулация",
    "сексуална увереност",
    "мъжка психология",
    "Velion Lab",
  ],
  authors: [{ name: "Velion Lab" }],
  openGraph: {
    title: "Velion Lab — Бавният мъж владее",
    description:
      "Затворена premium програма за мъже. Контрол. Присъствие. Дискретност.",
    locale: "bg_BG",
    type: "website",
    siteName: "Velion Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velion Lab — Бавният мъж владее",
    description:
      "Затворена premium програма за мъже. Контрол. Присъствие. Дискретност.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
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
