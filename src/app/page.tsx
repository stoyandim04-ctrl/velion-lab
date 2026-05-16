"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Logo } from "@/components/Logo";
import { HeroVideo } from "@/components/HeroVideo";
import {
  Counter,
  MouseParallax,
  ParallaxLayer,
  ScrollProgressBar,
} from "@/components/Cinematic";

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
  { n: "I",   t: "Първото поражение",   d: "Помниш я. Тя не помни теб. Срамът остава по-дълго от акта." },
  { n: "II",  t: "Тревогата те предава", d: "Мислиш дали ще успееш — а вече си изгубил. Мозъкът ти удря преди тялото." },
  { n: "III", t: "Никой не те научи",    d: "Бащата мълчи. Училището премълчава. Порното лъже. Сега си сам." },
];

const transformations = [
  { t: "Време",      d: "Издържаш докато ти решиш." },
  { t: "Тишина",     d: "Без вътрешния глас на тревога." },
  { t: "Излъчване",  d: "Стоиш по-уверено. Говориш по-малко." },
  { t: "Свобода",    d: "Никой не пита. Никой не разбира." },
];

const heroStats = [
  { value: 8,   suffix: "",  label: "Модула",              sub: "Подредени стъпка по стъпка" },
  { value: 24,  suffix: "+", label: "Урока",               sub: "По 3 урока във всеки модул" },
  { value: 10,  suffix: "",  label: "Мин дневна практика", sub: "Кратко, но всеки ден" },
];

const problems = [
  { n: "I",   t: "Липса на осъзнаване",                  d: "Не виждаш кога нивото се качва. Реагираш едва когато е твърде късно." },
  { n: "II",  t: "Прекалено високо напрежение",          d: "Тялото ти е свито като пружина. Натрупаното напрежение работи срещу теб." },
  { n: "III", t: "Срам и страх",                          d: "Мислиш — ще успея ли — и вече си изгубил. Главата ти удря преди тялото." },
  { n: "IV",  t: "Слаба връзка тяло-нервна система",     d: "Не чуваш сигналите. Не управляваш дишането. Тялото те води, не обратното." },
];

const faq = [
  { q: "Това работи ли наистина?", a: "Не обещаваме магия. Това е тренировъчна система — както за фитнес, така и за контрол. Резултатите зависят от практиката. Първите видими промени — в първите 2-3 седмици." },
  { q: "Колко време ще ми отнеме?", a: "10-20 минути дневно. Можеш да учиш по 1 модул на седмица или всичко наведнъж. Достъпът е пожизнен." },
  { q: "Има ли нужда да говоря с някого?", a: "Не. Програмата е изцяло само за теб. Никакви групови чатове. Никакви разкрития. Поверителността е стълб на Velion Lab." },
  { q: "Какво ако не работи?", a: "Velion Lab не е лекарство и не замества лекар. Ако имаш медицинско състояние — консултирай се със специалист. Програмата е образователна — техники, дисциплина, осъзнаване." },
  { q: "Как се плаща?", a: "През Stripe — сигурно SSL плащане с карта. Три плана: 49, 99 или 199 лв. Еднократно, без месечен абонамент. Виж всички планове на страницата Цени." },
];

const marqueeWords = [
  "Контрол", "Присъствие", "Тишина", "Дисциплина",
  "Поверителност", "Излъчване", "Свобода", "Време",
];

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };
const heroContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const cardContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const eyebrowLine = { hidden: { scaleX: 0 }, visible: { scaleX: 1 } };

function AnimatedEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.3em] uppercase text-blue-300/90 font-mono"
    >
      <motion.span variants={eyebrowLine} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="block h-px w-7 bg-gradient-to-r from-transparent to-blue-400/50 origin-right" />
      <span>{children}</span>
      <motion.span variants={eyebrowLine} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="block h-px w-7 bg-gradient-to-l from-transparent to-blue-400/50 origin-left" />
    </motion.div>
  );
}

function AnimatedNumBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ rotate: 0, opacity: 0, scale: 0.8 }}
      whileInView={{ rotate: 360, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`num-badge ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CinematicCTA({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost" }) {
  if (variant === "ghost") {
    return (
      <Link href={href} className="btn-ghost-cinematic">
        {children}
      </Link>
    );
  }
  return (
    <Link href={href} className="btn-cinematic">
      <span className="shimmer" />
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <main className="relative w-full overflow-hidden">
      <ScrollProgressBar />

      {/* === Cinematic ambient orbs (parallax) === */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <ParallaxLayer speed={0.4} className="absolute inset-0">
          <div className="orb orb-blue" style={{ width: 720, height: 720, top: -260, left: "50%", transform: "translateX(-50%)" }} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.25} className="absolute inset-0">
          <div className="orb orb-deep" style={{ width: 540, height: 540, top: 380, right: -160 }} />
        </ParallaxLayer>
        <ParallaxLayer speed={0.55} className="absolute inset-0">
          <div className="orb orb-bright" style={{ width: 420, height: 420, top: 1200, left: -120 }} />
        </ParallaxLayer>
      </div>

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
          <Link href="/login" className="text-sm text-gray-300 hover:text-blue-300 transition">
            Вход →
          </Link>
        </div>
      </nav>

      {/* === HERO === */}
      <div className="relative overflow-hidden">
        {/* Cinematic background video */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroVideo
            src="/videos/hero-bedroom.mp4"
            className="h-full w-full object-cover opacity-[0.35]"
          />
          {/* Vignette + bottom fade so text stays readable */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,5,10,0.65)_60%,#04050a_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[#04050a]" />
        </div>

      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-24 text-center"
      >
        {/* Decorative grid floor */}
        <div className="grid-floor opacity-50" />

        <motion.div variants={heroContainer} initial="hidden" animate="visible">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-10"
          >
            <MouseParallax strength={10}>
              <Logo variant="full" className="drop-shadow-[0_0_80px_rgba(59,130,246,0.45)]" />
            </MouseParallax>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 mb-8 text-xs tracking-[0.35em] text-blue-300/80 font-mono uppercase"
          >
            <span className="glow-dot" />
            Затворен Клуб · За Мъжете
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto"
          >
            <span className="shimmer-text">Бавният мъж владее.</span>
            <br />
            <span className="blue-text">Бързият — обяснява.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-base md:text-lg text-blue-200/70 font-light tracking-wide mb-8"
          >
            Premium програма за мъже, които искат контрол —{" "}
            <span className="text-white/90">без срам и хаос.</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 leading-relaxed mb-12"
          >
            Затворена програма за мъжете, които искат да издържат повече,
            говорят по-малко и излъчват повече.
            <br className="hidden md:block" />
            Без срам. Без хапчета. Без чужди очи.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <CinematicCTA href="/register">
              Заяви достъп <span aria-hidden>→</span>
            </CinematicCTA>
            <CinematicCTA href="#truths" variant="ghost">
              Защо съществува
            </CinematicCTA>
          </motion.div>

          {/* Hero stat cards */}
          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {heroStats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass tilt-card rounded-2xl p-7 text-center relative"
              >
                <p className="text-[0.7rem] tracking-[0.3em] uppercase text-blue-300/70 font-mono mb-4">
                  {s.label}
                </p>
                <p className="silver-text text-6xl md:text-7xl font-bold leading-none mb-3">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-gray-500 tracking-wide">{s.sub}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[0.7rem] uppercase tracking-[0.3em] text-gray-600 font-mono"
          >
            <span>· Пожизнен достъп</span>
            <span>· 100% поверителност</span>
            <span>· Без чужди очи</span>
          </motion.div>
        </motion.div>
      </motion.section>
      </div>

      {/* === Marquee band === */}
      <div className="relative py-10 border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="marquee">
          <div className="marquee__track text-3xl md:text-5xl font-bold tracking-tight">
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12 text-white/[0.07] uppercase">
                {w}
                <span className="text-blue-400/40 text-2xl">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION: PROBLEM === */}
      <section id="problem" className="relative section-bg-1 py-28 overflow-hidden">
        {/* Cinematic background video */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroVideo
            src="/visuals/problem-hero.mp4"
            className="h-full w-full object-cover opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,5,10,0.6)_0%,#04050a_85%)]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6"><AnimatedEyebrow>Проблемът</AnimatedEyebrow></div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] max-w-3xl mx-auto"
            >
              <span className="silver-text">Проблемът рядко е</span>
              <br />
              <span className="blue-text">само физически.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
            >
              Тялото следва главата. А главата следва навиците, които никой не ти е показал.
            </motion.p>
          </div>

          <motion.div
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {problems.map((p) => (
              <motion.div
                key={p.n}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="glass tilt-card rounded-2xl p-7 relative overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15), transparent 70%)" }} />
                <AnimatedNumBadge className="mb-5">{p.n}</AnimatedNumBadge>
                <h3 className="text-lg font-semibold text-white mt-5 mb-3 leading-snug">{p.t}</h3>
                <p className="text-gray-400 leading-relaxed text-[0.92rem]">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION I: TRUTHS === */}
      <section id="truths" className="relative py-28 overflow-hidden">
        {/* Cinematic background video */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroVideo
            src="/visuals/truths-hero.mp4"
            className="h-full w-full object-cover opacity-[0.16]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,5,10,0.55)_0%,#04050a_85%)]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="mb-6"><AnimatedEyebrow>Три истини</AnimatedEyebrow></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] max-w-3xl mx-auto"
          >
            <span className="silver-text">Бащите ни не казаха.</span>
            <br />
            <span className="silver-text">Училището премълча.</span>
            <br />
            <span className="blue-text">Порното излъга.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {truths.map((t) => (
            <motion.div
              key={t.n}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-strong rounded-3xl p-8"
            >
              <AnimatedNumBadge className="mb-6">{t.n}</AnimatedNumBadge>
              <h3 className="text-xl font-semibold mb-3 text-white mt-6">{t.t}</h3>
              <p className="text-gray-400 leading-relaxed text-[0.95rem]">{t.d}</p>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION II: CHANGE === */}
      <section id="change" className="relative section-bg-3 max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <div className="mb-6"><AnimatedEyebrow>Какво се променя</AnimatedEyebrow></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto"
          >
            <span className="silver-text">Четири неща</span>
            <span className="blue-text"> ще усетиш първи.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {transformations.map((b, i) => (
            <motion.div
              key={b.t}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <p className="text-blue-400/40 font-mono text-sm mb-4 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-2xl font-semibold mb-3 silver-text">{b.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.d}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION III: MODULES === */}
      <section id="modules" className="relative section-bg-2 max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <div className="mb-6"><AnimatedEyebrow>Системата</AnimatedEyebrow></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto"
          >
            <span className="silver-text">Осем стъпки.</span>
            <span className="blue-text"> Един резултат.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed"
          >
            Подредени стъпка по стъпка. Започваш от причината. Стигаш до контрола.
          </motion.p>
        </div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-5"
        >
          {modules.map((m, i) => (
            <motion.div
              key={m.id}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-2xl p-6 flex gap-5 items-start relative overflow-hidden group"
            >
              <span className="absolute top-3 right-4 font-mono text-[0.65rem] tracking-[0.3em] uppercase text-blue-300/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <AnimatedNumBadge className="shrink-0">{m.id}</AnimatedNumBadge>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-blue-200 transition">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === SECTION IV: TESTIMONIALS === */}
      <section className="relative max-w-5xl mx-auto px-6 py-28">
        <div className="text-center mb-16">
          <div className="mb-6"><AnimatedEyebrow>Гласовете</AnimatedEyebrow></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="silver-text">Какво казват мъжете</span>
            <br />
            <span className="blue-text">които влязоха първи.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="glass-strong rounded-3xl overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={`/visuals/testimonial-${i}.png`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04050a]" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                  <p className="text-blue-300 text-sm tracking-[0.3em]">★★★★★</p>
                  <p className="text-[0.6rem] text-gray-400 uppercase tracking-[0.25em] font-mono">
                    Vol. {String(i).padStart(2, "0")}
                  </p>
                </div>
              </div>
              <div className="p-8">
                <p className="text-gray-300 leading-relaxed italic mb-6">
                  Тук ще се появят истински отзиви, след като първите потребители завършат програмата.
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-[0.25em] font-mono">
                  — Анонимен · Член на клуба
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="divider max-w-3xl mx-auto" />

      {/* === FAQ === */}
      <section id="faq" className="relative max-w-3xl mx-auto px-6 py-28">
        <div className="text-center mb-14">
          <div className="mb-6"><AnimatedEyebrow>Въпроси</AnimatedEyebrow></div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            <span className="silver-text">Това, което</span>
            <span className="blue-text"> питат всички.</span>
          </motion.h2>
        </div>

        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-3"
        >
          {faq.map((item, i) => (
            <motion.details
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 group cursor-pointer"
            >
              <summary className="font-semibold text-lg list-none flex items-center justify-between gap-4 text-white">
                {item.q}
                <span className="text-blue-400 text-2xl transition-transform group-open:rotate-45 font-light">+</span>
              </summary>
              <p className="text-gray-400 text-[0.95rem] leading-relaxed mt-5">{item.a}</p>
            </motion.details>
          ))}
        </motion.div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative py-32 text-center overflow-hidden">
        {/* Cinematic background video */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroVideo
            src="/visuals/cta-hero.mp4"
            className="h-full w-full object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,5,10,0.5)_0%,#04050a_85%)]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-900/15 rounded-[2.5rem] blur-3xl -z-10" />

        <div className="mb-8"><AnimatedEyebrow>Затворен достъп</AnimatedEyebrow></div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] max-w-3xl mx-auto"
        >
          <span className="silver-text">Готов да бъдеш</span>
          <br />
          <span className="blue-text">мъжът, когото тя помни?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg text-gray-400 mb-12 max-w-xl mx-auto"
        >
          Влизаш веднъж. Оставаш завинаги. Никой не разбира.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CinematicCTA href="/checkout">
            Заяви достъп до Velion Lab <span aria-hidden>→</span>
          </CinematicCTA>
          <CinematicCTA href="/register" variant="ghost">
            Имам код за достъп
          </CinematicCTA>
        </motion.div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="border-t border-white/5 py-16 relative z-10">
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
