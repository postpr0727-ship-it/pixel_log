'use client';

import { motion } from 'framer-motion';

const tools = [
    {
        name: 'Adobe Photoshop',
        description: '고해상도 이미지 편집, 합성 및 최상의 비주얼 아트웍 제작을 위한 기본 도구입니다.',
        color: '#31A8FF',
        // Simple SVG representation of Ps logo
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#001D26" />
                <path d="M30 75V25H48C56 25 62 29 62 38C62 47 56 51 48 51H40V75H30ZM40 33V43H47C50 43 52 41 52 38C52 35 50 33 47 33H40Z" fill="#31A8FF" />
                <path d="M72 76C64 76 58 71 58 63H68C68 66 70 68 73 68C76 68 78 66 78 64C78 61 76 60 70 58C62 55 58 50 58 43C58 35 64 30 72 30C80 30 86 35 86 42H76C76 39 74 37 72 37C69 37 67 39 67 41C67 44 69 45 75 47C83 50 88 55 88 62C88 70 82 76 72 76Z" fill="#31A8FF" />
            </svg>
        )
    },
    {
        name: 'Adobe Illustrator',
        description: '브랜드 로고, 아이콘, 벡터 그래픽 등 크기에 구애받지 않는 선명한 디자인을 제작합니다.',
        color: '#FF9A00',
        // Simple SVG representation of Ai logo
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#260F00" />
                <path d="M42 75L35 55L28 75H18L30 35H40L52 75H42ZM31 43L35 30L39 43H31ZM68 75V35H78V75H68ZM73 28C69.6863 28 67 25.3137 67 22C67 18.6863 69.6863 16 73 16C76.3137 16 79 18.6863 79 22C79 25.3137 76.3137 28 73 28Z" fill="#FF9A00" />
            </svg>
        )
    },
    {
        name: 'Canva Pro',
        description: '빠른 소셜 미디어 콘텐츠 제작과 클라이언트와의 원활한 디자인 협업을 위해 활용합니다.',
        color: '#00C4CC',
        // Simple SVG representation of Canva logo
        svg: (
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#00C4CC" />
                <path d="M50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80ZM50 70C61.0457 70 70 61.0457 70 50C70 38.9543 61.0457 30 50 30C38.9543 30 30 38.9543 30 50C30 61.0457 38.9543 70 50 70Z" fill="white" />
                <circle cx="50" cy="50" r="10" fill="white" />
            </svg>
        )
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

                            <div className="w-20 h-20 mb-8 transform group-hover:scale-110 transition-transform duration-500">
                                {tool.svg}
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
