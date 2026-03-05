import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PortfolioGrid } from '@/components/portfolio';
import { portfolioService } from '@/lib/supabase';
import { PhilosophySection } from '@/components/sections';
import { NaverBlogLogo } from '@/components/icons/NaverBlogLogo';
import { NaverYearBlogBadge } from '@/components/icons/NaverYearBlogBadge';
import Image from 'next/image';
import { Award, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

export default async function BlogMarketingPage() {
  const portfolios = await portfolioService
    .getByCategories(['blog_marketing'])
    .catch(() => []);

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

      {/* 네이버 이달의 블로그 배지 섹션 - Redesigned for Yellow Theme */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-navy/5 -z-10" />
        <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-12 lg:gap-16">
            {/* Top: Badge & Visual - Maximized Size */}
            <div className="relative w-full flex justify-center order-1 py-10 lg:py-16">
              <div className="relative group w-full max-w-5xl mx-auto flex justify-center items-center">
                {/* Symmetrical Background Decoration (New Design) */}
                {/* Symmetrical Background Decoration (Stylish Grid & Spotlight) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] -z-10 pointer-events-none">
                  {/* Modern Dot Grid Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#fef08a_1px,transparent_1px)] [background-size:24px_24px] opacity-70 mask-image-radial" />

                  {/* Central Spotlight Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A056]/30 rounded-full blur-[100px]" />

                  {/* Rotating Gradient Beams */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-[#D4A056]/20 to-transparent rotate-45 animate-spin-slower" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-[#D4A056]/20 to-transparent -rotate-45 animate-spin-slower" />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#D4A056]/30 blur-[100px] rounded-full scale-90 group-hover:scale-105 transition-transform duration-700" />

                {/* Badge with floating animation */}
                <div className="relative animate-float transform transition-transform duration-700 w-[60%] lg:w-[45%] max-w-[400px]">
                  <Image
                    src="/images/naver-blog-month-badge.png"
                    alt="Naver Blog of the Month"
                    width={400}
                    height={437}
                    className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Reflection/Grounding Shadow */}
                <div className="absolute -bottom-24 lg:-bottom-32 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/10 blur-2xl rounded-[100%]" />
              </div>
            </div>

            {/* Bottom: Content - Centered */}
            <div className="space-y-8 order-2 text-center max-w-3xl mx-auto flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-navy/5 backdrop-blur-sm text-navy rounded-full text-sm font-black shadow-sm mx-auto border border-navy/10">
                <Award className="w-4 h-4" />
                <span>2024년 3월 공식 선정</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-navy leading-tight italic">
                  <span className="block text-2xl lg:text-3xl text-navy/40 font-bold mb-2 not-italic">수많은 경쟁을 뚫고 선정된</span>
                  <span>네이버 이달의 블로그</span>
                </h2>
                <div className="h-2 w-24 bg-navy/20 rounded-full mx-auto" />
              </div>

              <div className="space-y-6">
                <p className="text-xl text-navy leading-relaxed font-black italic">
                  "<strong className="text-navy">2024년 3월</strong>, 네이버가 공식적으로 인정한<br className="hidden lg:block" />
                  콘텐츠 전문가입니다."
                </p>
                <p className="text-base text-navy/70 leading-relaxed font-semibold italic">
                  이달의 블로그는 수백만 개의 블로그 중 <strong className="text-navy">활동성, 전문성, 영향력</strong>을
                  종합적으로 평가하여 선정되는 네이버 최고의 영예입니다.
                  단순한 상위 노출을 넘어, 브랜드의 신뢰도를 높이는 진짜 마케팅을 약속드립니다.
                </p>
              </div>

              {/* Stats/Feature Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="bg-navy/5 backdrop-blur-md border border-navy/10 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center group">
                  <div className="text-3xl font-black text-navy mb-1 group-hover:scale-110 transition-transform">TOP 1%</div>
                  <div className="text-sm font-bold text-navy/40">전체 블로그 중 선정</div>
                </div>
                <div className="bg-navy/5 backdrop-blur-md border border-navy/10 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-center group">
                  <div className="text-3xl font-black text-navy mb-1 group-hover:scale-110 transition-transform">Official</div>
                  <div className="text-sm font-bold text-navy/40">네이버 공식 인증 파트너</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2024 네이버 올해의 블로그 배지 섹션 - Yellow/Navy Premium */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-white text-navy">
        {/* Abstract Backgrounds: Grid & Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 z-0 grid-pattern opacity-[0.1]" />
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-navy/5 border border-navy/10 text-navy rounded-full text-sm font-black shadow-sm mx-auto lg:mx-0 backdrop-blur-md animate-fade-in-up">
                <Award className="w-5 h-5 text-navy" />
                <span className="uppercase tracking-widest text-xs">2024.12 공식 선정 • The Highest Honor</span>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none text-navy italic">
                  NAVER <span className="text-navy/40">BLOG OF</span><br />
                  THE YEAR <span className="text-navy">2024</span>
                </h2>
                <div className="h-2 w-32 bg-navy/20 rounded-full mx-auto lg:mx-0" />
              </div>

              <div className="space-y-8 max-w-xl mx-auto lg:mx-0">
                <p className="text-2xl text-navy leading-relaxed font-black italic">
                  "<strong className="text-navy">3,300만 개</strong> 블로그 중 선정된<br className="hidden lg:block" />
                  <span className="text-navy/60">압도적인 영향력</span>, 그 정점."
                </p>

                <div className="bg-navy/5 backdrop-blur-sm border border-navy/10 rounded-2xl p-6 space-y-4 text-left shadow-lg">
                  <p className="text-lg text-navy/70 leading-relaxed font-semibold italic">
                    네이버가 공식 인정한 <strong className="text-navy font-black">대한민국 상위 0.0003%</strong>의 권위.<br />
                    이달의 블로그 그 이상의 가치. 단순한 상위 노출을 넘어, 브랜드의 격을 높이는 차원이 다른 마케팅 솔루션을 경험하세요.
                  </p>
                  <ul className="space-y-2 text-sm text-navy/50 font-black tracking-tight">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                      <span>네이버 공식 인증 파트너 (Official Partner)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                      <span>Top 100 명예의 전당 헌액</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-navy/20" />
                      <span>검증된 콘텐츠 전문성 및 영향력</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium Stats Grid */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 pt-4">
                <div className="bg-navy/5 backdrop-blur-md border border-navy/10 rounded-xl p-5 text-center group hover:bg-navy/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-black text-navy/30 mb-2 tracking-widest">SELECTION</div>
                  <div className="text-3xl lg:text-4xl font-black text-navy group-hover:scale-110 transition-transform">TOP 100</div>
                  <div className="text-[10px] text-navy/40 mt-2 font-bold">3,300만 개 중</div>
                </div>
                <div className="bg-navy/5 backdrop-blur-md border border-navy/10 rounded-xl p-5 text-center group hover:bg-navy/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-black text-navy/30 mb-2 tracking-widest">PERCENTILE</div>
                  <div className="text-3xl lg:text-4xl font-black text-navy group-hover:scale-110 transition-transform">0.0003%</div>
                  <div className="text-[10px] text-navy/40 mt-2 font-bold">압도적인 경쟁률</div>
                </div>
                <div className="bg-navy/5 backdrop-blur-md border border-navy/10 rounded-xl p-5 text-center group hover:bg-navy/10 transition-all hover:-translate-y-1 duration-300 cursor-default">
                  <div className="text-xs font-black text-navy/30 mb-2 tracking-widest">AUTHORITY</div>
                  <div className="text-3xl lg:text-4xl font-black text-navy group-hover:scale-110 transition-transform">GRAND</div>
                  <div className="text-[10px] text-navy/40 mt-2 font-bold">네이버 공식 인증</div>
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

      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
