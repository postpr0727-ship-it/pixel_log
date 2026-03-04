import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio } from '@/types';

export const metadata: Metadata = {
  title: '웹 디자인',
  description: '사용자 경험을 고려한 반응형 웹 디자인으로 온라인 존재감을 높입니다.',
};

const philosophyItems = [
  {
    icon: 'Smartphone',
    title: '모바일 퍼스트',
    description: '모바일 사용자를 우선 고려한 반응형 디자인으로 모든 기기에서 최적의 경험을 제공합니다.',
  },
  {
    icon: 'Users',
    title: 'UX 중심 설계',
    description: '사용자의 행동 패턴을 분석하여 직관적이고 편리한 사용자 경험을 디자인합니다.',
  },
  {
    icon: 'Lightbulb',
    title: '성능 최적화',
    description: '빠른 로딩 속도와 부드러운 인터랙션으로 사용자 이탈을 최소화합니다.',
  },
];

// Placeholder data - will be replaced with Supabase data
const placeholderPortfolios: Portfolio[] = [];

export default function WebDesignPage() {
  // TODO: Fetch portfolios from Supabase
  const portfolios = placeholderPortfolios;

  return (
    <>
      <PageHero
        title="웹 디자인"
        titleEn="WEB DESIGN"
        description="사용자 경험을 고려한 반응형 웹 디자인으로 온라인 존재감을 높입니다."
        breadcrumbs={[
          { label: '디자인', href: '/design' },
          { label: '웹 디자인' },
        ]}
      />
      <PhilosophySection
        title="웹 디자인 철학"
        subtitle="OUR APPROACH"
        description="아름다움과 기능성을 모두 갖춘 웹 디자인으로 비즈니스 목표 달성을 돕습니다."
        items={philosophyItems}
      />
      <PortfolioGrid
        portfolios={portfolios}
        title="웹 디자인 포트폴리오"
        subtitle="PORTFOLIO"
      />
    </>
  );
}
