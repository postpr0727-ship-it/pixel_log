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
}

const INITIAL_LIMIT = 6; // 2줄 × 3열

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

export function PortfolioGrid({ portfolios, title, subtitle }: PortfolioGridProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

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

        {/* 통합 안내 배너 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="relative bg-navy rounded-3xl px-10 py-10 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gold rounded-l-3xl" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/[0.04] font-black italic text-[80px] lg:text-[110px] uppercase leading-none select-none pointer-events-none">
              PORTFOLIO
            </div>
            <div className="relative pl-6">
              <span className="text-gold text-xs font-black tracking-[0.35em] uppercase block mb-3">
                INTEGRATED WORKS
              </span>
              <h2 className="text-white font-black italic text-3xl lg:text-4xl uppercase tracking-tight leading-tight mb-3">
                통합 포트폴리오
              </h2>
              <p className="text-white/50 font-bold text-sm">
                이전 소속된 직장 및 PIXEL-LOG에서 진행한 프로젝트를 통합한 포트폴리오입니다.
              </p>
            </div>
          </div>
        </motion.div>

        {portfolios.length === 0 ? (
          <div className="text-center py-24 bg-navy/5 rounded-3xl border border-navy/10">
            <p className="text-navy/40 font-bold italic text-lg">
              아직 등록된 포트폴리오가 없습니다.
            </p>
          </div>
        ) : (
          <CardGrid items={portfolios} onSelect={setSelectedPortfolio} />
        )}
      </div>

      <PortfolioModal
        portfolio={selectedPortfolio}
        isOpen={!!selectedPortfolio}
        onClose={() => setSelectedPortfolio(null)}
      />
    </section>
  );
}
