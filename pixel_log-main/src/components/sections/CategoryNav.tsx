'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Palette,
  Globe,
  Printer,
  Code2,
  LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Globe,
  Printer,
  Code2,
};

interface Category {
  title: string;
  titleEn: string;
  description: string;
  href: string;
  icon: string;
  gradient: string;
}

interface CategoryNavProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function CategoryNav({ categories, title, subtitle }: CategoryNavProps) {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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

        {/* Category Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || Palette;
            return (
            <motion.div key={category.title} variants={itemVariants}>
              <Link href={category.href}>
                <Card className="group h-full border-border/50 hover:border-gold/50 card-hover cursor-pointer bg-white overflow-hidden">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <span className="text-gold text-xs font-medium tracking-wider">
                        {category.titleEn}
                      </span>
                      <h3 className="text-2xl font-bold text-navy mt-1 group-hover:text-gold transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {category.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-gold font-medium group-hover:translate-x-2 transition-transform">
                      포트폴리오 보기
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
