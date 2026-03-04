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
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 lg:mb-32"
        >
          <div>
            <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
              OUR STORY
            </span>
            <h2 className="section-title text-navy mt-2 mb-8 font-black italic tracking-tighter uppercase leading-none">
              PIXEL-LOG,
              <br />
              픽셀로 기록하다
            </h2>
            <div className="space-y-6 text-navy/70 leading-relaxed font-bold italic text-lg">
              <p>
                PIXEL-LOG는 &ldquo;픽셀(Pixel)&rdquo;과 &ldquo;기록(Log)&rdquo;의 합성어입니다.<br className="hidden lg:block" />
                디지털 세상의 가장 작은 단위인 픽셀 하나하나에 정성을 담아,<br className="hidden lg:block" />
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
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-navy flex items-center justify-center shadow-2xl transition-transform duration-700 group-hover:rotate-2">
              <Image
                src="/images/logo-white.png"
                alt="PIXEL-LOG"
                width={300}
                height={100}
                className="w-1/2 h-auto"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-navy/5 rounded-[4rem] -z-10 animate-pulse-slow" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-navy/10 rounded-[3rem] -z-10 animate-float" />
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="text-navy/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            OUR VALUES
          </span>
          <h2 className="section-title text-navy mt-2 font-black italic tracking-tighter uppercase">
            PIXEL-LOG가 추구하는 가치
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-navy/5 flex items-center justify-center mb-8 group-hover:bg-navy/10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                <value.icon className="h-10 w-10 text-navy" />
              </div>
              <h3 className="text-2xl font-black text-navy mb-4 italic uppercase tracking-tight">{value.title}</h3>
              <p className="text-navy/60 text-base leading-relaxed font-bold italic break-keep">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div >
    </section >
  );
}
