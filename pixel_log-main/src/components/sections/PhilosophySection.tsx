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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          {subtitle && (
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {subtitle}
            </span>
          )}
          <h2 className="section-title text-navy mt-2 mb-4">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Philosophy Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Target;
            return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                <IconComponent className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
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
