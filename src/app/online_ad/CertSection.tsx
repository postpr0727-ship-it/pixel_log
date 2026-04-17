'use client';

import { motion } from 'framer-motion';

export function CertSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#06090F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="flex-shrink-0 relative"
          >
            {/* Outer ring glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/30 to-yellow-600/20 blur-2xl scale-125" />

            {/* Badge body */}
            <div className="relative w-52 h-52 rounded-full flex flex-col items-center justify-center
              bg-gradient-to-br from-[#1C1400] via-[#2A1F00] to-[#111000]
              border-4 border-amber-500/60
              shadow-[0_0_40px_rgba(245,158,11,0.25),0_0_80px_rgba(245,158,11,0.1),inset_0_1px_0_rgba(255,255,255,0.08)]
            ">
              {/* Inner ring */}
              <div className="absolute inset-3 rounded-full border border-amber-500/20" />

              {/* Content */}
              <div className="text-center px-4 relative z-10">
                {/* Star icon */}
                <div className="text-3xl mb-1 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]">★</div>

                <p className="text-amber-400/70 text-[9px] font-black tracking-[0.25em] uppercase mb-1">
                  KAIT 공인
                </p>
                <p className="text-amber-300 text-[11px] font-black tracking-wider leading-tight mb-2">
                  검색광고마케터
                </p>
                <div className="inline-block bg-amber-500 text-black text-[10px] font-black tracking-[0.15em] px-3 py-0.5 rounded-full">
                  1급
                </div>
              </div>

              {/* Bottom label */}
              <p className="absolute bottom-7 text-[8px] text-amber-500/50 font-bold tracking-widest uppercase">
                한국정보통신진흥협회
              </p>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-amber-500/60 text-xs font-black tracking-[0.3em] uppercase mb-4 block"
            >
              CERTIFIED EXPERTISE
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-5"
            >
              공인 자격으로<br />
              <span className="text-amber-400">검증된 실력</span>을 보장합니다
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-base leading-relaxed font-medium mb-8 max-w-lg"
            >
              한국정보통신진흥협회(KAIT)가 발급하는{' '}
              <span className="text-amber-400/80 font-bold">검색광고마케터 1급</span> 자격증은
              검색광고 전략 수립부터 실무 운영·분석까지 전 과정에 대한 전문성을 국가공인기관이 인증한 자격입니다.
              단순 집행이 아닌, 데이터에 기반한 체계적 운영을 약속합니다.
            </motion.p>

            {/* Credential pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {[
                { label: '발급기관', value: 'KAIT (한국정보통신진흥협회)' },
                { label: '자격등급', value: '1급' },
                { label: '분야', value: '검색광고 전략·운영·분석' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/4 border border-amber-500/20 backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                  <span className="text-white/40 text-xs font-bold">{item.label}</span>
                  <span className="text-white/80 text-xs font-black">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
