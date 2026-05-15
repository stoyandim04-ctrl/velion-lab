# Velion Lab — Project Context

> Прочитай го преди да правиш каквото и да е по проекта.

## 🎯 Какво е Velion Lab

Затворена premium онлайн програма за мъже на български език. Темата: контрол над преждевременна еякулация, сексуална увереност, мъжко присъствие, разбиране на жените, мъжка психология, самодисциплина.

**Тонът:** мъжки, тих, премиум, дискретен. **НЕ е** клиничен, лабораторен или научен — въпреки името „Lab". Брандът се чувства като затворен мъжки клуб (Tom Ford, Soho House, luxury watches), не като биолаборатория.

**Потребителят (собственикът) е начинаещ.** Обяснявай простичко, на български, стъпка по стъпка. Един проблем — едно решение. Не претоварвай.

## 🎨 Дизайн система — задължителни правила

### Цветова палитра
- Фон: дълбоко черно `#04050a` с амбиентен син gradient
- Сребърен (за главни заглавия): `silver-text` клас → бяло към сиво gradient
- Електрически син (за акценти): `blue-text` клас → светло към тъмно синьо gradient
- Текст muted: `text-gray-400`, `text-gray-500`

### Типография
- Шрифтове: **Geist Sans** (основен) + **Geist Mono** (labels, numbers)
- Заглавия: huge, bold, leading-tight, с silver или blue gradient
- Eyebrow labels: малки, моноширинни, uppercase, letter-spacing 0.3em
- Римски цифри (I, II, III...) вместо клинични „01, 02, 03"

### Готови utility класове в `globals.css`

| Клас | Какво прави |
|---|---|
| `silver-text` | Сребърен metallic gradient за heading |
| `blue-text` | Electric blue gradient за акценти |
| `card` | Cinematic glass card със subtle hover |
| `btn-primary` | Син светещ premium бутон |
| `btn-ghost` | Прозрачен borderwed бутон |
| `eyebrow` | Section label с mono font + линии отстрани |
| `divider` | Тънка градиентна линия между секциите |
| `num-badge` | Кръгло badge за римски цифри |
| `spotlight` | Декоративна светеща сфера (inline style) |
| `fade-up` / `fade-in` | Reveal анимации |

### ❌ Какво НЕ да правиш
- **Не използвай DNA helix** анимация — потребителят изрично не иска „лабораторен" вайб
- **Не използвай tech grid** background
- **Не използвай оранжево** — само син + сребърен
- **Не пиши вътрешни кавички** в JS стрингове — парсерът се чупи. Използвай em dashes (—) или skip кавичките
- **Не превеждай** на английски — всичко за потребителя е на български
- **Не претоварвай с информация** — потребителят е начинаещ
- **Не използвай `<img>`** — само `next/image` Image компонент

## 🛠 Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@theme inline` в globals.css, не tailwind.config.js)
- **React 19**
- Шрифтове през `next/font/google`: Geist + Geist Mono

## 📁 Структура

```
src/
├── app/
│   ├── page.tsx                  ✅ Landing page (готов)
│   ├── layout.tsx                ✅ Root layout
│   ├── globals.css               ✅ Цялата дизайн система
│   ├── login/page.tsx            ✅ Login форма (mock → /dashboard)
│   ├── register/page.tsx         ✅ Register форма
│   ├── forgot-password/page.tsx  ✅ Forgot password
│   ├── dashboard/page.tsx        ❌ ТРЯБВА ДА СЕ НАПРАВИ
│   ├── modules/page.tsx          ❌ ТРЯБВА ДА СЕ НАПРАВИ
│   ├── modules/[id]/page.tsx     ❌ ТРЯБВА ДА СЕ НАПРАВИ
│   ├── lessons/[id]/page.tsx     ❌ ТРЯБВА ДА СЕ НАПРАВИ
│   ├── exercises/page.tsx        ❌ ТРЯБВА ДА СЕ НАПРАВИ
│   └── progress/page.tsx         ❌ ТРЯБВА ДА СЕ НАПРАВИ
│
├── components/
│   ├── Logo.tsx                  ✅ compact + full варианти
│   ├── AuthShell.tsx             ✅ Wrapper + AuthInput
│   ├── AppShell.tsx              ✅ Top navbar за вътрешните страници
│   └── DnaHelix.tsx              ⚠️ ИЗОСТАВЕН — не използвай
│
├── lib/
│   └── content.ts                ✅ Цялото съдържание на курса
│
└── public/
    └── velion-logo.png           ✅ Истинското cinematic лого
```

## ✅ Какво е направено

1. **Landing page** — hero, три истини, четири промени, 8 модула, testimonials, FAQ, CTA, footer
2. **Auth** — login, register, forgot-password (UI готов, submit е mock)
3. **AppShell** — готов за вътрешните страници
4. **content.ts** — 8 модула × 3 урока + 8 упражнения

## 📋 Какво следва (поред)

### 1. Dashboard (`/dashboard/page.tsx`)
Използвай `AppShell`. Включи:
- Hero: „Здравей, Иван" (mock име) + кратък текст
- Progress widget: 3/24 урока завършени + лента
- Card „Последен урок" → бутон Продължи (води към lesson page)
- Card „Дневна задача" (упражнение от content.ts)
- Quick links към модули и упражнения

### 2. Modules list (`/modules/page.tsx`)
Грид с всички 8 модула от content.ts. За всеки: римска цифра, заглавие, описание, брой уроци, прогрес лентичка. Кликнато → `/modules/[id]`.

### 3. Single module (`/modules/[id]/page.tsx`)
Detail. Hero с number, title, subtitle, description. Списък с уроците (3 в модул). Кликнат урок → `/lessons/[id]`.

### 4. Single lesson (`/lessons/[id]/page.tsx`)
- Aspect-ratio 16:9 видео placeholder (тъмна card с „▶ Видео скоро")
- Описание на урока (от content.ts)
- Card „Ключов извод" (takeaway)
- Card „Упражнение след урока" (exercise)
- Бутон „Маркирай като завършен" (mock засега)
- Линк към следващия урок

### 5. Exercises (`/exercises/page.tsx`)
Категоризирани (breath / control / awareness / confidence). Картичка за всяко. Mock дневен tracker.

### 6. Progress (`/progress/page.tsx`)
- Circular progress (% завършен курс)
- Списък модули и прогреса им
- Streak (поредни дни)
- Дневник на завършените уроци

### 7. Supabase auth
Регистрирай Supabase проект. Свържи `lib/supabase.ts`. Замени mock submit в auth страниците с истински. Защити routes с middleware.

### 8. Deploy
GitHub → Vercel.

## 🌐 Доменни принципи

- Език: **Само български** за user-facing съдържание
- Поверителност: подчертавай че програмата е дискретна
- Disclaimer: „Образователно съдържание, не замества лекар/сексолог"

## 💬 Стилът ти пред потребителя

- На **български**
- Просто, без жаргон
- Стъпка по стъпка
- Когато правиш промяна — обясни в 1-2 изречения какво и защо
- Когато трябва потребителят да направи нещо ръчно — давай точни инструкции

## 🚀 Команди

```bash
npm run dev     # старт на dev server (или двойно щракни velion_start.bat от desktop)
npm run build   # production билд
npm run lint    # ESLint
```

## 📍 Среда

- ОС: Windows 10/11
- Папка: `C:\Users\HP\Desktop\velion-lab`
- Node: v24.15.0
- npm: 11.12.1
- Dev server URL: http://localhost:3000
