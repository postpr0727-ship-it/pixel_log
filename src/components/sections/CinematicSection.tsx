'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Each title line slides up from behind an overflow-hidden clip
function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="overflow-hidden leading-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
    >
      <motion.div
        variants={{
          hidden: { y: '108%' },
          visible: {
            y: '0%',
            transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const achievements = [
  {
    stat: '0.0003%',
    context: '전체 3,300만 개 중',
    label: '네이버 블로그 상위',
    delay: 0.55,
  },
  {
    stat: '2024',
    context: '네이버 공식',
    label: '올해의 블로그 수상',
    delay: 0.67,
  },
  {
    stat: '이달의\n블로그',
    context: '동시 선정',
    label: '월간 공식 전문가 인증',
    delay: 0.79,
  },
];

export function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Giant background text drifts on scroll (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#060C18] flex items-center overflow-hidden"
    >
      {/* ── Giant faded "PIXEL" background text ── */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-black uppercase tracking-widest text-white will-change-transform"
          style={{ fontSize: 'clamp(10rem, 28vw, 28rem)', lineHeight: 0.85, opacity: 0.022 }}
        >
          PIXEL
        </span>
      </motion.div>

      {/* ── Ambient glow blobs ── */}
      <div
        aria-hidden
        className="absolute top-0 left-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,160,86,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,130,200,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 xl:px-24 py-28 lg:py-36">

        {/* Section tag */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-bold tracking-[0.4em] uppercase mb-10"
          style={{ color: 'rgba(212,160,86,0.65)' }}
        >
          ACHIEVEMENT
        </motion.p>

        {/* Cinematic title lines */}
        <div className="mb-14 lg:mb-20 space-y-1">
          <RevealLine delay={0.08}>
            <p
              className="text-white/88 font-light"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 8.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              압도적인 성과를
            </p>
          </RevealLine>
          <RevealLine delay={0.2}>
            <p
              className="text-white/88 font-light"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 8.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              만들어내는
            </p>
          </RevealLine>
          <RevealLine delay={0.32}>
            <p
              className="font-black italic"
              style={{ fontSize: 'clamp(3rem, 7.5vw, 8.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: '#D4A056' }}
            >
              픽셀로그
            </p>
          </RevealLine>
        </div>

        {/* Animated rule line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
          className="h-px origin-left mb-14 lg:mb-20"
          style={{ background: 'linear-gradient(to right, #D4A056 0%, rgba(212,160,86,0.3) 55%, transparent 100%)' }}
        />

        {/* Achievement stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16">
          {achievements.map((a) => (
            <motion.div
              key={a.stat}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: a.delay, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-1.5 pl-5 border-l"
              style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <span
                className="font-black text-white whitespace-pre-line"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
              >
                {a.stat}
              </span>
              <span
                className="text-[10px] font-bold tracking-[0.3em] uppercase mt-1"
                style={{ color: 'rgba(255,255,255,0.32)' }}
              >
                {a.context}
              </span>
              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {a.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
