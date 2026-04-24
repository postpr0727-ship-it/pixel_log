import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { AdServicesSection } from './AdServicesSection';
import { CertSection } from './CertSection';

export const metadata: Metadata = {
  title: '온라인 광고',
  description: '검색광고마케터 1급 보유. 네이버·구글·카카오·인스타그램 등 다채널 광고 운영 경험을 소개합니다.',
};

const philosophyItems = [
  {
    icon: 'Target',
    title: '정확한 타겟팅',
    description: '타겟 설정의 디테일이 성과를 가릅니다. 다양한 캠페인을 통해 정밀 타겟팅을 직접 경험했습니다.',
  },
  {
    icon: 'TrendingUp',
    title: '성과 중심 운영',
    description: 'CTR, ROAS, 전환율 등 지표를 직접 모니터링하고 캠페인을 반복 개선해온 경험이 있습니다.',
  },
  {
    icon: 'PieChart',
    title: '예산 효율화',
    description: '한정된 예산 안에서 최대 효율을 내는 운영 방식을 실무를 통해 직접 체득했습니다.',
  },
];

export default function OnlineAdPage() {
  return (
    <>
      <PageHero
        title="온라인 광고"
        titleEn="ONLINE ADVERTISING"
        description="검색광고마케터 1급 자격 보유. 다양한 플랫폼의 광고 운영 경험과 실적을 소개합니다."
        breadcrumbs={[{ label: '온라인 광고' }]}
      />
      <CertSection />
      <PhilosophySection
        title="온라인 광고에 대한 생각"
        subtitle="MY APPROACH"
        description="광고는 단순 집행이 아닙니다. 데이터를 읽고 해석하며 개선하는 과정을 반복해왔습니다."
        items={philosophyItems}
      />
      <AdServicesSection />
    </>
  );
}
