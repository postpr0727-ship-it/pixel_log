import { Metadata } from 'next';
import { AlertCircle } from 'lucide-react';
import { PageHero } from '@/components/hero';
import { PhilosophySection } from '@/components/sections';
import { VideoGallery } from './VideoGallery';

export const metadata: Metadata = {
  title: '영상 제작',
  description: '촬영과 편집 전문 - 전문적인 영상 콘텐츠를 제작합니다.',
};

const philosophyItems = [
  {
    icon: 'Video',
    title: '전문 촬영 기술',
    description: '전문 장비와 촬영 기술로 고품질의 영상을 제작합니다.',
  },
  {
    icon: 'Clapperboard',
    title: '정밀한 편집',
    description: '컷 편집, 컬러 그레이딩, 사운드 디자인으로 완성도를 높입니다.',
  },
  {
    icon: 'Wand2',
    title: 'AI 티저 광고 제작',
    description: 'AI 이미지 생성 기술을 활용한 창의적인 티저 광고 영상을 제작합니다.',
  },
];

export default function VideoPage() {
  return (
    <>
      <PageHero
        title="영상 제작"
        titleEn="VIDEO PRODUCTION"
        description="촬영과 편집 전문 - 고품질 영상 콘텐츠를 제작합니다."
        breadcrumbs={[{ label: '영상 제작' }]}
      />
      <PhilosophySection
        title="영상 제작 서비스"
        subtitle="OUR SERVICE"
        description="촬영과 편집에 특화된 전문 엔지니어가 고품질 영상을 완성합니다."
        items={philosophyItems}
      />

      {/* Important Notice */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-amber-400 rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-navy mb-3">
                  서비스 안내
                </h3>
                <div className="space-y-2 text-gray-700 leading-relaxed">
                  <p className="text-lg font-semibold text-amber-700">
                    ※ 대본 작성, 영상 소재 발굴 및 출연자 섭외는 제공하지 않습니다
                  </p>
                  <p className="text-base">
                    저희는 <strong className="text-navy">촬영과 편집에 특화된 엔지니어링 서비스</strong>를 제공합니다.
                  </p>
                  <p className="text-base">
                    고객님께서 준비하신 기획안, 대본, 출연자를 바탕으로 전문적인 촬영과 편집 작업을 진행합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoGallery />
    </>
  );
}
