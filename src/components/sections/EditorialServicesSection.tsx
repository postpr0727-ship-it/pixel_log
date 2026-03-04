'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    number: '01',
    tag: 'DESIGN',
    title: '브랜딩부터\n웹까지',
    description:
      '브랜드의 정체성을 시각적으로 표현합니다. 로고, 명함, 웹사이트 디자인, UI/UX까지 일관된 브랜드 경험을 만들어드립니다.',
    image: '/images/222.png',
    href: '/design',
    bg: '#F7F5F0',
    dark: false,
    imageLeft: false,
  },
  {
    number: '02',
    tag: 'MARKETING',
    title: '검색 상위\n노출 전략',
    description:
      '3,300만 개 중 상위 0.0003% "2024년 올해의 블로그" 및 전체 상위 1% 네이버 공식 "이달의 블로그"에 동시 선정된 전문가가 압도적인 트래픽을 만들어냅니다.',
    image: '/images/service-marketing.png',
    href: '/blog',
    bg: '#0B1222',
    dark: true,
    imageLeft: true,
  },
  {
    number: '03',
    tag: 'ADVERTISING',
    title: '타겟 맞춤형\n퍼포먼스',
    description:
      '데이터 기반의 정밀 타겟팅으로 광고 효율을 극대화합니다. DA, SA, SNS 광고로 최적의 전환율을 달성합니다.',
    image: '/images/333.png',
    href: '/online_ad',
    bg: '#EEF1F7',
    dark: false,
    imageLeft: false,
  },
  {
    number: '04',
    tag: 'DEVELOPMENT',
    title: '모던 웹\n솔루션',
    description:
      'Next.js, React 등 최신 기술 스택으로 구축하는 고성능 웹사이트. 빠르고 확장 가능한 풀스택 개발.',
    image: '/images/service-dev-new.png',
    href: '/dev',
    bg: '#1A2840',
    dark: true,
    imageLeft: true,
  },
  {
    number: '05',
    tag: 'VIDEO',
    title: '스토리를\n담은 영상',
    description:
      '트렌디한 모션그래픽과 감성적인 영상 편집. 홍보영상, 유튜브 콘텐츠, 숏폼까지 브랜드 메시지를 영상으로 전달합니다.',
    image: '/images/service-video-final.png',
    href: '/video',
    bg: '#F7F1EE',
    dark: false,
    imageLeft: false,
  },
];

type ServiceItem = (typeof services)[0];

// Stagger variant: custom(i) → delay = i * 0.09s
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function ServiceCard({ service }: { service: ServiceItem }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { dark, imageLeft, tag, number, title, description, image, href, bg } = service;

  const textColor = dark ? '#FFFFFF' : '#0B1222';
  const tagColor = dark ? 'rgba(255,255,255,0.42)' : 'rgba(11,18,34,0.42)';
  const descColor = dark ? 'rgba(255,255,255,0.62)' : 'rgba(11,18,34,0.62)';
  const lineColor = dark ? '#FFFFFF' : '#0B1222';

  // Parallax: image drifts opposite to scroll direction
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // scale: 1.2 gives 10% buffer on each side; y travels ±8% of element's own height
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ backgroundColor: bg }}
    >
      {/* ── Image column ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`relative w-full min-h-[60vw] sm:min-h-[50vw] lg:min-h-0 lg:flex-1 overflow-hidden ${imageLeft ? '' : 'lg:order-2'
          }`}
      >
        {/* Parallax wrapper — scaled up slightly to hide edges during translate */}
        {/* MARKETING uses solid bg so no scale needed (scale:1.2 would clip badges) */}
        {/* DESIGN, DEVELOPMENT, and VIDEO use specific generated images that shouldn't be zoomed-in */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: imageY, scale: tag === 'MARKETING' || tag === 'DESIGN' || tag === 'DEVELOPMENT' || tag === 'VIDEO' ? 1 : 1.2 }}
        >
          {tag === 'MARKETING' ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0B1222] overflow-hidden group">
              {/* Sophisticated Background Effects */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Modern Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#D4A056_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />

                {/* Ambient Glows */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#D4A056]/10 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[80px]" />

                {/* Central Spotlight */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D4A056]/5 rounded-full blur-[100px]" />
              </div>

              {/* Badges Container */}
              <div className="relative z-10 flex flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-14 px-4 sm:px-6 lg:px-10 py-6 w-full h-full max-w-3xl mx-auto">

                {/* Month Badge */}
                <div className="relative flex-1 min-w-0 max-w-[280px] flex flex-col items-center animate-float z-20" style={{ animationDelay: '0.2s' }}>
                  <div className="absolute inset-0 bg-[#D4A056]/20 blur-[50px] rounded-full scale-75 group-hover:scale-110 transition-transform duration-700" />
                  <Image
                    src="/images/naver-blog-month-badge.png"
                    alt="Naver Blog of the Month"
                    width={400}
                    height={437}
                    className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] object-contain hover:scale-105 transition-transform duration-500"
                  />
                  {/* Ground Shadow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/50 blur-xl rounded-[100%]" />
                </div>

                {/* 2024 Year Badge */}
                <div className="relative flex-1 min-w-0 max-w-[320px] flex flex-col items-center animate-float z-10" style={{ animationDelay: '0.6s' }}>
                  <div className="absolute inset-0 bg-[#D4A056]/20 blur-[50px] rounded-full scale-75 group-hover:scale-110 transition-transform duration-700" />
                  <Image
                    src="/images/naver-blog-award-2024.png"
                    alt="2024 Naver Blog of the Year"
                    width={400}
                    height={437}
                    className="relative w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] brightness-110 object-contain hover:scale-105 transition-transform duration-500"
                  />
                  {/* Ground Shadow */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/50 blur-xl rounded-[100%]" />
                </div>

              </div>
            </div>
          ) : (
            <Image
              src={image}
              alt={tag}
              fill
              className={
                tag === 'ADVERTISING' ? "object-cover bg-[#EEF1F7]" :
                  tag === 'DESIGN' ? "object-cover object-[80%_center]" :
                    "object-cover"
              }
              sizes={
                (tag === 'DESIGN' || tag === 'ADVERTISING' || tag === 'DEVELOPMENT' || tag === 'VIDEO') ? "100vw" : "(max-width: 1024px) 100vw, 50vw"
              }
              quality={100}
            />
          )}
        </motion.div>
      </motion.div>

      {/* ── Text column ── */}
      <div
        className={`flex flex-col justify-center lg:flex-1 px-8 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0 ${imageLeft ? '' : 'lg:order-1'
          }`}
      >
        {/* 1. Category tag */}
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={1}
          className="text-[11px] font-bold tracking-[0.35em] uppercase mb-5 block"
          style={{ color: tagColor }}
        >
          {number} · {tag}
        </motion.span>

        {/* 2. Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={2}
          className="font-black leading-[0.92] mb-7 break-keep whitespace-pre-line"
          style={{
            fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
            color: textColor,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </motion.h2>

        {/* 3. Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={3}
          className="text-base lg:text-lg leading-relaxed max-w-sm mb-10 break-keep"
          style={{ color: descColor }}
        >
          {description}
        </motion.p>

        {/* 4. CTA link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          custom={4}
        >
          <Link
            href={href}
            className="inline-flex items-center gap-4 group w-fit"
            style={{ color: textColor }}
          >
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase">
              자세히 보기
            </span>
            <span className="flex items-center gap-1">
              <span
                className="block h-px transition-all duration-300 group-hover:w-20"
                style={{ width: '3rem', backgroundColor: lineColor }}
              />
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M9 1L13 5M13 5L9 9M13 5H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function EditorialServicesSection() {
  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.tag} service={service} />
      ))}
    </>
  );
}
