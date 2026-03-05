'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioModal } from './PortfolioModal';
import type { Portfolio } from '@/types';

interface PortfolioGridProps {
  portfolios: Portfolio[];
  title?: string;
  subtitle?: string;
  /** When true, always use the two-section layout even if only one affiliation type is present in the current filtered view. */
  forceTwoSections?: boolean;
}

const INITIAL_LIMIT = 6; // 2줄 × 3열

const PIXEL_LOG_KEYWORDS = ['pixel-log', 'pixel log', 'pixellog', '픽셀로그'];

function isPixelLogAffiliation(key: string | null): boolean {
  if (!key) return false;
  const lower = key.toLowerCase();
  return PIXEL_LOG_KEYWORDS.some((kw) => lower.includes(kw));
}

function groupByAffiliation(portfolios: Portfolio[]): { key: string | null; items: Portfolio[] }[] {
  const groupMap = new Map<string, Portfolio[]>();
  const nullGroup: Portfolio[] = [];

  for (const p of portfolios) {
    const key = p.affiliation?.trim() || null;
    if (key) {
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push(p);
    } else {
      nullGroup.push(p);
    }
  }

  const namedGroups: { key: string | null; items: Portfolio[] }[] = Array.from(groupMap.entries())
    .map(([key, items]) => ({ key, items, minOrder: Math.min(...items.map((i) => i.display_order)) }))
    .sort((a, b) => a.minOrder - b.minOrder)
    .map(({ key, items }) => ({ key, items }));

  if (nullGroup.length > 0) {
    namedGroups.push({ key: null, items: nullGroup });
  }

  return namedGroups;
}

function CardGrid({ items, onSelect }: { items: Portfolio[]; onSelect: (p: Portfolio) => void }) {
  const [showAll, setShowAll] = useState(false);
  const needsToggle = items.length > INITIAL_LIMIT;
  const visibleItems = showAll ? items : items.slice(0, INITIAL_LIMIT);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {visibleItems.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            onClick={() => onSelect(portfolio)}
          />
        ))}
      </div>

      {needsToggle && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-navy/20 rounded-full text-sm font-black uppercase tracking-wider text-navy hover:bg-navy hover:text-white hover:border-navy transition-all duration-300"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-4 w-4" />
                접기
              </>
            ) : (
              <>
                더보기
                <span className="bg-gold text-navy px-2 py-0.5 rounded-full text-xs">
                  +{items.length - INITIAL_LIMIT}
                </span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export function PortfolioGrid({ portfolios, title, subtitle, forceTwoSections }: PortfolioGridProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  if (portfolios.length === 0) {
    return (
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {subtitle && (
                <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="section-title text-navy font-black italic tracking-tighter uppercase">{title}</h2>
              )}
            </motion.div>
          )}
          <div className="text-center py-24 bg-navy/5 rounded-3xl border border-navy/10">
            <p className="text-navy/40 font-bold italic text-lg">
              아직 등록된 포트폴리오가 없습니다.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const groups = groupByAffiliation(portfolios);
  const pixelLogGroups = groups.filter((g) => isPixelLogAffiliation(g.key));
  const prevGroups = groups.filter((g) => !isPixelLogAffiliation(g.key));
  // Use two-section layout when:
  // 1. forceTwoSections explicitly set (used by PortfolioFilter across all tabs), OR
  // 2. auto-detect: any portfolio has a named affiliation (PIXEL-LOG or previous work)
  //    – this ensures service pages show section banners whenever affiliation data exists,
  //      even if only one type is present in that category.
  const hasNamedAffiliation =
    pixelLogGroups.length > 0 || prevGroups.some((g) => g.key !== null);
  const renderTwoSections = forceTwoSections ?? hasNamedAffiliation;

  // If no distinction (all same type), fall back to the original flat grouping
  if (!renderTwoSections) {
    const showHeaders = groups.length > 1;
    return (
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16 lg:mb-24"
            >
              {subtitle && (
                <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="section-title text-navy font-black italic tracking-tighter uppercase">{title}</h2>
              )}
            </motion.div>
          )}
          <div className="space-y-16">
            {groups.map((group, groupIndex) => (
              <div key={group.key ?? '__unaffiliated__'}>
                {showHeaders && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="w-1 h-6 bg-gold rounded-full flex-shrink-0" />
                    <span className="text-navy font-black tracking-widest uppercase text-sm">
                      {group.key ?? '미분류'}
                    </span>
                    <div className="flex-1 h-px bg-navy/10" />
                  </motion.div>
                )}
                <CardGrid items={group.items} onSelect={setSelectedPortfolio} />
              </div>
            ))}
          </div>
        </div>
        <PortfolioModal
          portfolio={selectedPortfolio}
          isOpen={!!selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
        />
      </section>
    );
  }

  // ─── Two clearly separated sections ──────────────────────────────────────────
  const showJumpBar = pixelLogGroups.length > 0 && prevGroups.length > 0;

  return (
    <>
      {/* Jump Navigation Bar */}
      {showJumpBar && (
        <div className="bg-navy/5 border-y border-navy/10 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 flex-wrap">
            <span className="text-navy/40 text-xs font-black tracking-widest uppercase">JUMP TO</span>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="#pixel-log-works"
                className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-black tracking-wider uppercase rounded-full hover:bg-navy/80 transition-colors"
              >
                <span className="w-2 h-2 bg-gold rounded-full flex-shrink-0" />
                PIXEL-LOG 작업
                <span className="opacity-60">↓</span>
              </a>
              <a
                href="#previous-works"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-navy/20 text-navy text-xs font-black tracking-wider uppercase rounded-full hover:bg-navy/5 transition-colors"
              >
                <span className="w-2 h-2 bg-navy/30 rounded-full flex-shrink-0" />
                이전 직장 작업
                <span className="opacity-60">↓</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ① PIXEL-LOG 작업 ─────────────────────────────────────────────────── */}
      <section id="pixel-log-works" className="scroll-mt-28 py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-20"
          >
            <div className="relative bg-navy rounded-3xl px-10 py-10 overflow-hidden">
              {/* decorative gold stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold rounded-l-3xl" />
              {/* decorative large text */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/[0.04] font-black italic text-[80px] lg:text-[110px] uppercase leading-none select-none pointer-events-none">
                PIXEL LOG
              </div>
              <div className="relative pl-6">
                <span className="text-gold text-xs font-black tracking-[0.35em] uppercase block mb-3">
                  CURRENT WORKS
                </span>
                <h2 className="text-white font-black italic text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-3">
                  PIXEL-LOG 작업
                </h2>
                <p className="text-white/50 font-bold text-sm">
                  준앤준솔루션 픽셀로그에서 직접 기획 · 진행한 프로젝트
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cards (grouped by sub-affiliation if multiple PIXEL-LOG entries) */}
          <div className="space-y-16">
            {pixelLogGroups.map((group, idx) => (
              <div key={group.key ?? '__pl__'}>
                {pixelLogGroups.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="w-1 h-6 bg-gold rounded-full flex-shrink-0" />
                    <span className="text-navy font-black tracking-widest uppercase text-sm">
                      {group.key ?? '미분류'}
                    </span>
                    <div className="flex-1 h-px bg-navy/10" />
                  </motion.div>
                )}
                <CardGrid items={group.items} onSelect={setSelectedPortfolio} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ② 이전 직장 작업 ────────────────────────────────────────────────────── */}
      <section id="previous-works" className="scroll-mt-28 py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0 grid-pattern opacity-[0.04] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-20"
          >
            <div className="relative bg-white border-2 border-navy/10 rounded-3xl px-10 py-10 overflow-hidden">
              {/* decorative left stripe */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-navy/20 rounded-l-3xl" />
              {/* decorative large text */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 text-navy/[0.04] font-black italic text-[80px] lg:text-[110px] uppercase leading-none select-none pointer-events-none">
                PREV
              </div>
              <div className="relative pl-6">
                <span className="text-navy/40 text-xs font-black tracking-[0.35em] uppercase block mb-3">
                  PREVIOUS WORKS
                </span>
                <h2 className="text-navy font-black italic text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-3">
                  이전 직장 작업
                </h2>
                <p className="text-navy/50 font-bold text-sm">
                  준앤준솔루션 입사 전, 픽셀로그가 타 업체에 재직 중 진행한 프로젝트
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cards (one sub-header per previous company if multiple) */}
          <div className="space-y-16">
            {prevGroups.map((group, idx) => (
              <div key={group.key ?? '__unaffiliated__'}>
                {prevGroups.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex items-center gap-4 mb-10"
                  >
                    <div className="w-1 h-6 bg-navy/30 rounded-full flex-shrink-0" />
                    <span className="text-navy/60 font-black tracking-widest uppercase text-sm">
                      {group.key ?? '미분류'}
                    </span>
                    <div className="flex-1 h-px bg-navy/10" />
                  </motion.div>
                )}
                <CardGrid items={group.items} onSelect={setSelectedPortfolio} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioModal
        portfolio={selectedPortfolio}
        isOpen={!!selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
      />
    </>
  );
}
