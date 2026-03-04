import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import { NaverBlogBadge } from '@/components/icons/NaverBlogBadge';
import { NaverBlogLogo } from '@/components/icons/NaverBlogLogo';
import { NaverYearBlogBadge } from '@/components/icons/NaverYearBlogBadge';
import Image from 'next/image';
import { Award, TrendingUp } from 'lucide-react';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '블로그 마케팅',
  description: '전문적인 콘텐츠로 브랜드 인지도를 높이고 잠재 고객을 유치합니다.',
};

const philosophyItems = [
  {
    icon: 'Search',
    title: '키워드 최적화',
    description: '타겟 고객이 검색하는 키워드를 분석하여 상위 노출되는 콘텐츠를 제작합니다.',
  },
  {
    icon: 'FileText',
    title: '전문 콘텐츠 제작',
    description: '업종에 맞는 전문적인 콘텐츠로 브랜드의 전문성과 신뢰도를 높입니다.',
  },
  {
    icon: 'BarChart',
    title: '성과 분석 및 개선',
    description: '콘텐츠 성과를 지속적으로 분석하고 개선하여 효과를 극대화합니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function BlogMarketingPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="블로그 마케팅"
        titleEn="BLOG MARKETING"
        description="전문적인 콘텐츠로 브랜드 인지도를 높이고 잠재 고객을 유치합니다."
        breadcrumbs={[{ label: '블로그 마케팅' }]}
      />
      <PhilosophySection
        title="블로그 마케팅 철학"
        subtitle="OUR APPROACH"
        description="좋은 콘텐츠는 검색 엔진과 고객 모두에게 사랑받습니다."
        items={philosophyItems}
      />

      {/* 네이버 이달의 블로그 배지 섹션 - Premium Redesign */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-green-50 to-white">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-green-100/40 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-teal-50 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:gap-16">
            {/* Top: Badge & Visual - Maximized Size */}
            <div className="relative w-full flex justify-center order-1 py-10 lg:py-16">
              <div className="relative group w-full max-w-5xl mx-auto flex justify-center items-center">
                {/* Symmetrical Background Decoration (New Design) */}
                {/* Symmetrical Background Decoration (Stylish Grid & Spotlight) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 pointer-events-none">
                  {/* Modern Dot Grid Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#dcfce7_1px,transparent_1px)] [background-size:24px_24px] opacity-70 mask-image-radial" />

                  {/* Central Spotlight Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/50 rounded-full blur-[100px]" />

                  {/* Rotating Gradient Beams */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-green-100/30 to-transparent rotate-45 animate-spin-slower" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent -rotate-45 animate-spin-slower" />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-green-400/20 blur-[100px] rounded-full scale-90 group-hover:scale-105 transition-transform duration-700" />

                {/* Badge with floating animation */}
                <div className="relative animate-float transform scale-125 lg:scale-150 transition-transform duration-700">
                  <NaverBlogBadge className="w-full h-auto drop-shadow-2xl" />
                </div>

                {/* Reflection/Grounding Shadow */}
                <div className="absolute -bottom-24 lg:-bottom-32 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-2xl rounded-[100%]" />
              </div>
            </div>

            {/* Bottom: Content - Centered */}
            <div className="space-y-8 order-2 text-center max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/80 backdrop-blur-sm text-green-800 rounded-full text-sm font-bold shadow-sm mx-auto">
                <Award className="w-4 h-4" />
                <span>2024년 3월 공식 선정</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
                  <span className="block text-2xl lg:text-3xl text-slate-500 font-bold mb-2">수많은 경쟁을 뚫고 선정된</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">네이버 이달의 블로그</span>
                </h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-teal-400 rounded-full mx-auto" />
              </div>

              <div className="space-y-6">
                <p className="text-xl text-slate-700 leading-relaxed font-medium">
                  "<strong className="text-slate-900">2024년 3월</strong>, 네이버가 공식적으로 인정한<br className="hidden lg:block" />
                  콘텐츠 전문가입니다."
                </p>
                <p className="text-base text-slate-600 leading-relaxed">
                  이달의 블로그는 수백만 개의 블로그 중 <strong className="text-green-700">활동성, 전문성, 영향력</strong>을
                  종합적으로 평가하여 선정되는 네이버 최고의 영예입니다.
                  단순한 상위 노출을 넘어, 브랜드의 신뢰도를 높이는 진짜 마케팅을 약속드립니다.
                </p>
              </div>

              {/* Stats/Feature Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-white/60 backdrop-blur-md border border-slate-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center group">
                  <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-green-600 transition-colors">TOP 1%</div>
                  <div className="text-sm font-medium text-slate-500">전체 블로그 중 선정</div>
                </div>
                <div className="bg-white/60 backdrop-blur-md border border-slate-100 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center group">
                  <div className="text-3xl font-black text-slate-900 mb-1 group-hover:text-green-600 transition-colors">Official</div>
                  <div className="text-sm font-medium text-slate-500">네이버 공식 인증 파트너</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2024 네이버 올해의 블로그 배지 섹션 - Dark/Gold Premium (Official Theme) */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#222222] text-white">
        {/* Abstract Backgrounds: Starry Night Theme */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          {/* Simple Sparkles */}
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-[#ffecbd] rounded-full animate-pulse-slow" />
          <div className="absolute bottom-[20%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-[50%] right-[40%] w-1 h-1 bg-[#ffecbd] rounded-full animate-pulse-slow" />

          {/* Glows */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4A056]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#D4A056]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="space-y-10 text-center lg:text-left order-2 lg:order-1 relative z-10">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#D4A056]/10 border border-[#D4A056]/40 text-[#ffecbd] rounded-full text-sm font-bold shadow-[0_0_30px_rgba(212,160,86,0.2)] mx-auto lg:mx-0 backdrop-blur-md animate-fade-in-up">
                <Award className="w-5 h-5 text-[#D4A056]" />
                <span className="uppercase tracking-widest text-xs">2024.12 공식 선정 • The Highest Honor</span>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
                  NAVER <span className="text-[#D4A056] text-transparent bg-clip-text bg-gradient-to-br from-[#F5C542] via-[#D4A056] to-[#8B6931]">BLOG OF</span><br />
                  THE YEAR <span className="text-[#ffecbd] drop-shadow-[0_0_15px_rgba(255,236,189,0.3)]">2024</span>
                </h2>
                <div className="h-2 w-32 bg-gradient-to-r from-[#D4A056] via-[#F5C542] to-transparent rounded-full mx-auto lg:mx-0 shadow-[0_0_20px_rgba(212,160,86,0.5)]" />
              </div>

              <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
                <p className="text-2xl text-white leading-relaxed font-light">
                  "<strong className="text-[#ffecbd] font-bold">3,300만 개</strong> 블로그 중 선정된<br className="hidden lg:block" />
                  <span className="text-[#D4A056] font-black">압도적인 영향력</span>, 그 정점."
                </p>

                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4 text-left shadow-lg">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    네이버가 공식 인정한 <strong className="text-[#D4A056] font-semibold">대한민국 상위 0.0003%</strong>의 권위.<br />
                    이달의 블로그 그 이상의 가치. 단순한 상위 노출을 넘어, 브랜드의 격을 높이는 차원이 다른 마케팅 솔루션을 경험하세요.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400 font-medium">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A056] shadow-[0_0_10px_#D4A056]" />
                      <span>네이버 공식 인증 파트너 (Official Partner)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A056] shadow-[0_0_10px_#D4A056]" />
                      <span>Top 100 명예의 전당 헌액</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4A056] shadow-[0_0_10px_#D4A056]" />
                      <span>검증된 콘텐츠 전문성 및 영향력</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium Stats Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 pt-4">
                <div className="bg-[#D4A056]/5 backdrop-blur-md border border-[#D4A056]/20 rounded-xl p-5 text-center group hover:bg-[#D4A056]/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-bold text-[#ffecbd] mb-2 tracking-widest opacity-80">SELECTION</div>
                  <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-[#D4A056] transition-colors">TOP 100</div>
                  <div className="text-[10px] text-gray-400 mt-2">3,300만 개 중</div>
                </div>
                <div className="bg-[#D4A056]/5 backdrop-blur-md border border-[#D4A056]/20 rounded-xl p-5 text-center group hover:bg-[#D4A056]/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-bold text-[#ffecbd] mb-2 tracking-widest opacity-80">PERCENTILE</div>
                  <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-[#D4A056] transition-colors">0.0003%</div>
                  <div className="text-[10px] text-gray-400 mt-2">압도적인 경쟁률</div>
                </div>
                <div className="bg-[#D4A056]/5 backdrop-blur-md border border-[#D4A056]/20 rounded-xl p-5 text-center group hover:bg-[#D4A056]/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-bold text-[#ffecbd] mb-2 tracking-widest opacity-80">AUTHORITY</div>
                  <div className="text-3xl lg:text-4xl font-black text-white group-hover:text-[#D4A056] transition-colors">GRAND</div>
                  <div className="text-[10px] text-gray-400 mt-2">네이버 공식 인증</div>
                </div>
              </div>
            </div>

            {/* Right: Shield Badge */}
            <div className="relative flex justify-center lg:justify-center order-1 lg:order-2">
              <div className="relative group w-full max-w-sm mx-auto">
                {/* Glow Behind Shield */}
                <div className="absolute inset-0 bg-[#D4A056]/20 blur-[80px] rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />

                {/* Badge Image */}
                <div className="relative animate-float duration-1000 transform hover:scale-105 transition-transform">
                  <Image
                    src="/images/naver-blog-award-2024.png"
                    alt="2024 Naver Blog of the Year Badge"
                    width={450}
                    height={492}
                    className="w-full h-auto drop-shadow-2xl filter brightness-110"
                    priority
                  />
                </div>

                {/* Ground Reflection */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-[#D4A056]/20 blur-xl rounded-[100%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioGrid
        portfolios={portfolios}
        title="블로그 마케팅 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
