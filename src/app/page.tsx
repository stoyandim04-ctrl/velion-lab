import Link from "next/link";
import { Logo } from "@/components/Logo";

const modules = [
  { id: "I",    title: "Защо свършваш бързо",            desc: "Истинската причина — без митове и без оправдания." },
  { id: "II",   title: "Контрол над възбудата",          desc: "Управление на нивата в реално време." },
  { id: "III",  title: "Дишане, темпо и паузи",          desc: "Техники на елитни спортисти и монаси." },
  { id: "IV",   title: "Тяло, навици и нервна система",  desc: "Какво в ежедневието саботира контрола ти." },
  { id: "V",    title: "Ментален контрол",               desc: "Спиране на тревогата преди акта." },
  { id: "VI",   title: "Разбиране на жените",            desc: "Психология на желанието — без манипулации." },
  { id: "VII",  title: "Привличане и мъжко присъствие",  desc: "Стандартът на тихия, контролиращ мъж." },
  { id: "VIII", title: "Дългосрочен контрол",            desc: "Дневен ритуал за пожизнен резултат." },
];

const truths = [
  {
    n: "I",
    t: "Първото поражение",
    d: "Помниш я. Тя не помни теб. Срамът остава по-дълго от акта.",
  },
  {
    n: "II",
    t: "Тревогата те предава",
    d: "Мислиш дали ще успееш — а вече си изгубил. Мозъкът ти удря преди тялото.",
  },
  {
    n: "III",
    t: "Никой не те научи",
    d: "Бащата мълчи. Училището премълчава. Порното лъже. Сега си сам.",
  },
];

const transformations = [
  { t: "Време",      d: "Издържаш докато ти решиш." },
  { t: "Тишина",     d: "Без вътрешния глас на тревога." },
  { t: "Излъчване",  d: "Стоиш по-уверено. Говориш по-малко." },
  { t: "Свобода",    d: "Никой не пита. Никой не разбира." },
];

const faq = [
  {
    q: "Това работи ли наистина?",
    a: "Не обещаваме магия. Това е тренировъчна система — както за фитнес, така и за контрол. Резултатите зависят от практиката. Първите видими промени — в първите 2-3 седмици.",
  },
  {
    q: "Колко време ще ми отнеме?",
    a: "10-20 минути дневно. Можеш да учиш по 1 модул на седмица или всичко наведнъж. Достъпът е пожизнен.",
  },
  {
    q: "Има ли нужда да говоря с някого?",
    a: "Не. Програмата е изцяло само за теб. Никакви групови чатове. Никакви разкрития. Поверителността е стълб на Velion Lab.",
  },
  {
    q: "Какво ако не работи?",
    a: "Velion Lab не е лекарство и не замества лекар. Ако имаш медицинско състояние — консултирай се със специалист. Програмата е образователна — техники, дисциплина, осъзнаване.",
  },
  {
    q: "Как се плаща?",
    a: "През Stripe — сигурно SSL плащане с карта. Три плана: 49, 99 или 199 лв. Еднократно, без месечен абонамент. Виж всички планове на страницата „Цени“.",
  },
];

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* === Spotlights === */}
      <div className="spotlight" style={{ width: "700px", height: "700px", background: "rgba(30, 58, 138, 0.35)", top: "-200px", left: "50%", transform: "translateX(-50%)" }} />
      <div className="spotlight" style={{ width: "500px", height: "500px", background: "rgba(59, 130, 246, 0.2)", top: "400px", right: "-150px" }} />

      {/* === Navbar === */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm text-gray-300 font-medium">
            <a href="#truths" className="hover:text-blue-300 transition">Истината</a>
            <a href="#modules" className="hover:text-blue-300 transition">Системата</a>
            <Link href="/checkout" className="hover:text-blue-300 transition">Цени</Link>
            <a href="#faq" className="hover:text-blue-300 transition">FAQ</a>
          </div>
          <Link
            href="/login"
            className="text-sm text-gray-300 hover:text-blue-300 transition"
          >
            Вход →
          </Link>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="relative max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-24 text-center fade-in">
        {/* Logo as hero centerpiece */}
        <div className="flex justify-center mb-12">
          <Logo variant="full" className="drop-shadow-[0_0_60px_rgba(59,130,246,0.3)]" />
        </div>

        <div className="inline-flex items-center gap-3 mb-8 text-xs tracking-[0.35em] text-blue-300/80 font-mono uppercase">
          <span className="h-px w-6 bg-blue-400/40" />
          Затворен Клуб · За Мъжете
          <span className="h-px w-6 bg-blue-400/40" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl mx-auto">
          <span className="silver-text">Бавният мъж владее.</span>
          <br />
          <span className="blue-text">Бързият — обяснява.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-12">
          Затворена програма за мъжете, които искат да издържат повече,
          говорят по-малко и излъчват повече.
          <br className="hidden md:block" />
          Без срам. Без хапчета. Без чужди очи.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up">
          <Link
            href="/register"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base"
          >
            Заяви достъп
            <span aria-hidden>→</span>
          </Link>
          <a
            href="#truths"
            className="btn-ghost inline-flex items-center justify-center px-8 py-4 rounded-full text-gray-200 font-medium"
          >
            Защо съществува
          </a>
        </div>

        {/* Trust strip — minimal, like a luxury brand */}
        <div className="mt-24 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.7rem] uppercase tracking-[0.3em] text-gray-600 font-mono">
          <span>· 8 модула</span>
          <span>· 40+ урока</span>
          <span>· пожизнен достъп</span>
          <span>· 100% поверителност</span>
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION I: TRUTHS === */}
      <section id="truths" className="relative max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Три истини</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] max-w-3xl mx-auto">
            <span className="silver-text">Бащите ни не казаха.</span>
            <br />
            <span className="silver-text">Училището премълча.</span>
            <br />
            <span className="blue-text">Порното излъга.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {truths.map((t) => (
            <div key={t.n} className="card rounded-3xl p-8">
              <div className="num-badge mb-6">{t.n}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{t.t}</h3>
              <p className="text-gray-400 leading-relaxed text-[0.95rem]">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION II: CHANGE === */}
      <section id="change" className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Какво се променя</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            <span className="silver-text">Четири неща</span>
            <span className="blue-text"> ще усетиш първи.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {transformations.map((b, i) => (
            <div key={b.t} className="card rounded-3xl p-8 text-center">
              <p className="text-blue-400/40 font-mono text-sm mb-4 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-semibold mb-3 silver-text">{b.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION III: MODULES === */}
      <section id="modules" className="relative max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Системата</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto">
            <span className="silver-text">Осем стъпки.</span>
            <span className="blue-text"> Един резултат.</span>
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed">
            Подредени стъпка по стъпка. Започваш от причината. Стигаш до контрола.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {modules.map((m) => (
            <div key={m.id} className="card rounded-2xl p-6 flex gap-5 items-start">
              <div className="num-badge shrink-0">{m.id}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION IV: TESTIMONIALS === */}
      <section className="relative max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <p className="eyebrow mb-6">Гласовете</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="silver-text">Какво казват мъжете</span>
            <br />
            <span className="blue-text">които влязоха първи.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card rounded-3xl p-8">
              <p className="text-blue-400 mb-5 text-lg tracking-[0.3em]">★★★★★</p>
              <p className="text-gray-300 leading-relaxed italic mb-6">
                Тук ще се появят истински отзиви, след като първите потребители завършат програмата.
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-[0.25em] font-mono">
                — Анонимен · Vol. {String(i).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === FAQ === */}
      <section id="faq" className="relative max-w-3xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <p className="eyebrow mb-6">Въпроси</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="silver-text">Това, което</span>
            <span className="blue-text"> питат всички.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <details key={i} className="card rounded-2xl p-6 group cursor-pointer">
              <summary className="font-semibold text-lg list-none flex items-center justify-between gap-4 text-white">
                {item.q}
                <span className="text-blue-400 text-2xl transition-transform group-open:rotate-45 font-light">+</span>
              </summary>
              <p className="text-gray-400 text-[0.95rem] leading-relaxed mt-5">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative max-w-4xl mx-auto px-6 py-32 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-900/15 rounded-[2.5rem] blur-3xl -z-10" />

        <p className="eyebrow mb-8">Затворен достъп</p>

        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] max-w-3xl mx-auto">
          <span className="silver-text">Готов да бъдеш</span>
          <br />
          <span className="blue-text">мъжът, когото тя помни?</span>
        </h2>

        <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto">
          Влизаш веднъж. Оставаш завинаги. Никой не разбира.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/checkout"
            className="btn-primary inline-flex items-center justify-center gap-2 px-12 py-5 rounded-full font-semibold text-white text-lg"
          >
            Заяви достъп до Velion Lab
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/register"
            className="btn-ghost inline-flex items-center justify-center px-8 py-5 rounded-full text-gray-200 font-medium"
          >
            Имам код за достъп
          </Link>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-sm text-gray-500">
          <div>
            <div className="mb-4"><Logo /></div>
            <p className="leading-relaxed text-gray-500">
              Затворен клуб за мъже. Premium coaching.
            </p>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-4 uppercase text-xs tracking-[0.25em] font-mono">Навигация</p>
            <ul className="space-y-2.5">
              <li><a href="#truths" className="hover:text-blue-300 transition">Истината</a></li>
              <li><a href="#modules" className="hover:text-blue-300 transition">Системата</a></li>
              <li><Link href="/checkout" className="hover:text-blue-300 transition">Цени</Link></li>
              <li><a href="#faq" className="hover:text-blue-300 transition">FAQ</a></li>
              <li><Link href="/login" className="hover:text-blue-300 transition">Вход</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-gray-300 font-semibold mb-4 uppercase text-xs tracking-[0.25em] font-mono">Disclaimer</p>
            <p className="leading-relaxed text-[0.8rem] text-gray-500">
              Съдържанието на Velion Lab е чисто <strong className="text-gray-300">образователно</strong>.
              То не замества консултация с лекар, сексолог или психотерапевт.
              Ако имаш медицинско състояние — обърни се към специалист.
            </p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-mono uppercase tracking-[0.2em]">
          <p>© {new Date().getFullYear()} Velion Lab</p>
          <p>Всички права запазени.</p>
        </div>
      </footer>
    </main>
  );
}
