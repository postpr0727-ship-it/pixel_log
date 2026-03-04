'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy/90 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50 z-10" />
        <motion.div
          className="relative w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <Image
            src="/images/hero-bg.png"
            alt="Design Meeting Background"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        </motion.div>
      </div>

      {/* Animated background elements (Overlay) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-navy-light/30 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-10 hover:bg-white/10 transition-colors cursor-default"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              디자인 · 개발 · 마케팅 원스톱 솔루션
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="hero-title text-white mb-8 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: 'easeOut' }}
          >
            당신의 비즈니스를
            <br />
            <span className="text-gradient-gold drop-shadow-sm">픽셀 하나까지</span> 완벽하게
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed tracking-wide font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            브랜드 아이덴티티부터 웹사이트 개발, 독창적인 마케팅까지.
            <br className="hidden sm:block" />
            비즈니스 성장에 필요한 모든 크리에이티브를 제공합니다.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-light text-navy font-bold px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:scale-105 transition-all duration-300 animate-pulse-subtle"
            >
              <Link href="/contact">
                무료 상담 신청하기
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-7 text-lg rounded-2xl transition-all duration-300"
            >
              <Link href="/about">PIXEL-LOG 스토리</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-[26px] h-11 border-2 border-white/20 rounded-full flex items-start justify-center p-1.5 backdrop-blur-sm"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
