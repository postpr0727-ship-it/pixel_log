'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function MainHero() {
  return (
    <section id="main-hero" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-navy">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="Pixellog Hero"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Premium Gradient Overlay instead of Blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-navy/20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-navy/80" />
      </div>

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.2]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            className="flex-1 text-center lg:text-left mx-auto max-w-3xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 shadow-lg"
            >
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-black tracking-widest uppercase">
                PIXEL-LOG · Creative Label
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-white mb-6 tracking-tight font-black leading-[1.15] break-keep drop-shadow-md"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              We Make Your Brand
              <br />
              <span className="italic text-gold">Impossible to Ignore.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-medium break-keep drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="block text-white font-black text-lg md:text-2xl tracking-tight mb-3">
                브랜드를 완성하는<br className="block md:hidden" /> 크리에이티브 레이블, <span className="text-gold">픽셀로그</span>.
              </span>
              브랜드가 단순히 보이는 것을 넘어 <span className="text-gold font-black">기억되고 선택받을</span> 수 있도록 —<br className="hidden md:block" />{' '}
              <span className="text-gold font-black">디자인, 개발, 마케팅, 영상</span>의 모든 접점을 정교하게 설계합니다.
            </motion.p>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
