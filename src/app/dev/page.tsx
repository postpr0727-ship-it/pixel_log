import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { DevServicesSection } from './DevServicesSection';
import { AICertificationSection } from './AICertificationSection';
import { PortfolioGrid } from '@/components/portfolio';
import { portfolioService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '웹 개발',
  description: '반응형 웹사이트부터 맞춤형 프로그램까지, 비즈니스에 필요한 개발 솔루션을 제공합니다.',
};

const philosophyItems = [
  {
    icon: 'Code',
    title: '클린 코드',
    description: '유지보수가 용이한 깔끔한 코드로 개발하여 장기적인 비용을 절감하고 확장성을 확보합니다.',
  },
  {
    icon: 'Globe',
    title: '최신 기술 스택',
    description: 'React, Next.js 등 검증된 최신 기술을 활용하여 빠르고 안정적인 서비스를 구축합니다.',
  },
  {
    icon: 'Server',
    title: '지속적인 유지보수',
    description: '개발 이후에도 안정적인 운영을 위한 유지보수와 기능 개선 서비스를 함께 제공합니다.',
  },
];

export default async function DevPage() {
  const portfolios = await portfolioService
    .getByCategories(['dev'])
    .catch(() => []);

  return (
    <>
      <PageHero
        title="웹 개발"
        titleEn="WEB DEVELOPMENT"
        description="반응형 웹사이트부터 맞춤형 프로그램까지, 비즈니스에 필요한 개발 솔루션을 제공합니다."
        breadcrumbs={[{ label: '웹 개발' }]}
      />
      <PhilosophySection
        title="PIXEL-LOG의 개발 철학"
        subtitle="OUR APPROACH"
        description="좋은 코드는 비즈니스의 성장과 함께 확장됩니다. 미래를 고려한 개발을 합니다."
        items={philosophyItems}
      />
      <DevServicesSection />
      <AICertificationSection />
      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
