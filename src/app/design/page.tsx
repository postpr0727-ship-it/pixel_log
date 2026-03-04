import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { DesignServicesSection } from './DesignServicesSection';
import { DesignToolsSection } from './DesignToolsSection';
import { GTQCertificationSection } from './GTQCertificationSection';
import { PortfolioGrid } from '@/components/portfolio';
import { portfolioService } from '@/lib/supabase';

export const metadata: Metadata = {
  title: '디자인 서비스',
  description: '브랜드 디자인, 웹 디자인, 인쇄 디자인까지 모든 디자인 솔루션을 제공합니다.',
};

const philosophyItems = [
  {
    icon: 'Palette',
    title: '일관된 브랜드 경험',
    description: '온라인과 오프라인 모든 접점에서 통일된 브랜드 경험을 제공하여 고객의 신뢰를 구축합니다.',
  },
  {
    icon: 'Globe',
    title: '트렌드와 본질의 균형',
    description: '최신 트렌드를 반영하면서도 브랜드의 본질을 잃지 않는 디자인을 추구합니다.',
  },
  {
    icon: 'Target',
    title: '목적 중심 디자인',
    description: '단순히 예쁜 디자인이 아닌, 비즈니스 목표 달성에 직접 기여하는 디자인을 만듭니다.',
  },
];

export default async function DesignPage() {
  const portfolios = await portfolioService
    .getByCategories(['design'])
    .catch(() => []);

  return (
    <>
      <PageHero
        title="디자인 서비스"
        titleEn="DESIGN"
        description={<>브랜드의 가치를 시각적으로 표현합니다.<br className="hidden md:block" /> 브랜딩부터 웹, 인쇄까지 모든 디자인 솔루션을 제공합니다.</>}
        breadcrumbs={[{ label: '디자인' }]}
      />
      <PhilosophySection
        title="PIXEL-LOG의 디자인 철학"
        subtitle="OUR APPROACH"
        description="디자인은 단순한 꾸미기가 아닙니다. 비즈니스의 메시지를 효과적으로 전달하는 강력한 도구입니다."
        items={philosophyItems}
      />
      <DesignServicesSection />
      <DesignToolsSection />
      <GTQCertificationSection />
      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
