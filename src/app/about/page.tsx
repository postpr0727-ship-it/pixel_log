import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { AboutContent } from './AboutContent';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About',
  description: 'PIXEL-LOG의 스토리와 비전을 소개합니다. 디자인, 개발, 마케팅 분야의 전문성을 바탕으로 비즈니스 성장을 돕습니다.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About PIXEL-LOG"
        titleEn="OUR STORY"
        description="당신의 비즈니스를 픽셀 하나까지 완벽하게 만들어 드립니다."
        breadcrumbs={[{ label: 'About' }]}
      />
      <AboutContent />
    </>
  );
}
