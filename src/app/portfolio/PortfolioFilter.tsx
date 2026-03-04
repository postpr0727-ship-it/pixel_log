'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PortfolioGrid } from '@/components/portfolio';
import type { Portfolio, PortfolioCategory } from '@/types';

const PIXEL_LOG_KEYWORDS = ['pixel-log', 'pixel log', 'pixellog', '픽셀로그'];
function isPixelLog(affiliation?: string): boolean {
  if (!affiliation) return false;
  const lower = affiliation.toLowerCase();
  return PIXEL_LOG_KEYWORDS.some((kw) => lower.includes(kw));
}

type TabValue = 'all' | 'design' | 'blog' | 'online_ad' | 'dev' | 'video';

const tabs: { label: string; value: TabValue }[] = [
  { label: '전체', value: 'all' },
  { label: '디자인', value: 'design' },
  { label: '블로그 마케팅', value: 'blog' },
  { label: '온라인 광고', value: 'online_ad' },
  { label: '웹 개발', value: 'dev' },
  { label: '영상', value: 'video' },
];

const categoryMap: Record<TabValue, PortfolioCategory[]> = {
  all: [],
  design: ['design'],
  blog: ['blog_marketing'],
  online_ad: ['online_ad'],
  dev: ['dev'],
  video: ['video'],
};

interface PortfolioFilterProps {
  portfolios: Portfolio[];
}

export function PortfolioFilter({ portfolios }: PortfolioFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramCategory = (searchParams.get('category') as TabValue) ?? 'all';
  const initialTab = tabs.some((t) => t.value === paramCategory) ? paramCategory : 'all';
  const [activeTab, setActiveTab] = useState<TabValue>(initialTab);

  useEffect(() => {
    const cat = (searchParams.get('category') as TabValue) ?? 'all';
    if (tabs.some((t) => t.value === cat)) {
      setActiveTab(cat);
    }
  }, [searchParams]);

  const handleTabClick = (value: TabValue) => {
    setActiveTab(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.replace(`/portfolio?${params.toString()}`, { scroll: false });
  };

  const filtered =
    activeTab === 'all'
      ? portfolios
      : portfolios.filter((p) =>
          categoryMap[activeTab].includes(p.category as PortfolioCategory)
        );

  // Globally, does this portfolio have both PIXEL-LOG and previous work?
  // If yes, always show the two-section layout regardless of the active tab filter.
  const forceTwoSections =
    portfolios.some((p) => isPixelLog(p.affiliation)) &&
    portfolios.some((p) => !isPixelLog(p.affiliation));

  return (
    <div>
      {/* Tab Bar */}
      <div className="sticky top-24 lg:top-28 z-30 bg-white border-b border-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabClick(tab.value)}
                className={`relative flex-shrink-0 px-5 py-3 text-sm font-bold transition-colors whitespace-nowrap ${
                  activeTab === tab.value
                    ? 'text-navy'
                    : 'text-navy/40 hover:text-navy/70'
                }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="portfolio-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ duration: 0.25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <PortfolioGrid portfolios={filtered} forceTwoSections={forceTwoSections} />
    </div>
  );
}
