import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '인쇄 디자인',
  description: '리플렛, 포스터, 패키지 등 다양한 인쇄물 디자인으로 브랜드를 전달합니다.',
};

const philosophyItems = [
  {
    icon: 'FileText',
    title: '정보의 명확한 전달',
    description: '핵심 메시지가 효과적으로 전달되도록 정보 구조와 시각적 계층을 설계합니다.',
  },
  {
    icon: 'Printer',
    title: '인쇄 품질 보장',
    description: '인쇄 환경을 고려한 색상 관리와 해상도 설정으로 최상의 인쇄 결과물을 보장합니다.',
  },
  {
    icon: 'Layers',
    title: '다양한 용도 대응',
    description: '리플렛, 포스터, 명함, 패키지 등 다양한 인쇄물에 최적화된 디자인을 제공합니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function PrintDesignPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="인쇄 디자인"
        titleEn="PRINT DESIGN"
        description="리플렛, 포스터, 패키지 등 다양한 인쇄물 디자인으로 브랜드를 전달합니다."
        breadcrumbs={[
          { label: '디자인', href: '/design' },
          { label: '인쇄 디자인' },
        ]}
      />
      <PhilosophySection
        title="인쇄 디자인 철학"
        subtitle="OUR APPROACH"
        description="디지털 시대에도 인쇄물은 브랜드의 실체감을 전달하는 중요한 매체입니다."
        items={philosophyItems}
      />
      <PortfolioGrid
        portfolios={portfolios}
        title="인쇄 디자인 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
