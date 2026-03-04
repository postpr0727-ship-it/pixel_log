'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Palette, Code, Video, TrendingUp, Megaphone, Lightbulb } from 'lucide-react';

const services = [
  {
    id: 'design',
    icon: Palette,
    number: '01',
    title: '디자인',
    titleEn: 'DESIGN',
    description: '브랜드의 정체성을 시각적으로 표현합니다. 로고부터 명함, 웹사이트까지.',
    href: '/design',
    items: ['브랜드 디자인', '웹 디자인', 'UI/UX'],
    gridClass: 'lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2',
    image: '/images/service-design.png',
    gradient: 'from-violet-600/80 to-indigo-900/80',
  },
  {
    id: 'blog',
    icon: TrendingUp,
    number: '02',
    title: '블로그 마케팅',
    titleEn: 'MARKETING',
    description: '네이버 공식 "이달의 블로그" 마케터가 직접 운영합니다. 검색 최적화된 콘텐츠로 잠재 고객을 자연스럽게 유입시키고, 브랜드 인지도를 높여드립니다.',
    href: '/blog',
    items: ['상위 노출', '키워드 최적화', '브랜딩', '콘텐츠 기획', '리뷰 마케팅'],
    gridClass: 'lg:col-span-3 lg:row-span-2 md:col-span-2 md:row-span-2',
    image: '/images/service-marketing.png',
    gradient: 'from-emerald-600/80 to-teal-900/80',
  },
  {
    id: 'ad',
    icon: Megaphone,
    number: '03',
    title: '온라인 광고',
    titleEn: 'ADVERTISING',
    description: '타겟 맞춤형 퍼포먼스 마케팅.',
    href: '/online_ad',
    items: ['DA', 'SA', 'SNS'],
    gridClass: 'lg:col-span-1 lg:row-span-2 md:col-span-1 md:row-span-2',
    image: '/images/service-ad.png',
    gradient: 'from-orange-600/80 to-amber-900/80',
  },
  {
    id: 'dev',
    icon: Code,
    number: '04',
    title: '웹 개발',
    titleEn: 'DEVELOPMENT',
    description: '최신 기술 스택으로 구축하는 고성능 웹사이트.',
    href: '/dev',
    items: ['Next.js', 'React', 'Full-stack'],
    gridClass: 'lg:col-span-2 md:col-span-2',
    image: '/images/service-dev.png',
    gradient: 'from-blue-600/80 to-cyan-900/80',
  },
  {
    id: 'video',
    icon: Video,
    number: '05',
    title: '영상 제작',
    titleEn: 'VIDEO',
    description: '트렌디한 모션그래픽과 영상 편집.',
    href: '/video',
    items: ['홍보영상', '유튜브', '숏폼'],
    gridClass: 'lg:col-span-2 md:col-span-1',
    image: '/images/service-video.png',
    gradient: 'from-rose-600/80 to-pink-900/80',
  },
  {
    id: 'consulting',
    icon: Lightbulb,
    number: '06',
    title: '브랜드 컨설팅',
    titleEn: 'CONSULTING',
    description: '비즈니스 성장을 위한 맞춤형 전략 수립.',
    href: '/about',
    items: ['시장분석', '사업전략'],
    gridClass: 'lg:col-span-2 md:col-span-2',
    image: '/images/service-consulting.png',
    gradient: 'from-gold-600/80 to-yellow-900/80',
  },
];

function BentoCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isImageCard = !!service.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-3xl border border-border/40 bg-white/50 backdrop-blur-sm hover:border-gold/50 transition-colors duration-500 ${service.gridClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={service.href} className="block h-full w-full">
        {/* Background Image (if available) */}
        {service.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={`object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'
                }`}
            />
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} mix-blend-multiply opacity-90 transition-opacity duration-500 group-hover:opacity-80`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Gradient for non-image cards */}
        {!service.image && (
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-70`} />
        )}

        {/* Content Container */}
        <div className={`relative z-10 p-6 lg:p-8 flex flex-col h-full ${isImageCard ? 'text-white' : 'text-navy'
          }`}>

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${isImageCard ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white border border-border'} transition-transform duration-300 group-hover:scale-110`}>
              <service.icon className={`w-6 h-6 ${isImageCard ? 'text-white' : 'text-navy'}`} />
            </div>
            <span className={`text-5xl font-black ${isImageCard ? 'text-gold/25' : 'text-gold/20'}`}>
              {service.number}
            </span>
          </div>

          <div className="mt-auto">
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-1 block ${isImageCard ? 'text-white/70' : 'text-navy/50'
              }`}>
              {service.titleEn}
            </span>
            <h3 className={`text-2xl lg:text-3xl font-bold mb-3 ${isImageCard ? 'text-white' : 'text-navy'
              }`}>
              {service.title}
            </h3>
            <p className={`text-sm lg:text-base leading-relaxed mb-6 line-clamp-3 ${isImageCard ? 'text-white/80' : 'text-muted-foreground'
              }`}>
              {service.description}
            </p>

            {/* Tags/Items */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.items.map((item) => (
                <span key={item} className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${isImageCard
                  ? 'bg-white/10 border-white/20 text-white/90'
                  : 'bg-white/50 border-navy/5 text-navy/70'
                  }`}>
                  {item}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 group/btn">
              <div className="w-0.5 h-4 bg-gold/60 rounded-full" />
              <span className={`text-sm font-semibold ${isImageCard ? 'text-white' : 'text-navy'}`}>
                자세히 보기
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover/btn:w-10 group-hover/btn:bg-gold ${isImageCard ? 'bg-white/20 text-white' : 'bg-navy/5 text-navy'
                }`}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ServiceSection() {
  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            OUR SERVICES
          </span>
          <h2 className="section-title text-navy mt-2 mb-4">
            비즈니스 성장을 위한 <br className="md:hidden" />
            <span className="relative inline-block">
              원스톱 솔루션
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            디자인, 개발, 마케팅, 영상까지. PIXEL-LOG가 가장 잘하는 일들입니다.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[260px] gap-4 lg:gap-5">
          {services.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
