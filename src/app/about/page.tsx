import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { AboutContent } from './AboutContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About',
  description: '김경훈을 소개합니다. 디자인, 개발, 광고, 영상까지 다루는 멀티플레이어 크리에이터의 이야기.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About 김경훈"
        titleEn="MY STORY"
        description="디자인, 개발, 광고, 영상을 다루는 크리에이터 김경훈을 소개합니다."
        breadcrumbs={[{ label: 'About' }]}
      />
      <AboutContent />
    </>
  );
}
