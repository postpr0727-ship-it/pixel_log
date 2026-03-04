'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Layers, ChevronRight } from 'lucide-react';

const serviceAreas = [
  { name: '디자인', sub: '브랜딩 · 웹 · 인쇄' },
  { name: '웹 개발', sub: '홈페이지 · 쇼핑몰 · 시스템' },
  { name: '블로그 마케팅', sub: '포스팅 · SEO · 운영 대행' },
  { name: '온라인 광고', sub: '키워드 · SNS · 퍼포먼스' },
  { name: '영상 제작', sub: '기획 · 촬영 · 편집' },
];

const steps = [
  { num: '01', title: '문의 접수', desc: '상담 신청서 또는 이메일로 프로젝트 개요를 알려주세요.' },
  { num: '02', title: '요구사항 파악', desc: '작업 범위, 일정, 목표를 함께 구체화합니다.' },
  { num: '03', title: '맞춤 견적 안내', desc: '규모에 맞는 합리적인 견적을 제안드립니다.' },
  { num: '04', title: '계약 및 착수', desc: '일정과 조건을 확정하고 바로 시작합니다.' },
];

export function PricingSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-navy/50 text-sm font-black tracking-widest uppercase mb-4 block">
            PRICING
          </span>
          <h2 className="section-title text-navy mt-2 mb-6 font-black italic">서비스 요금 안내</h2>
          <p className="text-navy/65 max-w-2xl mx-auto font-medium leading-relaxed">
            요금은 <strong className="text-navy font-black">작업 규모와 요구사항을 충분히 협의한 후</strong> 결정됩니다.
            <br className="hidden sm:block" />
            동일한 서비스라도 프로젝트의 성격과 범위에 따라 달라지기 때문에,
            <br className="hidden sm:block" />
            먼저 상담을 통해 정확한 방향을 함께 잡아드립니다.
          </p>
        </motion.div>

        {/* Main message card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-2xl bg-navy text-white p-10 md:p-14 mb-8"
        >
          {/* Background accent */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 left-8 w-40 h-40 rounded-full bg-gold/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-5 w-5 text-gold" />
                <span className="text-gold text-xs font-black tracking-[0.3em] uppercase">협의 후 진행</span>
              </div>
              <p className="text-2xl md:text-3xl font-black leading-snug mb-4">
                정해진 가격표 없이,<br />
                <span className="text-gold">프로젝트에 맞는 금액</span>을 함께 결정합니다.
              </p>
              <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-lg">
                작업 난이도, 분량, 납기, 브랜드 방향성 등 다양한 요소를 반영해
                합리적이고 투명한 견적을 제안드립니다.
                불필요한 비용 없이, 꼭 필요한 만큼만 진행합니다.
              </p>
            </div>

            {/* Service list */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-gold/70" />
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">제공 서비스</span>
              </div>
              <ul className="space-y-2.5">
                {serviceAreas.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <ChevronRight className="h-4 w-4 text-gold/60 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white/90 text-sm font-bold">{s.name}</span>
                      <span className="text-white/35 text-xs ml-2">{s.sub}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="relative rounded-xl border border-navy/10 bg-white p-6 hover:border-navy/25 hover:shadow-sm transition-all duration-300"
            >
              <p className="text-gold font-black text-xs tracking-[0.2em] mb-3">{step.num}</p>
              <p className="text-navy font-black text-base mb-2">{step.title}</p>
              <p className="text-navy/50 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-navy/40 text-sm font-medium">
            PIXEL-LOG는 준앤준솔루션의 전문 디자인/개발 브랜드입니다.
            <span className="block mt-1 text-navy/30 text-xs">(계약 및 세금계산서 발행: 준앤준솔루션)</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
