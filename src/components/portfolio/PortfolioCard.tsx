'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Portfolio } from '@/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onClick: () => void;
}

export function PortfolioCard({ portfolio, onClick }: PortfolioCardProps) {
  const hasImages = portfolio.images && portfolio.images.length > 0;
  const hasLink = !!portfolio.link_url;

  // 이미지 없고 링크만 있으면 클릭 시 외부 링크로 이동
  const handleClick = () => {
    if (!hasImages && hasLink) {
      window.open(portfolio.link_url, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleClick}
      className="group relative cursor-pointer rounded-3xl bg-white border border-navy/10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
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
            {hasImages ? <ArrowUpRight className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="font-black italic text-navy text-2xl group-hover:underline underline-offset-8 transition-all line-clamp-1 uppercase tracking-tight mb-4">
          {portfolio.title}
        </h3>

        {portfolio.description && (
          <p className="text-navy/60 text-sm line-clamp-2 leading-relaxed mb-6 font-bold italic">
            {portfolio.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-navy/10">
          {portfolio.client_name ? (
            <span className="text-navy/40 text-xs font-black tracking-[0.2em] uppercase">
              {portfolio.client_name}
            </span>
          ) : <span />}

          <div className="flex items-center gap-3">
            {hasLink && (
              <a
                href={portfolio.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-gold font-black italic text-xs flex items-center gap-1 hover:underline underline-offset-4 uppercase tracking-wider"
              >
                바로가기 <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {hasImages && (
              <span className="text-navy font-black italic text-xs flex items-center gap-2 group-hover:translate-x-2 transition-transform uppercase tracking-wider">
                VIEW <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
