'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const tools = [
    {
        name: 'Adobe Photoshop',
        description: '고해상도 이미지 편집, 합성 및 최상의 비주얼 아트웍 제작을 위한 기본 도구입니다.',
        color: '#31A8FF',
        image: '/images/photoshop-logo.png'
    },
    {
        name: 'Adobe Illustrator',
        description: '브랜드 로고, 아이콘, 벡터 그래픽 등 크기에 구애받지 않는 선명한 디자인을 제작합니다.',
        color: '#FF9A00',
        image: '/images/illustrator-logo.png'
    },
    {
        name: 'Canva Pro',
        description: '빠른 소셜 미디어 콘텐츠 제작과 클라이언트와의 원활한 디자인 협업을 위해 활용합니다.',
        color: '#00C4CC',
        image: '/images/canva-logo.svg'
    }
];

export function DesignToolsSection() {
    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-white pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <span className="text-navy/50 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
                        CREATIVE TOOLS
                    </span>
                    <h2 className="section-title text-navy font-black italic tracking-tighter mb-6">
                        프로페셔널 디자인 툴
                    </h2>
                    <div className="w-24 h-[4px] bg-gradient-to-r from-navy to-navy/30 mx-auto rounded-full mb-6" />
                    <p className="text-navy/60 max-w-xl mx-auto font-medium leading-relaxed">
                        업계 표준 디자인 소프트웨어와 최신 협업 툴을 활용하여 압도적인 퀄리티의 결과물을 빠르고 정확하게 제작합니다.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {tools.map((tool, i) => (
                        <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className="group relative bg-white rounded-[2rem] p-8 lg:p-10 border border-navy/5 shadow-xl shadow-navy/5 hover:shadow-2xl hover:shadow-navy/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ backgroundColor: tool.color }}
                            />

                            <div className="w-20 h-20 mb-8 transform group-hover:scale-110 transition-transform duration-500 relative">
                                <Image
                                    src={tool.image}
                                    alt={tool.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <h3 className="text-2xl font-black text-navy mb-4">{tool.name}</h3>
                            <p className="text-navy/60 leading-relaxed font-medium">
                                {tool.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
