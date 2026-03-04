'use client';

import { motion } from 'framer-motion';
import { Palette, Globe, Printer, Check } from 'lucide-react';

const designServices = [
  {
    icon: Palette,
    category: '브랜드 디자인',
    categoryEn: 'BRAND IDENTITY',
    accentColor: '#D4AF37',
    description: '브랜드의 핵심 가치를 시각적 언어로 구축합니다. 로고 하나에서 시작해 모든 접점에서 일관된 브랜드 경험을 만들어냅니다.',
    items: [
      '로고 디자인 & 심볼 마크',
      '브랜드 컬러 & 타이포그래피 시스템',
      '명함 · 레터헤드 · 봉투 디자인',
      '브랜드 가이드라인 제작',
      '패키지 & 굿즈 디자인',
    ],
  },
  {
    icon: Globe,
    category: '웹 디자인',
    categoryEn: 'WEB DESIGN',
    accentColor: '#4A7EC7',
    description: '사용자 경험을 최우선으로 설계된 반응형 웹 디자인으로 온라인에서의 브랜드 존재감을 높입니다.',
    items: [
      '반응형 웹사이트 UI 디자인',
      'UX 설계 & 와이어프레임',
      '랜딩페이지 & 프로모션 페이지',
      '쇼핑몰 & 이커머스 UI',
      '웹 배너 & 디지털 소재',
    ],
  },
  {
    icon: Printer,
    category: '인쇄 디자인',
    categoryEn: 'PRINT DESIGN',
    accentColor: '#2A9E5C',
    description: '디지털이 대체할 수 없는 오프라인 접점을 디자인합니다. 인쇄물이 브랜드의 실체감을 전달합니다.',
    items: [
      '리플렛 · 브로셔 · 카탈로그',
      '포스터 · 현수막 · 배너',
      '명함 · 스티커 · 스탬프',
      '메뉴판 · 안내판 · 사인물',
      '초대장 · 카드 · 봉투 디자인',
    ],
  },
];

export function DesignServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.04] pointer-events-none" />
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-white/40 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            DESIGN SERVICES
          </span>
          <h2 className="section-title text-white font-black italic tracking-tighter mb-4">
            디자인 서비스 영역
          </h2>
          <p className="text-white/55 max-w-xl mx-auto font-medium leading-relaxed">
            브랜딩부터 웹, 인쇄까지 — 모든 접점에서 브랜드가 일관되게 빛날 수 있도록 설계합니다.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {designServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className="group relative bg-white/5 border border-white/8 rounded-3xl overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-400"
              >
                {/* Top accent */}
                <div
                  className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div className="p-8 flex flex-col h-full">
                  {/* Icon + Category */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-400"
                      style={{ backgroundColor: `${service.accentColor}22` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: service.accentColor }}
                      />
                    </div>
                    <div>
                      <p className="text-white font-black text-xl leading-tight">{service.category}</p>
                      <p className="text-white/30 text-[10px] font-bold tracking-[0.25em] uppercase mt-0.5">
                        {service.categoryEn}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/55 text-sm leading-relaxed font-medium mb-7">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <ul className="space-y-2.5 mt-auto">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check
                          className="h-3.5 w-3.5 flex-shrink-0 opacity-70"
                          style={{ color: service.accentColor }}
                        />
                        <span className="text-white/65 text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
