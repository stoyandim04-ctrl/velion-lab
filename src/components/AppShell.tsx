// Обща обвивка за страниците ВЪТРЕ в платформата (dashboard, modules, lessons и т.н.)
import Link from "next/link";
import { Logo } from "./Logo";
import { logout } from "@/app/auth/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const nav = [
  { href: "/dashboard",  label: "Начало" },
  { href: "/modules",    label: "Модули" },
  { href: "/exercises",  label: "Упражнения" },
  { href: "/progress",   label: "Прогрес" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* === Top Navbar === */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center hover:opacity-80 transition">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-blue-300 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/account"
              className="block rounded-full transition hover:scale-105"
              title="Профил"
            >
              <Avatar
                size="default"
                className="size-9 ring-1 ring-blue-400/30 hover:ring-blue-400/60 transition after:hidden"
              >
                <AvatarFallback className="bg-gradient-to-br from-blue-700 to-blue-900 text-sm font-semibold text-blue-200">
                  И
                </AvatarFallback>
              </Avatar>
            </Link>
            <form action={logout} className="hidden md:block">
              <button
                type="submit"
                className="text-xs text-gray-500 hover:text-gray-300 font-mono uppercase tracking-[0.2em] transition"
              >
                Изход
              </button>
            </form>
          </div>
        </div>

        {/* Mobile bottom-tab nav */}
        <div className="md:hidden border-t border-white/5 grid grid-cols-4 text-[0.7rem] text-gray-400">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-center py-2 hover:text-blue-300 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex-1 relative">
        <div className="spotlight" style={{ width: "600px", height: "600px", background: "rgba(30, 58, 138, 0.2)", top: "-200px", right: "-100px" }} />
        {children}
      </div>
    </div>
  );
}
