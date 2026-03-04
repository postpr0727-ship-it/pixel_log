import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { CategoryNav, PhilosophySection } from '@/components/sections';

export const metadata: Metadata = {
  title: '디자인 서비스',
  description: '브랜드 디자인, 웹 디자인, 인쇄 디자인까지 모든 디자인 솔루션을 제공합니다.',
};

const categories = [
  {
    title: '브랜드 디자인',
    titleEn: 'BRANDING',
    description: '로고, 명함, 브랜드 가이드라인 등 일관된 브랜드 아이덴티티를 구축합니다.',
    href: '/design/branding',
    icon: 'Palette',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: '웹 디자인',
    titleEn: 'WEB DESIGN',
    description: '사용자 경험을 고려한 반응형 웹 디자인으로 온라인 존재감을 높입니다.',
    href: '/design/web',
    icon: 'Globe',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: '인쇄 디자인',
    titleEn: 'PRINT DESIGN',
    description: '리플렛, 포스터, 패키지 등 인쇄물 디자인으로 브랜드를 전달합니다.',
    href: '/design/print',
    icon: 'Printer',
    gradient: 'from-amber-500 to-orange-500',
  },
];

const philosophyItems = [
  {
    icon: 'Palette',
    title: '일관된 브랜드 경험',
    description: '모든 접점에서 통일된 브랜드 경험을 제공하여 고객의 신뢰를 구축합니다.',
  },
  {
    icon: 'Globe',
    title: '트렌드와 본질의 균형',
    description: '최신 트렌드를 반영하면서도 브랜드의 본질을 잃지 않는 디자인을 추구합니다.',
  },
  {
    icon: 'Printer',
    title: '목적에 맞는 디자인',
    description: '단순한 예쁜 디자인이 아닌, 비즈니스 목표 달성에 기여하는 디자인을 만듭니다.',
  },
];

export default function DesignPage() {
  return (
    <>
      <PageHero
        title="디자인 서비스"
        titleEn="DESIGN"
        description="브랜드의 가치를 시각적으로 표현합니다. 브랜딩부터 웹, 인쇄까지 모든 디자인 솔루션을 제공합니다."
        breadcrumbs={[{ label: '디자인' }]}
      />
      <PhilosophySection
        title="PIXEL-LOG의 디자인 철학"
        subtitle="OUR APPROACH"
        description="디자인은 단순한 꾸미기가 아닙니다. 비즈니스의 메시지를 효과적으로 전달하는 강력한 도구입니다."
        items={philosophyItems}
      />
      <CategoryNav
        categories={categories}
        title="디자인 카테고리"
        subtitle="CATEGORIES"
      />
    </>
  );
}
