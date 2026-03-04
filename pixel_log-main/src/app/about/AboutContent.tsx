'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Lightbulb, Users, Zap } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: '목표 지향',
    description: '클라이언트의 비즈니스 목표를 명확히 이해하고, 그 목표 달성을 위한 최적의 솔루션을 제공합니다.',
  },
  {
    icon: Lightbulb,
    title: '창의적 접근',
    description: '트렌드를 읽고 창의적인 아이디어로 브랜드의 차별화된 가치를 만들어냅니다.',
  },
  {
    icon: Users,
    title: '파트너십',
    description: '단순한 외주가 아닌, 함께 성장하는 비즈니스 파트너로서 긴밀히 협력합니다.',
  },
  {
    icon: Zap,
    title: '빠른 실행력',
    description: '효율적인 프로세스로 빠르게 결과물을 도출하고, 지속적인 피드백을 반영합니다.',
  },
];

export function AboutContent() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
        >
          <div>
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              OUR STORY
            </span>
            <h2 className="section-title text-navy mt-2 mb-6">
              PIXEL-LOG,
              <br />
              픽셀로 기록하다
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                PIXEL-LOG는 &ldquo;픽셀(Pixel)&rdquo;과 &ldquo;기록(Log)&rdquo;의 합성어입니다.
                디지털 세상의 가장 작은 단위인 픽셀 하나하나에 정성을 담아,
                클라이언트의 비즈니스 스토리를 기록합니다.
              </p>
              <p>
                브랜드 아이덴티티 구축부터 웹 개발, 콘텐츠 마케팅, 영상 제작까지
                비즈니스 성장에 필요한 모든 크리에이티브 솔루션을 제공합니다.
              </p>
              <p>
                우리는 단순히 결과물을 만드는 것이 아니라,
                클라이언트의 비즈니스가 성장하는 과정을 함께 합니다.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
              <Image
                src="/images/logo-white.png"
                alt="PIXEL-LOG"
                width={300}
                height={100}
                className="w-3/4 h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-navy/10 rounded-2xl -z-10" />
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            OUR VALUES
          </span>
          <h2 className="section-title text-navy mt-2">
            PIXEL-LOG가 추구하는 가치
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                <value.icon className="h-8 w-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
