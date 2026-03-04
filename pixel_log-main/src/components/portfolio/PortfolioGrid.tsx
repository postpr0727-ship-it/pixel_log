'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioModal } from './PortfolioModal';
import type { Portfolio } from '@/types';

interface PortfolioGridProps {
  portfolios: Portfolio[];
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function PortfolioGrid({ portfolios, title, subtitle }: PortfolioGridProps) {
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);

  if (portfolios.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              {subtitle && (
                <span className="text-gold text-sm font-medium tracking-wider uppercase">
                  {subtitle}
                </span>
              )}
              {title && (
                <h2 className="section-title text-navy mt-2">{title}</h2>
              )}
            </motion.div>
          )}
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              아직 등록된 포트폴리오가 없습니다.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {subtitle && (
              <span className="text-gold text-sm font-bold tracking-widest uppercase block mb-3">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="section-title text-navy font-bold">{title}</h2>
            )}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onClick={() => setSelectedPortfolio(portfolio)}
            />
          ))}
        </motion.div>

        {/* Portfolio Modal */}
        <PortfolioModal
          portfolio={selectedPortfolio}
          isOpen={!!selectedPortfolio}
          onClose={() => setSelectedPortfolio(null)}
        />
      </div>
    </section>
  );
}
