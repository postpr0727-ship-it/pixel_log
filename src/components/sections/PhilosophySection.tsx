'use client';

import { motion } from 'framer-motion';
import {
  Palette,
  Lightbulb,
  Target,
  Layers,
  Globe,
  Layout,
  Smartphone,
  Users,
  Printer,
  Eye,
  FileText,
  BarChart,
  Search,
  TrendingUp,
  Megaphone,
  MousePointer,
  PieChart,
  Code,
  Server,
  Shield,
  Video,
  Clapperboard,
  Wand2,
  LucideIcon,
} from 'lucide-react';

// Map of icon names to components
const iconMap: Record<string, LucideIcon> = {
  Palette,
  Lightbulb,
  Target,
  Layers,
  Globe,
  Layout,
  Smartphone,
  Users,
  Printer,
  Eye,
  FileText,
  BarChart,
  Search,
  TrendingUp,
  Megaphone,
  MousePointer,
  PieChart,
  Code,
  Server,
  Shield,
  Video,
  Clapperboard,
  Wand2,
};

interface PhilosophyItem {
  icon: string;
  title: string;
  description: string;
}

interface PhilosophySectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  items: PhilosophyItem[];
}

export function PhilosophySection({
  title,
  subtitle,
  description,
  items,
}: PhilosophySectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          {subtitle && (
            <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
              {subtitle}
            </span>
          )}
          <h2 className="section-title text-navy mt-2 mb-6 font-black italic tracking-tighter uppercase">{title}</h2>
          {description && (
            <p className="text-navy/70 max-w-2xl mx-auto leading-relaxed font-semibold italic">
              {description}
            </p>
          )}
        </motion.div>

        {/* Philosophy Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Target;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-3xl bg-navy/5 flex items-center justify-center mb-6 group-hover:bg-navy/10 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="h-10 w-10 text-navy" />
                </div>
                <h3 className="text-xl font-black text-navy mb-3 uppercase tracking-tight italic">{item.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed font-bold italic">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
