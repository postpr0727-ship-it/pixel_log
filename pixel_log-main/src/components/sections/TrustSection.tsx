'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
    href: string;
}

interface TrustSectionProps {
    projects?: Project[];
}

const fallbackProjects: Project[] = [
    {
        title: '브랜드 아이덴티티 디자인',
        category: '디자인',
        description: '스타트업을 위한 완전한 브랜드 아이덴티티 시스템 구축',
        image: '/images/placeholder-project-1.jpg',
        href: '/design',
    },
    {
        title: '블로그 콘텐츠 마케팅',
        category: '블로그 마케팅',
        description: '검색 상위 노출을 통한 브랜드 인지도 향상',
        image: '/images/placeholder-project-2.jpg',
        href: '/blog',
    },
    {
        title: '키워드 광고 캠페인',
        category: '온라인 광고',
        description: '타겟 마케팅으로 전환율 200% 증가',
        image: '/images/placeholder-project-3.jpg',
        href: '/online_ad',
    },
    {
        title: '반응형 웹사이트 개발',
        category: '웹 개발',
        description: '모던한 UI/UX를 갖춘 기업 홈페이지 제작',
        image: '/images/placeholder-project-4.jpg',
        href: '/dev',
    },
    {
        title: '브랜드 홍보 영상',
        category: '영상 제작',
        description: '스토리텔링을 담은 감성적인 브랜드 영상',
        image: '/images/placeholder-project-5.jpg',
        href: '/video',
    },
];

const categoryColors: Record<string, string> = {
    '디자인': 'bg-violet-500',
    '블로그 마케팅': 'bg-emerald-500',
    '온라인 광고': 'bg-orange-500',
    '웹 개발': 'bg-blue-500',
    '영상 제작': 'bg-rose-500',
};

function ProjectCard({ project, index, isFeatured }: { project: Project; index: number; isFeatured: boolean }) {
    const dotColor = categoryColors[project.category] || 'bg-gold';

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl ${
                isFeatured
                    ? 'md:col-span-2 md:row-span-2 ring-1 ring-gold/30'
                    : ''
            }`}
        >
            <Link href={project.href} className="block relative h-full min-h-[280px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            sizes={isFeatured
                                ? '(max-width: 768px) 100vw, 60vw'
                                : '(max-width: 768px) 100vw, 30vw'
                            }
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-navy to-navy-light" />
                    )}
                    {/* Dark overlay - darkens on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/50" />
                </div>

                {/* Category Badge - top left */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        {project.category}
                    </span>
                </div>

                {/* Arrow icon - top right */}
                <div className="absolute top-4 right-4 z-10">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:scale-110">
                        <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                </div>

                {/* Content - bottom, slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-5 lg:p-6">
                    <h3 className={`font-bold text-white mb-1 leading-tight line-clamp-2 ${
                        isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'
                    }`}>
                        {project.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-12 group-hover:mt-2 group-hover:text-white/80">
                        {project.description}
                    </p>
                </div>

                {/* Bottom highlight line - persistent faint + full on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold/30 z-20">
                    <div className="h-full bg-gold scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
                </div>
            </Link>
        </motion.div>
    );
}

export function TrustSection({ projects: projectsProp }: TrustSectionProps) {
    const projects = projectsProp && projectsProp.length > 0 ? projectsProp : fallbackProjects;

    return (
        <section className="py-20 lg:py-32 bg-background">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6"
                >
                    <div>
                        <span className="text-gold text-sm font-medium tracking-wider uppercase">
                            RECENT WORK
                        </span>
                        <h2 className="section-title text-navy mt-2">
                            최근 완료한 프로젝트
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-md text-sm lg:text-base">
                        다양한 산업 분야의 클라이언트와 함께한 최신 작업물입니다.
                    </p>
                </motion.div>

                {/* Gold divider */}
                <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-gold/0 mb-12 lg:mb-16" />

                {/* Dynamic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] md:auto-rows-[220px] gap-3 lg:gap-4">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            isFeatured={index === 0}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
