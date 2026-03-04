'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  titleEn?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({
  title,
  titleEn,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-navy-light/40 rounded-full blur-[100px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <ol className="flex items-center gap-2 text-sm bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <li>
                <Link
                  href="/"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  홈
                </Link>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-3.5 w-3.5 text-white/40" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gold font-medium">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>
        )}

        {/* Title Group */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {titleEn && (
            <motion.span
              className="text-gold text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4 block"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {titleEn}
            </motion.span>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {title}
          </h1>
          {description && (
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
