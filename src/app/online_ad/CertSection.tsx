'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function CertSection() {
    return (
        <section className="relative py-28 lg:py-40 bg-navy overflow-hidden">
            {/* Background watermark */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/kait-logo-color.png"
                    alt="KAIT"
                    fill
                    className="object-contain p-20 lg:p-32 opacity-[0.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy/98 via-navy/85 to-navy/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-transparent to-transparent" />
            </div>

            {/* Ambient color from KAIT logo teal */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#00B3A0]/6 blur-[140px] rounded-full pointer-events-none -translate-y-1/3 translate-x-1/4" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* ── Left: Text ───────────────────────────────────── */}
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
                                저는 <strong>한국정보통신진흥협회(KAIT)가 발급하는
                                검색광고마케터 1급</strong> 자격증을 직접 취득한
                                검색광고 전문가입니다.
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

                        {/* Pills */}
                        <div className="flex flex-wrap gap-3 mt-8">
                            {[
                                { label: '발급기관', value: 'KAIT' },
                                { label: '자격등급', value: '1급' },
                                { label: '분야', value: '검색광고 전략·운영·분석' },
                            ].map((item) => (
                                <div key={item.label}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-gold/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                                    <span className="text-white/40 text-xs font-bold">{item.label}</span>
                                    <span className="text-white/80 text-xs font-black">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Right: Premium Certificate Card ──────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:block"
                    >
                        <div className="relative">
                            {/* Outer glow */}
                            <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 via-[#00B3A0]/10 to-transparent rounded-[2.5rem] blur-xl" />

                            {/* Certificate card */}
                            <div className="relative rounded-[2rem] overflow-hidden border border-white/10"
                                style={{ background: 'linear-gradient(145deg, #0E1A2E 0%, #091422 60%, #0B1828 100%)' }}>

                                {/* Top gold bar */}
                                <div className="h-1 w-full bg-gradient-to-r from-gold via-gold/70 to-[#00B3A0]/60" />

                                <div className="p-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-white/25 text-[9px] font-black tracking-[0.4em] uppercase">
                                            Certificate of Qualification
                                        </span>
                                        <div className="flex gap-1.5">
                                            {['#D4A017', '#00B3A0', '#ffffff30'].map((c) => (
                                                <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                                            ))}
                                        </div>
                                    </div>

                                    {/* KAIT Logo — prominent */}
                                    <div className="relative w-full h-20 mb-8">
                                        <Image
                                            src="/images/kait-logo-color.png"
                                            alt="KAIT 한국정보통신진흥협회"
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-px bg-gradient-to-r from-gold/40 via-white/10 to-transparent mb-8" />

                                    {/* Credential name */}
                                    <div className="mb-8">
                                        <p className="text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-3">
                                            자격 종목
                                        </p>
                                        <p className="text-white font-black text-2xl tracking-tight leading-tight">
                                            검색광고마케터
                                        </p>
                                    </div>

                                    {/* Grade — hero element */}
                                    <div className="flex items-end gap-6 mb-8">
                                        <div>
                                            <p className="text-white/40 text-xs font-black tracking-[0.3em] uppercase mb-2">
                                                자격 등급
                                            </p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-gold font-black leading-none"
                                                    style={{ fontSize: 'clamp(4rem, 8vw, 5rem)' }}>
                                                    1
                                                </span>
                                                <span className="text-gold/70 font-black text-2xl">급</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 mb-2">
                                            <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-3" />
                                            <p className="text-white/30 text-[10px] font-bold leading-relaxed">
                                                Korea Association for<br />AI &amp; ICT Promotion
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom seal row */}
                                    <div className="flex items-center justify-between pt-6 border-t border-white/8">
                                        <p className="text-white/20 text-[9px] font-black tracking-widest uppercase">
                                            한국정보통신진흥협회
                                        </p>
                                        {/* Decorative seal */}
                                        <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center">
                                            <span className="text-gold/60 text-xs font-black">★</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom teal bar */}
                                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#00B3A0]/40 to-transparent" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
