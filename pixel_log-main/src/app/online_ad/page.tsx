import { Metadata } from 'next';
import { Megaphone } from 'lucide-react';
import { PageHero } from '@/components/hero';
import { PhilosophySection, CTASection } from '@/components/sections';

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

const adServices = [
  {
    title: '네이버 검색광고',
    description: '검색 키워드 기반의 타겟 광고로 구매 의도가 높은 고객에게 노출',
  },
  {
    title: '카카오 광고',
    description: '카카오 생태계 내에서 다양한 형태의 광고 집행',
  },
  {
    title: 'SNS 광고',
    description: '인스타그램, 페이스북 등 SNS 채널 광고 운영',
  },
  {
    title: '배너 광고',
    description: 'GDN, 네이버 DA 등 디스플레이 광고 운영',
  },
];

export default function OnlineAdPage() {
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

      {/* Ad Services Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              SERVICES
            </span>
            <h2 className="section-title text-navy mt-2">
              광고 서비스 종류
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adServices.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-white rounded-xl border border-border/50 hover:border-gold/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-navy">{service.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm pl-16">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
