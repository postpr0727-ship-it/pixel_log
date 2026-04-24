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

        {/* ── Story + Photo ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 lg:mb-32"
        >
          {/* Text */}
          <div>
            <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
              ABOUT ME
            </span>
            <h2 className="section-title text-navy mt-2 mb-2 font-black italic tracking-tighter uppercase leading-none">
              김경훈
            </h2>
            <p className="text-gold font-black text-lg tracking-wide mb-8 uppercase">
              Designer · Developer · Marketer · Creator
            </p>
            <div className="space-y-6 text-navy/70 leading-relaxed font-bold italic text-lg">
              <p>
                PIXEL-LOG는 &ldquo;픽셀(Pixel)&rdquo;과 &ldquo;기록(Log)&rdquo;의 합성어입니다.<br className="hidden lg:block" />
                디지털 세상의 가장 작은 단위인 픽셀 하나하나에 정성을 담아<br className="hidden lg:block" />
                작업 하나하나를 기록해온 개인 포트폴리오입니다.
              </p>
              <p>
                브랜드 디자인부터 웹 개발, 온라인 광고, 블로그 마케팅, 영상 제작까지
                다양한 분야의 실무 경험을 쌓아왔습니다.
              </p>
              <p>
                한 사람이 기획, 디자인, 개발, 마케팅을 모두 다룰 수 있다는 것,
                그것이 제 가장 큰 강점입니다.
              </p>
            </div>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-2 mt-8">
              {certs.map((c) => (
                <span
                  key={c.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-black text-navy/70 tracking-wide"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {c.label}
                  <span className="text-navy/40 font-medium">· {c.org}</span>
                </span>
              ))}
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="mailto:postpr0727@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-navy text-white text-sm font-black hover:bg-navy/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                postpr0727@gmail.com
              </a>
            </div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative bg */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-navy/10 to-gold/10 translate-x-4 translate-y-4 -z-10" />
              <div className="w-72 h-80 lg:w-80 lg:h-[420px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/images/profile.png"
                  alt="김경훈"
                  width={320}
                  height={420}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
              {/* Name tag */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-navy text-white px-6 py-2.5 rounded-full shadow-xl whitespace-nowrap">
                <span className="text-sm font-black tracking-wider">김경훈 · PIXEL-LOG</span>
              </div>
            </div>
          </motion.div>
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
