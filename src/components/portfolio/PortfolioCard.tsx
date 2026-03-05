'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Play } from 'lucide-react';
import type { Portfolio, PortfolioCategory } from '@/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick: () => void;
}

const categoryLabels: Record<PortfolioCategory, string> = {
  design: 'Design',
  blog_marketing: 'Blog / SNS',
  online_ad: 'Ad',
  dev: 'Dev',
  video: 'Video',
};

export function PortfolioCard({ portfolio, onClick }: PortfolioCardProps) {
  const hasImages = portfolio.images && portfolio.images.length > 0;
  const hasLink = !!portfolio.link_url;
  const isVideo = portfolio.category === 'video';

  const handleClick = () => {
    if (!hasImages && hasLink) {
      window.open(portfolio.link_url, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onClick={handleClick}
      className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[4/3] bg-navy shadow-md hover:shadow-2xl transition-shadow duration-500"
    >
      {/* Full-bleed image */}
      {portfolio.thumbnail_url ? (
        <Image
          src={portfolio.thumbnail_url}
          alt={portfolio.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy/70" />
      )}

      {/* Gradient overlay — darker at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      {/* Hover: subtle color wash */}
      <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Top: category badge + action icon */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/90 text-[10px] font-bold tracking-[0.18em] uppercase border border-white/10">
          {categoryLabels[portfolio.category]}
        </span>

        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
          {isVideo ? (
            <Play className="h-4 w-4 text-white fill-white" />
          ) : hasImages ? (
            <ArrowUpRight className="h-4 w-4 text-white" />
          ) : (
            <ExternalLink className="h-4 w-4 text-white" />
          )}
        </div>
      </div>

      {/* Bottom: content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Gold accent line */}
        <div className="w-8 h-0.5 bg-gold mb-3 transition-all duration-300 group-hover:w-14" />

        <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-1">
          {portfolio.title}
        </h3>

        {portfolio.description && (
          <p className="text-white/55 text-xs leading-relaxed line-clamp-1 mb-3">
            {portfolio.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-white/70 text-[11px] font-semibold tracking-wider uppercase">
            {portfolio.client_name || '\u00A0'}
          </span>

          {hasLink && (
            <a
              href={portfolio.link_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gold text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 hover:text-gold/80 transition-colors"
            >
              LINK <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
