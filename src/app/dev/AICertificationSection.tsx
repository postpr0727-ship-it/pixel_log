'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AICertificationSection() {
    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-white pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="text-navy/50 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                            QUALIFICATION
                        </span>
                        <h2 className="section-title text-navy font-black tracking-tighter mb-6">
                            AI 기반 프로덕트 디자인 역량
                        </h2>
                        <div className="w-20 h-[3px] bg-gradient-to-r from-navy to-navy/40 mb-8 rounded-full" />

                        <p className="text-navy/70 text-lg leading-relaxed mb-6 font-medium">
                            픽셀로그는 한국인공지능협회에서 인증하는 <strong>AI-PDTQ (AI-aided Product Design Technology Qualification)</strong> 자격증을 취득하여 생성형 AI를 실무에 완벽하게 적용하고 있습니다.
                        </p>

                        <ul className="space-y-4 max-w-lg mb-8">
                            {[
                                'Claude, Figma AI 등 최신 생성형 AI를 활용한 UI/UX 설계',
                                'AI 협업 기반의 디자인 자동화 및 생산성 극대화',
                                '기획, 디자인, 웹 개발 간의 경계를 허무는 혁신적인 프로세스',
                                '압도적인 퀄리티와 빠른 결과물 도출'
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-1 w-5 h-5 rounded-full bg-navy/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-navy/80 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Image Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-navy/5 blur-[80px] rounded-[3rem]" />

                        <div className="relative rounded-[2rem] overflow-hidden border border-navy/10 bg-white p-6 md:p-10 shadow-2xl">
                            <div className="relative w-full aspect-[4/3]">
                                <Image
                                    src="/images/ai-pdtq-cert.png"
                                    alt="한국인공지능협회 AI-PDTQ 자격증"
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    className="drop-shadow-sm hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Decorative dots */}
                        <div className="absolute -top-8 -right-8 w-24 h-24 bg-[radial-gradient(#0B1222_2px,transparent_2px)] [background-size:12px_12px] opacity-10" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[radial-gradient(#0B1222_2px,transparent_2px)] [background-size:12px_12px] opacity-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
