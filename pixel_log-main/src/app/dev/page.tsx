import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { CategoryNav, PhilosophySection } from '@/components/sections';

export const metadata: Metadata = {
  title: '웹 개발 서비스',
  description: '반응형 웹사이트부터 맞춤형 프로그램까지, 비즈니스에 필요한 개발 솔루션을 제공합니다.',
};

const categories = [
  {
    title: '홈페이지 제작',
    titleEn: 'WEBSITE',
    description: '반응형 웹사이트, 랜딩페이지, 기업 홈페이지 등 다양한 웹사이트를 제작합니다.',
    href: '/dev/website',
    icon: 'Globe',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '프로그램 개발',
    titleEn: 'SOFTWARE',
    description: '업무 자동화, 관리 시스템, 맞춤형 프로그램 등을 개발합니다.',
    href: '/dev/software',
    icon: 'Code2',
    gradient: 'from-purple-500 to-violet-500',
  },
];

const philosophyItems = [
  {
    icon: 'Code',
    title: '클린 코드',
    description: '유지보수가 용이한 깔끔한 코드로 개발하여 장기적인 비용을 절감합니다.',
  },
  {
    icon: 'Globe',
    title: '최신 기술 스택',
    description: 'React, Next.js 등 검증된 최신 기술을 활용하여 안정적인 서비스를 구축합니다.',
  },
  {
    icon: 'Server',
    title: '지속적인 유지보수',
    description: '개발 이후에도 안정적인 운영을 위한 유지보수 서비스를 제공합니다.',
  },
];

export default function DevPage() {
  return (
    <>
      <PageHero
        title="웹 개발 서비스"
        titleEn="DEVELOPMENT"
        description="반응형 웹사이트부터 맞춤형 프로그램까지, 비즈니스에 필요한 개발 솔루션을 제공합니다."
        breadcrumbs={[{ label: '개발' }]}
      />
      <PhilosophySection
        title="PIXEL-LOG의 개발 철학"
        subtitle="OUR APPROACH"
        description="좋은 코드는 비즈니스의 성장과 함께 확장됩니다. 미래를 고려한 개발을 합니다."
        items={philosophyItems}
      />
      <CategoryNav
        categories={categories}
        title="개발 카테고리"
        subtitle="CATEGORIES"
      />
    </>
  );
}
