'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainHero() {
  return (
    <section id="main-hero" className="relative min-h-[90vh] lg:min-h-screen flex items-start justify-center overflow-hidden bg-navy">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 lg:pt-48 pb-16 lg:pb-20 w-full">
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
                Design Studio Label
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
              진정한 고퀄리티의 미학,
              <br />
              <span className="italic">Pixellog</span> 작업 사례를 확인하세요
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-white/85 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-medium break-keep drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              준앤준솔루션의 디자인 레이블 '픽셀로그'는 디테일과 감각이 살아있는
              최상의 결과물을 지향합니다.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gold hover:bg-white text-navy font-bold px-10 py-8 text-xl rounded-2xl shadow-xl shadow-gold/20 transition-all duration-300 group"
              >
                <Link href="#services">
                  작업 사례 보기
                  <ChevronDown className="ml-2 h-6 w-6 transition-transform group-hover:translate-y-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
