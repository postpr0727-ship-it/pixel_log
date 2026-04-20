'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// ── Pre-computed particle data (avoids SSR hydration mismatch) ────────────────
const PARTICLES = [
  { id: 0,  x: 4,  s: 2, d: 0,   t: 22 },
  { id: 1,  x: 10, s: 1, d: 4.5, t: 18 },
  { id: 2,  x: 18, s: 3, d: 1.2, t: 26 },
  { id: 3,  x: 27, s: 1, d: 7,   t: 20 },
  { id: 4,  x: 36, s: 2, d: 2.8, t: 31 },
  { id: 5,  x: 44, s: 1, d: 9,   t: 17 },
  { id: 6,  x: 52, s: 3, d: 5.5, t: 24 },
  { id: 7,  x: 61, s: 2, d: 0.5, t: 28 },
  { id: 8,  x: 70, s: 1, d: 6.5, t: 19 },
  { id: 9,  x: 78, s: 2, d: 3.2, t: 23 },
  { id: 10, x: 86, s: 1, d: 8.5, t: 16 },
  { id: 11, x: 94, s: 3, d: 1.8, t: 27 },
  { id: 12, x: 32, s: 1, d: 11,  t: 21 },
  { id: 13, x: 58, s: 2, d: 13,  t: 25 },
  { id: 14, x: 82, s: 1, d: 14.5,t: 29 },
];

const MARQUEE = [
  'BRANDING', 'WEB DESIGN', 'DEVELOPMENT', 'BLOG MARKETING',
  'SEO', 'ONLINE ADS', 'UI/UX', 'VIDEO', 'CONSULTING', 'STRATEGY', 'CREATIVE', 'GROWTH',
];

// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({
  to,
  duration = 2.5,
  delay = 0,
  locale = false,
}: {
  to: number;
  duration?: number;
  delay?: number;
  locale?: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;
    const ctrl = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        node.textContent = locale
          ? Math.floor(v).toLocaleString()
          : Math.floor(v).toString();
      },
    });
    return () => ctrl.stop();
  }, [inView, to, duration, delay, locale]);

  return <span ref={nodeRef}>0</span>;
}

// ── Primary stat card ─────────────────────────────────────────────────────────
type SlideDir = 'left' | 'right' | 'up';

interface StatCardProps {
  number: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay: number;
  dir?: SlideDir;
  locale?: boolean;
}

function StatCard({ number, suffix, label, sublabel, delay, dir = 'up', locale }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const initial =
    dir === 'left' ? { opacity: 0, x: -40 } :
    dir === 'right' ? { opacity: 0, x: 40 } :
    { opacity: 0, y: 40 };

  const visible =
    dir === 'left' || dir === 'right'
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? visible : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden border border-white/[0.09] bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-7 md:p-8 lg:p-10"
    >
      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_20%_20%,rgba(212,175,55,0.13),transparent_70%)]" />

      {/* Top accent line draws in */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: delay + 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gold/[0.07] blur-2xl pointer-events-none"
        animate={{ opacity: [0.4, 0.85, 0.4], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 3.5 + delay * 0.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Number */}
      <p className="relative text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none">
        <CountUp to={number} duration={2.5} delay={delay + 0.2} locale={locale} />
        <span className="text-gold">{suffix}</span>
      </p>

      {/* Divider */}
      <motion.div
        className="mt-4 mb-4 h-px w-full origin-left bg-gradient-to-r from-gold/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: delay + 0.5 }}
      />

      <p className="text-white/90 text-sm md:text-base lg:text-lg font-semibold leading-snug">{label}</p>
      <p className="text-white/35 text-[10px] font-bold tracking-[0.22em] uppercase mt-1.5">{sublabel}</p>
    </motion.div>
  );
}

// ── Secondary stat (compact pill strip) ──────────────────────────────────────
function MiniStat({ number, suffix, label, sublabel, delay, locale }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center py-8 px-4"
    >
      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
        <CountUp to={number} duration={2} delay={delay + 0.1} locale={locale} />
        <span className="text-gold/90">{suffix}</span>
      </p>
      <div className="mt-3 mb-3 w-7 h-px bg-gold/45 mx-auto" />
      <p className="text-white/65 text-xs sm:text-sm font-semibold">{label}</p>
      <p className="text-white/28 text-[10px] font-medium tracking-[0.22em] uppercase mt-0.5">{sublabel}</p>
    </motion.div>
  );
}

// ── Horizontal timeline / milestones ─────────────────────────────────────────
const MILESTONES = [
  { year: '2023', event: 'PIXEL-LOG 설립', sub: 'Founded' },
  { year: '2023', event: '김포다조은병원 통합마케팅 수주', sub: 'Marketing Contract' },
  { year: '2024', event: '네이버 이달의 블로그 선정', sub: 'Blog of the Month' },
  { year: '2024', event: '네이버 올해의 블로그 선정', sub: 'Blog of the Year' },
  { year: '2025', event: 'AI 웹 프로그래밍 도입', sub: 'AI Web Programming' },
  { year: '2026', event: '김포시농구협회 홈페이지 수주', sub: 'Official Site Contract' },
];

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="mt-4 lg:mt-5 relative overflow-hidden border border-white/[0.09] bg-white/[0.02] px-8 md:px-12 py-10 md:py-12">
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-gold/60 text-[10px] font-bold tracking-[0.35em] uppercase mb-8"
      >
        TIMELINE
      </motion.p>

      {/* Progress line */}
      <div className="relative">
        <div className="absolute top-[10px] left-0 right-0 h-px bg-white/10" />
        <motion.div
          className="absolute top-[10px] left-0 h-px bg-gradient-to-r from-gold/70 to-gold/20 origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%' }}
        />

        {/* Milestone dots + labels */}
        <div className="relative grid grid-cols-6 gap-2">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={`${m.year}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Dot */}
              <motion.div
                className="w-5 h-5 rounded-full border-2 border-gold bg-navy mb-4 relative z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gold/25"
                  animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2.5, delay: 0.8 + i * 0.2, repeat: Infinity, ease: 'easeOut' }}
                />
              </motion.div>
              <p className="text-gold text-xs sm:text-sm font-black tracking-tight">{m.year}</p>
              <p className="text-white/75 text-[10px] sm:text-xs font-semibold mt-1 leading-snug">{m.event}</p>
              <p className="text-white/28 text-[9px] font-medium tracking-[0.15em] uppercase mt-0.5 hidden sm:block">{m.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Bar counter (used inside SkillBars) ──────────────────────────────────────
function BarCounter({ to, delay, inView }: { to: number; delay: number; inView: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;
    const ctrl = animate(0, to, {
      duration: 1.4,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { node.textContent = Math.floor(v).toString(); },
    });
    return () => ctrl.stop();
  }, [inView, to, delay]);

  return <span ref={nodeRef}>0</span>;
}

// ── Skill / service bars ──────────────────────────────────────────────────────
const SKILLS = [
  { label: '블로그 마케팅', en: 'Blog Marketing', pct: 98 },
  { label: '웹 디자인',     en: 'Web Design',     pct: 93 },
  { label: '브랜딩',        en: 'Branding',        pct: 91 },
  { label: '웹 개발',       en: 'Web Development', pct: 87 },
  { label: '영상 제작',     en: 'Video Production',pct: 84 },
  { label: '온라인 광고',   en: 'Online Ads',      pct: 89 },
];

function SkillBars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="mt-4 lg:mt-5 border border-white/[0.09] bg-white/[0.02] p-8 md:p-10 lg:p-12">
      <motion.p
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55 }}
        className="text-gold/60 text-[10px] font-bold tracking-[0.35em] uppercase mb-8"
      >
        SERVICE EXPERTISE
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        {SKILLS.map((sk, i) => (
          <motion.div
            key={sk.en}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-white/80 text-sm font-semibold">{sk.label}</span>
              <span className="text-gold text-xs font-black tabular-nums">
                <BarCounter to={sk.pct} delay={0.3 + i * 0.1} inView={inView} />%
              </span>
            </div>
            <div className="h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold/60"
                style={{ height: '1px' }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${sk.pct}%` } : {}}
                transition={{ duration: 1.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Shimmer on bar */}
              <motion.div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                initial={{ x: '-100%' }}
                animate={inView ? { x: `${sk.pct * 1.2}%` } : {}}
                transition={{ duration: 1.6, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Feature quote ─────────────────────────────────────────────────────────────
function FeatureQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mt-4 lg:mt-5 relative overflow-hidden border border-gold/22 bg-gradient-to-br from-gold/[0.08] to-transparent p-10 md:p-14 lg:p-16"
    >
      {/* Pulsing orbs */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/[0.12] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 left-12 w-48 h-48 rounded-full bg-gold/[0.07] blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 0.85, 1.2], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
      />

      <div className="relative z-10 max-w-3xl">
        {/* Large open quote */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gold/20 font-serif leading-none select-none"
          style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', lineHeight: 0.8, marginBottom: '0.25em' }}
        >
          "
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-bold leading-snug"
          style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)' }}
        >
          모든 프로젝트에서{' '}
          <span className="text-gold">최고의 결과물</span>을 만들어냅니다.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/38 text-sm md:text-base mt-4 leading-relaxed max-w-xl"
        >
          데이터 기반의 전략과 창의적인 실행으로 브랜드의 성장을 이끕니다.
          수치는 거짓말하지 않습니다.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex items-center gap-3 mt-7"
        >
          <div className="w-8 h-px bg-gold/55" />
          <p className="text-gold/55 text-[10px] font-black tracking-[0.35em] uppercase">PIXEL-LOG</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function StatsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const doubled = [...MARQUEE, ...MARQUEE];

  return (
    <section className="relative bg-navy overflow-hidden">

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{ left: `${p.x}%`, bottom: 0, width: p.s, height: p.s }}
            animate={{ y: [0, -700], opacity: [0, 0.45, 0.45, 0] }}
            transition={{
              duration: p.t,
              delay: p.d,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.06, 0.88, 1],
            }}
          />
        ))}
      </div>

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden
      />

      <div className="absolute top-0 inset-x-0 h-px bg-white/10" />

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-24">

        {/* Title */}
        <div ref={titleRef} className="mb-14 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-gold/65 text-[10px] font-bold tracking-[0.38em] uppercase mb-5"
          >
            ACHIEVEMENT
          </motion.p>
          {['수치로 보는', '픽셀로그의 성과'].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                animate={titleInView ? { y: '0%' } : {}}
                transition={{ duration: 1.0, delay: 0.08 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className={`font-black pb-1 leading-none ${i === 1 ? 'text-gold' : 'text-white'}`}
                style={{ fontSize: 'clamp(2.6rem, 6vw, 5.5rem)' }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Primary 4 stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          <StatCard number={150} suffix="+"   label="완료 프로젝트"     sublabel="Completed Projects" delay={0.10} dir="left" />
          <StatCard number={98}  suffix="%"   label="고객 만족도"       sublabel="Client Satisfaction" delay={0.18} />
          <StatCard number={300} suffix="%"   label="유입 트래픽 성장"  sublabel="Avg. Traffic Growth"  delay={0.26} />
          <StatCard number={5}   suffix="년+" label="전문 업력"         sublabel="Years of Experience"  delay={0.34} dir="right" />
        </div>

        {/* Secondary stat strip */}
        <div className="mt-3 md:mt-4 lg:mt-5 flex justify-center border border-white/[0.09] bg-white/[0.03]">
          <MiniStat number={500} suffix="+" label="제작 콘텐츠" sublabel="Content Produced" delay={0.48} />
        </div>

        {/* Timeline */}
        <Timeline />

        {/* Two-column row: skill bars + feature quote */}
        <div className="mt-4 lg:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-5 items-stretch">
          <SkillBars />
          <FeatureQuote />
        </div>

      </div>

      {/* ── Marquee ── */}
      <div className="border-t border-white/10">
        <div className="relative py-5 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex overflow-hidden select-none">
            <motion.div
              className="flex items-center shrink-0"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' } }}
            >
              {doubled.map((word, i) => (
                <span key={`m-${i}`} className="flex items-center shrink-0">
                  <span className={`text-sm md:text-base lg:text-lg font-bold tracking-[0.2em] uppercase px-4 lg:px-6 ${
                    i % MARQUEE.length % 4 === 0 ? 'text-white' :
                    i % 2 === 0 ? 'text-white/60' : 'text-white/28'
                  }`}>{word}</span>
                  <span className="text-gold/55 text-xs">&#x2726;</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />
    </section>
  );
}
