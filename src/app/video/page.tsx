import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { PortfolioGrid } from '@/components/portfolio';
import { VideoToolsSection } from './VideoToolsSection';
import { portfolioService } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '영상 제작',
  description: '촬영·편집·모션그래픽까지 직접 작업한 영상 포트폴리오입니다.',
};

const philosophyItems = [
  {
    icon: 'Video',
    title: '직접 촬영',
    description: '전문 장비를 직접 다루며 홍보영상, 유튜브 콘텐츠 등 다양한 영상을 촬영해왔습니다.',
  },
  {
    icon: 'Clapperboard',
    title: '정밀한 편집',
    description: '컷 편집, 컬러 그레이딩, 사운드 디자인까지 편집 전 과정을 직접 수행할 수 있습니다.',
  },
  {
    icon: 'Wand2',
    title: 'AI 활용 영상',
    description: 'AI 이미지 생성 기술을 결합한 티저 광고 영상 제작 경험을 보유하고 있습니다.',
  },
];

export default async function VideoPage() {
  const portfolios = await portfolioService
    .getByCategories(['video'])
    .catch(() => []);

  return (
    <>
      <PageHero
        title="영상 제작"
        titleEn="VIDEO PRODUCTION"
        description="촬영·편집·모션그래픽까지 직접 작업한 영상 포트폴리오입니다."
        breadcrumbs={[{ label: '영상 제작' }]}
      />
      <PhilosophySection
        title="영상 작업에 대한 생각"
        subtitle="MY APPROACH"
        description="화면에 담기는 모든 것에는 이유가 있어야 합니다. 기술보다 메시지를 먼저 생각합니다."
        items={philosophyItems}
      />
      <VideoToolsSection />
      <PortfolioGrid portfolios={portfolios} />
    </>
  );
}
