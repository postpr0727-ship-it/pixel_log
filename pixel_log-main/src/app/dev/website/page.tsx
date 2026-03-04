import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '홈페이지 제작',
  description: '반응형 웹사이트, 랜딩페이지, 기업 홈페이지 등 다양한 웹사이트를 제작합니다.',
};

const philosophyItems = [
  {
    icon: 'Smartphone',
    title: '반응형 디자인',
    description: 'PC, 태블릿, 모바일 모든 기기에서 최적화된 화면을 제공합니다.',
  },
  {
    icon: 'Lightbulb',
    title: '빠른 로딩 속도',
    description: '최적화된 코드와 이미지로 빠른 로딩 속도를 보장합니다.',
  },
  {
    icon: 'Shield',
    title: '보안 및 SEO',
    description: '보안 인증서 적용과 검색 엔진 최적화로 안전하고 찾기 쉬운 웹사이트를 만듭니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function WebsiteDevPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="홈페이지 제작"
        titleEn="WEBSITE DEVELOPMENT"
        description="반응형 웹사이트, 랜딩페이지, 기업 홈페이지 등 다양한 웹사이트를 제작합니다."
        breadcrumbs={[
          { label: '개발', href: '/dev' },
          { label: '홈페이지 제작' },
        ]}
      />
      <PhilosophySection
        title="홈페이지 제작 철학"
        subtitle="OUR APPROACH"
        description="웹사이트는 온라인에서의 첫인상입니다. 전문적이고 신뢰감 있는 웹사이트를 제작합니다."
        items={philosophyItems}
      />
      <PortfolioGrid
        portfolios={portfolios}
        title="홈페이지 제작 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
