'use client';

import { motion } from 'framer-motion';
import { Globe, Code2, Check } from 'lucide-react';

const devServices = [
  {
    icon: Globe,
    category: '홈페이지 제작',
    categoryEn: 'WEBSITE DEVELOPMENT',
    accentColor: '#4A7EC7',
    description: '비즈니스의 온라인 얼굴을 만듭니다. 모든 기기에서 최적화된 반응형 웹사이트로 첫인상부터 신뢰를 전달합니다.',
    items: [
      '기업 · 개인 홈페이지 제작',
      '쇼핑몰 & 이커머스 구축',
      '랜딩페이지 & 원페이저',
      '예약 · 회원 관리 시스템',
      'Next.js / React 기반 개발',
      'SEO 최적화 & 보안 인증서',
    ],
  },
  {
    icon: Code2,
    category: '프로그램 개발',
    categoryEn: 'SOFTWARE DEVELOPMENT',
    accentColor: '#7B5EA7',
    description: '반복 업무를 자동화하고 데이터를 체계적으로 관리합니다. 비즈니스 규모에 꼭 맞는 맞춤형 솔루션을 개발합니다.',
    items: [
      '업무 자동화 프로그램',
      'ERP · CRM · 재고관리 시스템',
      '데이터 수집 · 정리 · 분석 툴',
      'API 연동 및 외부 서비스 통합',
      '웹 기반 관리자 대시보드',
      '윈도우 데스크탑 애플리케이션',
    ],
  },
];

export function DevServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.04] pointer-events-none" />
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
            DEV SERVICES
          </span>
          <h2 className="section-title text-white font-black italic tracking-tighter mb-4">
            개발 서비스 영역
          </h2>
          <p className="text-white/55 max-w-xl mx-auto font-medium leading-relaxed">
            웹사이트 구축부터 맞춤형 소프트웨어까지 — 비즈니스 성장을 기술로 뒷받침합니다.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {devServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.category}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="group relative bg-white/5 border border-white/8 rounded-3xl overflow-hidden hover:bg-white/8 hover:border-white/20 transition-all duration-400"
              >
                {/* Top accent */}
                <div
                  className="h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ backgroundColor: service.accentColor }}
                />

                <div className="p-8 lg:p-10 flex flex-col h-full">
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
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-auto">
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
