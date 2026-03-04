'use client';

import { motion } from 'framer-motion';

const adPlatforms = [
  {
    name: '네이버 검색광고',
    nameEn: 'NAVER Search Ads',
    color: '#2A9E5C',
    bgColor: '#F3FAF6',
    borderColor: '#2A9E5C',
    initial: 'N',
    description: '구매 의도가 높은 사용자가 직접 검색하는 키워드에 노출되어 높은 전환율을 기대할 수 있습니다.',
    tags: ['파워링크', '쇼핑검색', '브랜드검색', '파워컨텐츠'],
    strength: '국내 점유율 1위 검색엔진',
  },
  {
    name: '구글 검색광고',
    nameEn: 'Google Ads',
    color: '#4A7EC7',
    bgColor: '#F0F4FB',
    borderColor: '#4A7EC7',
    initial: 'G',
    description: '전 세계 최대 검색엔진에서 글로벌 및 국내 타겟 고객에게 정밀하게 도달합니다.',
    tags: ['검색광고', 'GDN 디스플레이', '쇼핑광고', 'YouTube 연동'],
    strength: '글로벌 최대 광고 플랫폼',
  },
  {
    name: '카카오 검색광고',
    nameEn: 'Kakao Ads',
    color: '#5C4A00',
    bgColor: '#FDFAEC',
    borderColor: '#C8A800',
    initial: 'K',
    colorStyle: { backgroundColor: '#D4B800', color: '#3A2E00' },
    description: '국내 최대 메신저 플랫폼 기반으로 카카오톡·다음 사용자에게 폭넓게 노출됩니다.',
    tags: ['키워드광고', '카카오톡 채널', '디스플레이', '비즈보드'],
    strength: '4,500만 국내 활성 사용자',
  },
  {
    name: '인스타그램 광고',
    nameEn: 'Instagram Ads',
    color: '#B54E76',
    bgColor: '#FDF2F6',
    borderColor: '#B54E76',
    initial: '▶',
    gradientStyle: { background: 'linear-gradient(135deg, #6B4FA0, #B54E76, #C4714A)', color: '#fff' },
    description: '비주얼 중심의 피드·스토리·릴스 광고로 브랜드 감성을 전달하고 인지도를 높입니다.',
    tags: ['피드 광고', '스토리 광고', '릴스 광고', '쇼핑 태그'],
    strength: '2030 핵심 타겟 채널',
  },
  {
    name: '당근비즈니스',
    nameEn: 'Karrot Business',
    color: '#C86520',
    bgColor: '#FEF5EC',
    borderColor: '#C86520',
    initial: '🥕',
    colorStyle: { backgroundColor: '#C86520', color: '#fff' },
    description: '지역 기반 하이퍼로컬 타겟팅으로 내 주변 잠재 고객에게 비용 효율적으로 광고합니다.',
    tags: ['지역 타겟', '동네 광고', '비즈프로필', '하이퍼로컬'],
    strength: '지역 소상공인 최적 채널',
  },
  {
    name: '유튜브 광고',
    nameEn: 'YouTube Ads',
    color: '#C03A3A',
    bgColor: '#FDF2F2',
    borderColor: '#C03A3A',
    initial: '▶',
    colorStyle: { backgroundColor: '#C03A3A', color: '#fff' },
    description: '영상 콘텐츠로 브랜드 스토리를 전달하고, 국내 최대 동영상 플랫폼에서 인지도를 확보합니다.',
    tags: ['인스트림 광고', '범퍼 광고', '쇼츠 광고', '트루뷰'],
    strength: '국내 동영상 플랫폼 1위',
  },
];

export function AdServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0B1222] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-white/40 text-sm font-black tracking-[0.3em] uppercase mb-4 block">
            AD PLATFORMS
          </span>
          <h2 className="section-title text-white font-black italic tracking-tighter mb-4">
            광고 서비스 종류
          </h2>
          <p className="text-white/60 max-w-xl mx-auto font-medium leading-relaxed">
            플랫폼별 특성과 강점을 분석하여 비즈니스 목표에 최적화된 채널을 선택해 드립니다.
          </p>
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {adPlatforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group relative rounded-3xl bg-[#121A2F]/80 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:border-white/20"
            >
              {/* Dynamic Hover Glow Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 80% 0%, ${platform.color}, transparent 70%)` }}
              />

              {/* Top accent bar */}
              <div
                className="h-1.5 w-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: platform.gradientStyle?.background ?? platform.color }}
              />

              <div className="p-8 relative z-10 flex flex-col h-full">
                {/* Platform Icon + Name */}
                <div className="flex items-center gap-5 mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500"
                    style={{ background: platform.gradientStyle?.background ?? platform.colorStyle?.backgroundColor ?? platform.color, color: platform.colorStyle?.color ?? '#fff' }}
                  >
                    {platform.initial}
                  </div>
                  <div>
                    <p className="text-white font-black text-xl leading-tight mb-1 group-hover:translate-x-1 transition-transform duration-300">
                      {platform.name}
                    </p>
                    <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase">{platform.nameEn}</p>
                  </div>
                </div>

                {/* Strength badge */}
                <div
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-5 border border-white/10 bg-white/5 backdrop-blur-md w-fit"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
                    style={{ backgroundColor: platform.color, boxShadow: `0 0 8px ${platform.color}` }}
                  />
                  <span className="text-white/80">{platform.strength}</span>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed font-medium mb-8 flex-grow">
                  {platform.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {platform.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold px-3 py-1.5 rounded-xl border border-white/5 bg-white/5 text-white/50 group-hover:border-white/15 group-hover:text-white/80 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/30 text-xs font-bold tracking-wider mt-16 uppercase"
        >
          단일 채널부터 멀티채널 통합 운영까지, 예산과 목표에 맞는 최적 조합을 제안해 드립니다
        </motion.p>

      </div>
    </section>
  );
}
