'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AICertificationSection() {
    return (
        <section className="relative py-28 lg:py-40 bg-navy overflow-hidden">
            {/* Background Image with Overlays */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/ai-pdtq-cert.png"
                    alt="AI-PDTQ Certificate Background"
                    fill
                    className="object-cover object-center opacity-70"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/70 to-navy/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-xl"
                    >
                        <span className="text-gold/80 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                            QUALIFICATION
                        </span>
                        <h2 className="section-title !text-white font-black tracking-tighter mb-6">
                            AI 기반 프로덕트<br />디자인 역량
                        </h2>
                        <div className="w-20 h-[3px] bg-gradient-to-r from-gold to-gold/40 mb-10 rounded-full" />

                        <div className="p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <p className="text-white/90 text-lg leading-relaxed mb-8 font-medium">
                                저는 한국인공지능협회에서 인증하는 <strong>AI-PDTQ (AI-aided Product Design Technology Qualification)</strong> 자격증을 직접 취득하여 생성형 AI를 실무에 적용하고 있습니다.
                            </p>

                            <ul className="space-y-5">
                                {[
                                    'Claude, Figma AI 등 최신 생성형 AI를 활용한 UI/UX 설계',
                                    'AI 협업 기반의 디자인 자동화 및 생산성 극대화',
                                    '기획, 디자인, 웹 개발 간의 경계를 허무는 혁신적인 프로세스',
                                    '압도적인 퀄리티와 빠른 결과물 도출'
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
                    </motion.div>

                    {/* Empty space for the right side to let the background show through slightly */}
                    <div className="hidden lg:block"></div>

                </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
        </section>
    );
}
