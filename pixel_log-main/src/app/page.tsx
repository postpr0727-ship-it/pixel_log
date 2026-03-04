import { MainHero } from '@/components/hero';
import { ServiceSection, StatsSection, CTASection, TrustSection } from '@/components/sections';
import { portfolioService, videoLinkService } from '@/lib/supabase';

export default async function HomePage() {
  // Fetch latest projects from each category
  const [designProject, blogProject, onlineAdProject, devProject, latestVideo] = await Promise.all([
    portfolioService.getLatestByMainCategory('design'),
    portfolioService.getLatestByMainCategory('blog'),
    portfolioService.getLatestByMainCategory('online_ad'),
    portfolioService.getLatestByMainCategory('dev'),
    videoLinkService.getAll().then(videos => videos[0] || null),
  ]);

  const recentProjects = [
    designProject && {
      title: designProject.title,
      category: '디자인',
      description: designProject.description || '브랜드 아이덴티티부터 웹, 인쇄까지',
      image: designProject.thumbnail_url || '',
      href: '/design',
    },
    blogProject && {
      title: blogProject.title,
      category: '블로그 마케팅',
      description: blogProject.description || '검색 상위 노출을 통한 브랜드 인지도 향상',
      image: blogProject.thumbnail_url || '',
      href: '/blog',
    },
    onlineAdProject && {
      title: onlineAdProject.title,
      category: '온라인 광고',
      description: onlineAdProject.description || '타겟 마케팅으로 전환율 증가',
      image: onlineAdProject.thumbnail_url || '',
      href: '/online_ad',
    },
    devProject && {
      title: devProject.title,
      category: '웹 개발',
      description: devProject.description || '모던한 UI/UX를 갖춘 웹사이트 제작',
      image: devProject.thumbnail_url || '',
      href: '/dev',
    },
    latestVideo && {
      title: latestVideo.title,
      category: '영상 제작',
      description: latestVideo.description || '스토리텔링을 담은 감성적인 영상',
      image: latestVideo.thumbnail_url || '',
      href: '/video',
    },
  ].filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <MainHero />
      <ServiceSection />
      <TrustSection projects={recentProjects} />
      <StatsSection />
      <CTASection />
    </>
  );
}
