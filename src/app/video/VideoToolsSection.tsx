'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const tools = [
    {
        name: 'Adobe Premiere Pro',
        description: '업계 표준 영상 편집 소프트웨어로, 고품질 컷 편집과 컬러 그레이딩, 사운드 디자인을 전문적으로 수행합니다.',
        color: '#2D1A47',
        image: '/images/premiere-logo.svg'
    },
    {
        name: 'CapCut',
        description: '트렌디한 숏폼 콘텐츠와 빠른 템플릿 기반의 감각적인 영상 편집을 위해 활용합니다.',
        color: '#000000',
        image: '/images/capcut-logo-new.png'
    }
];

export function VideoToolsSection() {
    return (
        <section className="py-24 lg:py-32 bg-navy relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 grid-pattern opacity-[0.05] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <span className="text-white/60 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                        PRODUCTION TOOLS
                    </span>
                    <h2 className="section-title !text-white mt-2 font-black italic tracking-tighter uppercase">
                        사용 프로그램
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {tools.map((tool, index) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="relative z-10 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 overflow-hidden h-full">
                                {/* Tool Icon Container */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-24 h-24 mb-10 relative">
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" />
                                        <div className="relative w-full h-full flex items-center justify-center p-2">
                                            <Image
                                                src={tool.image}
                                                alt={tool.name}
                                                width={96}
                                                height={96}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-6 uppercase italic tracking-tight group-hover:text-gold transition-colors">
                                        {tool.name}
                                    </h3>
                                    <p className="text-white/60 text-base lg:text-lg leading-relaxed font-bold italic break-keep">
                                        {tool.description}
                                    </p>
                                </div>

                                {/* Decorative Gradient */}
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 blur-3xl rounded-full group-hover:bg-white/10 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
