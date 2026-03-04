'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, Building2, Briefcase, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Portfolio } from '@/types';

interface PortfolioModalProps {
  portfolio: Portfolio | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PortfolioModal({ portfolio, isOpen, onClose }: PortfolioModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!portfolio) return null;

  const allImages = [portfolio.thumbnail_url, ...(portfolio.images || [])].filter(Boolean);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">{portfolio.title}</DialogTitle>
        {/* Image Gallery */}
        <div className="relative aspect-[16/10] bg-navy-dark">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={allImages[currentImageIndex] || '/images/placeholder.png'}
                alt={`${portfolio.title} - ${currentImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 95vw, 896px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {allImages.length}
              </div>
            </>
          )}

          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          <h2 className="text-2xl font-bold text-navy mb-4">{portfolio.title}</h2>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            {portfolio.client_name && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Building2 className="h-4 w-4" />
                <span>{portfolio.client_name}</span>
              </div>
            )}
            {portfolio.project_date && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="h-4 w-4" />
                <span>{portfolio.project_date}</span>
              </div>
            )}
            {portfolio.affiliation && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Briefcase className="h-4 w-4" />
                <span>{portfolio.affiliation}</span>
              </div>
            )}
          </div>

          {/* External Link */}
          {portfolio.link_url && (
            <a
              href={portfolio.link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-navy text-white text-sm font-black uppercase tracking-wider rounded-full hover:bg-navy/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              바로가기
            </a>
          )}

          {/* Description */}
          {portfolio.description && (
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="whitespace-pre-wrap">{portfolio.description}</p>
            </div>
          )}

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="mt-6 pt-6 border-t">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-[1rem] overflow-hidden border-2 transition-all ${index === currentImageIndex
                      ? 'border-gold'
                      : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
