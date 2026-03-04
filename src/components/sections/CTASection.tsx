'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-navy relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

      {/* Decorative lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/5 backdrop-blur-md border border-white/10 p-12 lg:p-16 rounded-[2.5rem] shadow-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold mb-8 shadow-lg"
          >
            <MessageCircle className="h-4 w-4 text-navy" />
            <span className="text-navy text-xs font-black tracking-widest uppercase">
              Get in touch
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-6 tracking-tight">
            당신의 프로젝트를 위한<br />
            <span className="text-gold italic font-black">완벽한 파트너</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed font-medium">
            비즈니스 성장에 필요한 모든 디자인과 개발 전략을<br className="hidden sm:block" />
            데이터와 감각에 기반하여 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-white text-navy font-bold px-12 py-8 text-xl rounded-2xl shadow-xl shadow-gold/20 transition-all duration-300 group"
            >
              <Link href="/contact">문의하기</Link>
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm italic font-medium">
              PIXEL-LOG는 준앤준솔루션의 디자인 전문 레이블입니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
