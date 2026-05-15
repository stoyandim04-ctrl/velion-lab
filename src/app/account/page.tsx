"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { logout } from "@/app/auth/actions";

// Mock данни — после ще идват от Supabase
const mockUser = {
  name: "Иван Иванов",
  email: "ivan@example.com",
  joined: "Май 2026",
  plan: "Velion Lab · Пожизнен достъп",
  streak: 7,
  lessonsCompleted: 3,
  totalLessons: 24,
};

export default function AccountPage() {
  const [tab, setTab] = useState<"profile" | "security" | "notifications">("profile");

  return (
    <AppShell>
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* === Hero === */}
        <section className="fade-up mb-10">
          <span className="eyebrow mb-5">Профил</span>
          <h1 className="silver-text text-5xl md:text-6xl font-bold leading-tight tracking-tight mt-4">
            Твоят акаунт
          </h1>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl leading-relaxed">
            Управлявай профила, паролата и предпочитанията си.
          </p>
        </section>

        <div className="divider mb-12" />

        {/* === Profile card === */}
        <section className="card rounded-2xl p-7 md:p-8 mb-10 fade-up">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-950 border border-blue-400/30 flex items-center justify-center text-3xl font-bold text-blue-200">
              {mockUser.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-white mb-1">{mockUser.name}</h2>
              <p className="text-gray-400 text-sm">{mockUser.email}</p>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-blue-300/70 mt-2">
                Член от {mockUser.joined}
              </p>
            </div>

            {/* Plan */}
            <div className="text-right">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-1">
                План
              </p>
              <p className="blue-text text-sm font-semibold">{mockUser.plan}</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-7 pt-7 border-t border-white/5">
            <div>
              <p className="text-2xl font-bold silver-text">{mockUser.streak}</p>
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                Поредни дни
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold silver-text">
                {mockUser.lessonsCompleted}/{mockUser.totalLessons}
              </p>
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                Завършени урока
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold silver-text">
                {Math.round((mockUser.lessonsCompleted / mockUser.totalLessons) * 100)}%
              </p>
              <p className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-gray-500 mt-1">
                От програмата
              </p>
            </div>
          </div>
        </section>

        {/* === Tabs === */}
        <section className="fade-up">
          <div className="flex gap-2 mb-6 border-b border-white/5 pb-1">
            <TabBtn active={tab === "profile"} onClick={() => setTab("profile")}>
              Данни
            </TabBtn>
            <TabBtn active={tab === "security"} onClick={() => setTab("security")}>
              Сигурност
            </TabBtn>
            <TabBtn active={tab === "notifications"} onClick={() => setTab("notifications")}>
              Известия
            </TabBtn>
          </div>

          {/* Tab content */}
          {tab === "profile" && <ProfileTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "notifications" && <NotificationsTab />}
        </section>

        <div className="divider my-12" />

        {/* === Logout / Delete === */}
        <section className="grid md:grid-cols-2 gap-4 fade-up">
          <form action={logout}>
            <button
              type="submit"
              className="card rounded-2xl p-6 group flex items-center justify-between w-full text-left"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-1">
                  Изход
                </p>
                <p className="text-white font-semibold">Излез от профила</p>
              </div>
              <span aria-hidden className="text-blue-300 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </form>

          <button
            type="button"
            className="card rounded-2xl p-6 text-left group hover:!border-red-500/30 transition"
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-red-400/70 mb-1">
              Опасна зона
            </p>
            <p className="text-white font-semibold">Изтрий профила</p>
          </button>
        </section>

        <p className="text-center text-xs text-gray-600 font-mono tracking-[0.2em] uppercase mt-20">
          Velion Lab · Защитена зона
        </p>
      </main>
    </AppShell>
  );
}

// === Helper компоненти ===

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3 text-sm font-medium rounded-t-lg transition relative ${
        active
          ? "text-blue-200"
          : "text-gray-500 hover:text-gray-300"
      }`}
    >
      {children}
      {active && (
        <span className="absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      )}
    </button>
  );
}

function FormRow({
  label,
  type = "text",
  defaultValue,
  placeholder,
}: {
  label: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block mb-5">
      <span className="block text-xs uppercase tracking-[0.2em] text-gray-400 font-mono mb-2">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-400 focus:bg-white/10 transition text-base"
      />
    </label>
  );
}

function ProfileTab() {
  return (
    <form className="card rounded-2xl p-7 md:p-8">
      <h3 className="text-lg font-semibold text-white mb-6">Лични данни</h3>
      <div className="grid md:grid-cols-2 gap-x-6">
        <FormRow label="Име" defaultValue={mockUser.name.split(" ")[0]} />
        <FormRow label="Фамилия" defaultValue={mockUser.name.split(" ")[1]} />
      </div>
      <FormRow label="Email" type="email" defaultValue={mockUser.email} />

      <button
        type="submit"
        className="btn-primary px-6 py-3 rounded-xl font-semibold text-white mt-3"
      >
        Запази промените
      </button>
    </form>
  );
}

function SecurityTab() {
  return (
    <form className="card rounded-2xl p-7 md:p-8">
      <h3 className="text-lg font-semibold text-white mb-6">Смяна на парола</h3>
      <FormRow label="Текуща парола" type="password" placeholder="••••••••" />
      <FormRow label="Нова парола" type="password" placeholder="Минимум 8 символа" />
      <FormRow label="Повтори новата" type="password" placeholder="••••••••" />

      <button
        type="submit"
        className="btn-primary px-6 py-3 rounded-xl font-semibold text-white mt-3"
      >
        Смени паролата
      </button>
    </form>
  );
}

function NotificationsTab() {
  const items = [
    { label: "Email за нови уроци", desc: "Получаваш email когато добавим нов модул или урок.", checked: true },
    { label: "Дневно напомняне", desc: "Напомняне всеки ден в 09:00 за днешната задача.", checked: true },
    { label: "Седмичен преглед", desc: "Кратък email всяка неделя с твоя прогрес.", checked: false },
    { label: "Промоции и оферти", desc: "Известяваме те при отстъпки или нови програми.", checked: false },
  ];

  return (
    <div className="card rounded-2xl p-7 md:p-8">
      <h3 className="text-lg font-semibold text-white mb-6">Известия</h3>
      <div className="space-y-5">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className="mt-1 accent-blue-500 w-4 h-4"
            />
            <div className="flex-1">
              <p className="text-white font-medium group-hover:text-blue-200 transition">
                {item.label}
              </p>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          </label>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary px-6 py-3 rounded-xl font-semibold text-white mt-7"
      >
        Запази
      </button>
    </div>
  );
}
