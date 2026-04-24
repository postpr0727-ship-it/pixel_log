import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { DesignServicesSection } from './DesignServicesSection';
import { DesignToolsSection } from './DesignToolsSection';
import { GTQCertificationSection } from './GTQCertificationSection';
import { PortfolioGrid } from '@/components/portfolio';
import { portfolioService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '디자인 서비스',
  description: '브랜드 디자인, 웹 디자인, 인쇄 디자인까지 직접 작업해온 디자인 포트폴리오입니다.',
};

const philosophyItems = [
  {
    icon: 'Palette',
    title: '일관된 브랜드 경험',
    description: '온라인과 오프라인 모든 접점에서 일관된 시각 언어를 유지하는 것을 중요하게 생각합니다.',
  },
  {
    icon: 'Globe',
    title: '트렌드와 본질의 균형',
    description: '최신 트렌드를 반영하면서도 브랜드의 본질을 잃지 않는 디자인을 추구합니다.',
  },
  {
    icon: 'Target',
    title: '목적 중심 디자인',
    description: '보기 좋은 것보다 목적에 맞는 디자인을 추구합니다. 모든 작업은 이유가 있어야 한다고 생각합니다.',
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
        description={<>브랜딩부터 웹, 인쇄까지 —<br className="hidden md:block" /> 직접 작업해온 디자인 포트폴리오를 소개합니다.</>}
        breadcrumbs={[{ label: '디자인' }]}
      />
      <PhilosophySection
        title="디자인에 대한 생각"
        subtitle="MY APPROACH"
        description="디자인은 단순한 꾸미기가 아닙니다. 메시지를 가장 효과적으로 전달하는 시각적 언어라고 생각합니다."
        items={philosophyItems}
      />
      <DesignServicesSection />
      <DesignToolsSection />
      <GTQCertificationSection />
      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
