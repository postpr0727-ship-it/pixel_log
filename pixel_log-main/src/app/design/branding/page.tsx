import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '브랜드 디자인',
  description: '로고, 명함, 브랜드 가이드라인 등 일관된 브랜드 아이덴티티를 구축합니다.',
};

const philosophyItems = [
  {
    icon: 'Target',
    title: '명확한 브랜드 전략',
    description: '브랜드의 핵심 가치와 타겟 고객을 분석하여 효과적인 브랜드 전략을 수립합니다.',
  },
  {
    icon: 'Eye',
    title: '차별화된 시각 언어',
    description: '경쟁사와 차별화되면서도 브랜드의 본질을 담은 고유한 시각 언어를 만듭니다.',
  },
  {
    icon: 'Layers',
    title: '확장 가능한 시스템',
    description: '다양한 매체와 상황에서 일관되게 적용 가능한 브랜드 시스템을 구축합니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function BrandingPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="브랜드 디자인"
        titleEn="BRANDING"
        description="로고, 명함, 브랜드 가이드라인 등 일관된 브랜드 아이덴티티를 구축합니다."
        breadcrumbs={[
          { label: '디자인', href: '/design' },
          { label: '브랜드 디자인' },
        ]}
      />
      <PhilosophySection
        title="브랜드 디자인 철학"
        subtitle="OUR APPROACH"
        description="브랜드는 단순한 로고가 아닙니다. 고객의 마음에 남는 경험을 디자인합니다."
        items={philosophyItems}
      />
      <PortfolioGrid
        portfolios={portfolios}
        title="브랜드 디자인 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
