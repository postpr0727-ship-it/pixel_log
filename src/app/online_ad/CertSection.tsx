'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function CertSection() {
    return (
        <section className="relative py-28 lg:py-40 bg-navy overflow-hidden">
            {/* Background — KAIT logo watermark */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/kait-logo.jpg"
                    alt="KAIT 한국정보통신진흥협회"
                    fill
                    className="object-contain p-16 lg:p-24 opacity-[0.12]"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="max-w-xl"
                    >
                        <span className="text-gold/80 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                            CERTIFIED EXPERTISE
                        </span>
                        <h2 className="section-title !text-white font-black tracking-tighter mb-6">
                            공인된 검색광고<br />전문 역량
                        </h2>
                        <div className="w-20 h-[3px] bg-gradient-to-r from-gold to-gold/40 mb-10 rounded-full" />

                        <div className="p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-white/90 text-lg leading-relaxed mb-8 font-medium">
                                저는 <strong>한국정보통신진흥협회(KAIT)가 발급하는 검색광고마케터 1급</strong> 자격증을 직접 취득한 검색광고 전문가입니다.
                            </p>

                            <ul className="space-y-5">
                                {[
                                    '국가공인 검색광고 자격 최고 등급 개인 취득 (1급)',
                                    '네이버·구글·카카오 검색광고 전략 수립 및 실무 운영 경험',
                                    '키워드 분석, 입찰 최적화, 광고 성과 분석 능력 검증',
                                    '데이터 기반의 체계적인 캠페인 기획 및 개선 역량 보유',
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="mt-1 w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                                            <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-white/80 font-medium leading-relaxed my-auto">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Credential pills */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            {[
                                { label: '발급기관', value: 'KAIT' },
                                { label: '자격등급', value: '1급' },
                                { label: '분야', value: '검색광고 전략·운영·분석' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-gold/20"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                    <span className="text-white/40 text-xs font-bold">{item.label}</span>
                                    <span className="text-white/80 text-xs font-black">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — KAIT logo card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                        className="hidden lg:flex justify-center items-center"
                    >
                        <div className="relative">
                            {/* Glow ring */}
                            <div className="absolute inset-0 rounded-3xl bg-gold/10 blur-2xl scale-110" />
                            <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md p-12 flex flex-col items-center gap-8">
                                {/* KAIT logo */}
                                <div className="w-56 h-16 relative">
                                    <Image
                                        src="/images/kait-logo.jpg"
                                        alt="KAIT"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                                {/* Grade badge */}
                                <div className="text-center">
                                    <p className="text-gold/60 text-xs font-black tracking-[0.35em] uppercase mb-3">
                                        검색광고마케터
                                    </p>
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-gold/50 bg-gold/10">
                                        <div className="text-center">
                                            <p className="text-gold font-black text-3xl leading-none">1</p>
                                            <p className="text-gold/70 text-xs font-black tracking-wider">급</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase text-center">
                                    Korea Association for<br />AI &amp; ICT Promotion
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        </section>
    );
}
