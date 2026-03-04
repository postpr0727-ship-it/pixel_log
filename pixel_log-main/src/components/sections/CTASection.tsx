'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 gradient-hero relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-gold/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Gold corner accents */}
        <div className="absolute top-0 left-4 sm:left-6 lg:left-8 w-12 h-12 border-t-2 border-l-2 border-gold/30 rounded-tl-lg pointer-events-none" />
        <div className="absolute bottom-0 right-4 sm:right-6 lg:right-8 w-12 h-12 border-b-2 border-r-2 border-gold/30 rounded-br-lg pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/20 mb-8">
            <MessageCircle className="h-8 w-8 text-gold" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mb-6" />

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            무료 상담을 통해 귀사의 비즈니스에 최적화된 솔루션을 제안해 드립니다.
            <br className="hidden sm:block" />
            지금 바로 문의해 주세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="relative bg-gold hover:bg-gold-light text-navy font-bold px-12 py-8 text-xl rounded-2xl shadow-2xl shadow-gold/40 hover:shadow-gold/60 transition-all duration-300 hover:scale-105 animate-pulse-subtle"
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
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-base rounded-xl transition-all"
            >
              <a href="mailto:postpr0727@gmail.com">이메일 문의하기</a>
            </Button>
          </div>

          <div className="mt-12 inline-block bg-white/5 backdrop-blur-sm px-8 py-5 rounded-2xl border border-white/10">
            <p className="text-gold text-base font-semibold mb-2">
              PIXEL-LOG는 준앤준솔루션의 전문 디자인/개발 브랜드입니다.
            </p>
            <p className="text-white/60 text-sm text-center">
              계약 및 세금계산서 발행은 <strong>준앤준솔루션</strong> 명의로 진행됩니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
