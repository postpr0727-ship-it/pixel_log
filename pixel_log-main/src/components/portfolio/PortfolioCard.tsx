'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, ArrowUpRight } from 'lucide-react';
import type { Portfolio } from '@/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick: () => void;
}

export function PortfolioCard({ portfolio, onClick }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl bg-white border border-border/40 shadow-sm hover:shadow-xl hover:shadow-gold/10 transition-all duration-300 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={portfolio.thumbnail_url || '/images/placeholder.png'}
          alt={portfolio.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

        <div className="absolute top-4 right-4 translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center shadow-lg">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-navy text-xl group-hover:text-gold transition-colors line-clamp-1 flex-1 pr-4">
            {portfolio.title}
          </h3>
        </div>

        {portfolio.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
            {portfolio.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          {portfolio.client_name ? (
            <span className="text-gold text-xs font-bold tracking-wider uppercase">
              {portfolio.client_name}
            </span>
          ) : <span />}

          <span className="text-navy-muted text-xs font-medium group-hover:text-navy transition-colors flex items-center gap-1">
            자세히 보기 <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
