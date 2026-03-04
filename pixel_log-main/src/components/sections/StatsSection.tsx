'use client';

import { motion } from 'framer-motion';

const marqueeWords = [
  'BRANDING',
  'WEB DESIGN',
  'DEVELOPMENT',
  'BLOG MARKETING',
  'SEO',
  'ONLINE ADS',
  'UI/UX',
  'VIDEO',
  'CONSULTING',
  'STRATEGY',
  'CREATIVE',
  'GROWTH',
];

export function StatsSection() {
  const doubled = [...marqueeWords, ...marqueeWords];

  return (
    <section className="relative py-6 lg:py-8 bg-navy overflow-hidden">
      {/* Refined Border Accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Single Row Marquee with Fade Mask */}
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex overflow-hidden select-none">
          <motion.div
            className="flex items-center shrink-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {doubled.map((word, i) => (
              <span key={`fwd-${i}`} className="flex items-center shrink-0">
                <span
                  className={`text-sm md:text-base lg:text-lg font-medium tracking-[0.15em] uppercase px-4 lg:px-6 ${
                    i % marqueeWords.length % 4 === 0
                      ? 'text-gold font-semibold'
                      : i % 2 === 0
                        ? 'text-white/70'
                        : 'text-white/30'
                  }`}
                >
                  {word}
                </span>
                <span className="text-gold/70 text-xs">&#x2726;</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
