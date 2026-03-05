import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection, CTASection } from '@/components/sections';
import { AdServicesSection } from './AdServicesSection';
import { PortfolioGrid } from '@/components/portfolio';
import { portfolioService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '온라인 광고',
  description: '효과적인 온라인 광고로 타겟 고객에게 정확하게 도달합니다.',
};

const philosophyItems = [
  {
    icon: 'Target',
    title: '정확한 타겟팅',
    description: '데이터 기반의 정밀한 타겟팅으로 광고 효율을 극대화합니다.',
  },
  {
    icon: 'TrendingUp',
    title: '성과 중심 운영',
    description: '클릭률, 전환율 등 핵심 지표를 모니터링하며 실시간으로 최적화합니다.',
  },
  {
    icon: 'PieChart',
    title: '예산 효율화',
    description: '예산 대비 최대 효과를 달성할 수 있도록 광고비를 효율적으로 운영합니다.',
  },
];

export default async function OnlineAdPage() {
  const portfolios = await portfolioService
    .getByCategories(['online_ad'])
    .catch(() => []);

  return (
    <>
      <PageHero
        title="온라인 광고"
        titleEn="ONLINE ADVERTISING"
        description="효과적인 온라인 광고로 타겟 고객에게 정확하게 도달합니다."
        breadcrumbs={[{ label: '온라인 광고' }]}
      />
      <PhilosophySection
        title="온라인 광고 철학"
        subtitle="OUR APPROACH"
        description="광고비는 투자입니다. 투자 대비 최대 수익을 달성할 수 있도록 운영합니다."
        items={philosophyItems}
      />
      <AdServicesSection />
      <PortfolioGrid portfolios={portfolios} />
      <CTASection />
    </>
  );
}
