'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Lightbulb, Users, Zap, Mail } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: '목표 지향',
    description: '작업의 목적을 먼저 이해합니다. 보기 좋은 것보다 효과 있는 것을 만드는 데 집중합니다.',
  },
  {
    icon: Lightbulb,
    title: '멀티 스킬',
    description: '디자인, 개발, 광고, 영상을 혼자 소화합니다. 기획부터 완성까지 일관된 시각으로 작업합니다.',
  },
  {
    icon: Users,
    title: '실무 중심',
    description: '실제 프로젝트를 통해 쌓은 실무 경험이 바탕입니다. 이론보다 현장에서 체득한 것을 더 신뢰합니다.',
  },
  {
    icon: Zap,
    title: '빠른 실행력',
    description: '아이디어를 빠르게 구현합니다. 완벽보다 실행을 우선하고, 피드백으로 완성해 나갑니다.',
  },
];

const certs = [
  { label: 'GTQ 1급', org: '한국생산성본부' },
  { label: '검색광고마케터 1급', org: 'KAIT' },
  { label: 'AI-PDTQ', org: '한국인공지능협회' },
];

export function AboutContent() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Story ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 lg:mb-20 max-w-2xl"
        >
          <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            ABOUT ME
          </span>
          <h2 className="section-title text-navy mt-2 mb-2 font-black italic tracking-tighter uppercase leading-none">
            김경훈
          </h2>
          <p className="text-gold font-black text-lg tracking-wide mb-8 uppercase">
            Designer · Developer · Marketer · Creator
          </p>
          <div className="space-y-5 text-navy/70 leading-relaxed font-bold italic text-lg">
            <p>
              PIXEL-LOG는 &ldquo;픽셀(Pixel)&rdquo;과 &ldquo;기록(Log)&rdquo;의 합성어입니다.
              디지털 세상의 가장 작은 단위인 픽셀 하나하나에 정성을 담아
              작업 하나하나를 기록해온 개인 포트폴리오입니다.
            </p>
            <p>
              한 사람이 기획, 디자인, 개발, 마케팅을 모두 다룰 수 있다는 것,
              그것이 제 가장 큰 강점입니다.
            </p>
          </div>
        </motion.div>

        {/* ── Editorial Photo Card ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2rem] overflow-hidden shadow-2xl mb-24 lg:mb-32"
          style={{ aspectRatio: '16/7' }}
        >
          {/* Photo */}
          <Image
            src="/images/profile2.png"
            alt="김경훈"
            fill
            className="object-cover object-right-top"
            priority
          />

          {/* Right-side vignette — keeps person visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101F] via-[#08101F]/60 to-transparent" />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08101F]/80 via-transparent to-transparent" />

          {/* Gold top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold/60 to-transparent" />

          {/* Left content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-gold/80 text-[10px] font-black tracking-[0.4em] uppercase">
                Portfolio · 2025
              </span>
              <span className="text-white/30 text-[10px] font-black tracking-[0.3em] uppercase hidden lg:block">
                PIXEL-LOG
              </span>
            </div>

            {/* Center — name block */}
            <div className="max-w-md">
              {/* Vertical skill tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['Design', 'Development', 'Marketing', 'Video'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black tracking-widest uppercase text-white/50 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-white font-black tracking-tighter leading-none mb-1"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
                김경훈
              </h3>
              <p className="text-gold font-black text-sm lg:text-base tracking-[0.2em] uppercase mt-2">
                Kim Kyung-Hun
              </p>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              {/* Cert badges */}
              <div className="flex flex-wrap gap-2">
                {certs.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-black text-white/80 tracking-wide"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {c.label}
                  </span>
                ))}
              </div>

              {/* Stat + email */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-gold font-black text-2xl lg:text-3xl leading-none">15+</p>
                  <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">Years</p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <a
                  href="mailto:postpr0727@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">postpr0727@gmail.com</span>
                  <span className="sm:hidden">Contact</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Values ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            MY VALUES
          </span>
          <h2 className="section-title text-navy mt-2 font-black italic tracking-tighter uppercase">
            제가 일하는 방식
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-navy/5 flex items-center justify-center mb-8 group-hover:bg-navy/10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <value.icon className="h-10 w-10 text-navy" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 italic uppercase tracking-tight">{value.title}</h3>
              <p className="text-navy/60 text-base leading-relaxed font-bold italic break-keep">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
