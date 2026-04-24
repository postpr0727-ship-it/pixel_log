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
  description: '반응형 웹사이트부터 맞춤형 프로그램까지 직접 개발해온 웹 개발 포트폴리오입니다.',
};

const philosophyItems = [
  {
    icon: 'Code',
    title: '클린 코드',
    description: '읽기 쉽고 유지보수하기 좋은 코드를 지향합니다. 미래의 나 또는 다음 개발자가 이해할 수 있는 코드를 씁니다.',
  },
  {
    icon: 'Globe',
    title: '최신 기술 스택',
    description: 'React, Next.js 등 현대적인 기술 스택을 직접 익히고 실무 프로젝트에 적용해왔습니다.',
  },
  {
    icon: 'Server',
    title: '지속적인 유지보수',
    description: '개발로 끝나지 않습니다. 운영·유지보수·기능 개선까지 직접 관리한 경험이 있습니다.',
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
        description="반응형 웹사이트부터 맞춤형 프로그램까지 직접 개발해온 작업물을 소개합니다."
        breadcrumbs={[{ label: '웹 개발' }]}
      />
      <PhilosophySection
        title="개발에 대한 생각"
        subtitle="MY APPROACH"
        description="좋은 코드는 오래 살아남습니다. 빠른 구현보다 지속 가능한 구조를 먼저 생각합니다."
        items={philosophyItems}
      />
      <DevServicesSection />
      <AICertificationSection />
      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
