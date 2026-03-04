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
  description?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHero({
  title,
  titleEn,
  description,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 bg-navy overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.1] pointer-events-none" />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-50%] right-[-10%] w-[800px] h-[800px] bg-white border border-white/20 opacity-5 rotate-45"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex justify-center"
          >
            <ol className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20">
              <li>
                <Link
                  href="/"
                  className="text-white/40 hover:text-white transition-colors"
                >
                  HOME
                </Link>
              </li>
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-white/20" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
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
              className="text-white/60 text-sm md:text-base font-black tracking-[0.3em] uppercase mb-4 block"
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {titleEn}
            </motion.span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium break-keep">
              {description}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
