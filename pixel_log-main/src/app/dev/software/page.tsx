import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '프로그램 개발',
  description: '업무 자동화, 관리 시스템, 맞춤형 프로그램 등을 개발합니다.',
};

const philosophyItems = [
  {
    icon: 'Server',
    title: '업무 프로세스 분석',
    description: '현재 업무 프로세스를 분석하여 가장 효율적인 솔루션을 설계합니다.',
  },
  {
    icon: 'Shield',
    title: '안정적인 시스템',
    description: '확장성과 안정성을 고려한 아키텍처로 장기적인 운영이 가능한 시스템을 구축합니다.',
  },
  {
    icon: 'BarChart',
    title: '데이터 기반 의사결정',
    description: '축적된 데이터를 활용하여 비즈니스 의사결정을 지원하는 기능을 제공합니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function SoftwareDevPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="프로그램 개발"
        titleEn="SOFTWARE DEVELOPMENT"
        description="업무 자동화, 관리 시스템, 맞춤형 프로그램 등을 개발합니다."
        breadcrumbs={[
          { label: '개발', href: '/dev' },
          { label: '프로그램 개발' },
        ]}
      />
      <PhilosophySection
        title="프로그램 개발 철학"
        subtitle="OUR APPROACH"
        description="비즈니스에 딱 맞는 맞춤형 솔루션으로 업무 효율을 극대화합니다."
        items={philosophyItems}
      />
      <PortfolioGrid
        portfolios={portfolios}
        title="프로그램 개발 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
