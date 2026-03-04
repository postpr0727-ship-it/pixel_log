'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: '디자인',
    description: '브랜드 아이덴티티 구축',
    services: [
      { name: '로고 디자인', price: '30만원~' },
      { name: '명함 디자인', price: '10만원~' },
      { name: '브랜드 가이드라인', price: '50만원~' },
      { name: '웹 디자인', price: '100만원~' },
      { name: '인쇄물 디자인', price: '20만원~' },
    ],
  },
  {
    name: '개발',
    description: '웹사이트 & 프로그램',
    featured: true,
    services: [
      { name: '랜딩페이지', price: '100만원~' },
      { name: '기업 홈페이지', price: '200만원~' },
      { name: '쇼핑몰', price: '300만원~' },
      { name: '관리 시스템', price: '협의' },
      { name: '맞춤형 프로그램', price: '협의' },
    ],
  },
  {
    name: '마케팅',
    description: '블로그 & 광고',
    services: [
      { name: '블로그 포스팅 (건당)', price: '5만원~' },
      { name: '블로그 마케팅 (월)', price: '50만원~' },
      { name: '키워드 광고 대행', price: '광고비 + 수수료' },
      { name: 'SNS 광고 대행', price: '광고비 + 수수료' },
      { name: '영상 제작', price: '협의' },
    ],
  },
];

export function PricingSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm font-medium tracking-wider uppercase">
            PRICING
          </span>
          <h2 className="section-title text-navy mt-2 mb-4">서비스 요금 안내</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            프로젝트 규모와 요구사항에 따라 정확한 견적이 달라질 수 있습니다.
            <br />
            상담을 통해 맞춤 견적을 받아보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`h-full ${plan.featured
                  ? 'border-gold shadow-lg shadow-gold/10'
                  : 'border-border/50'
                  }`}
              >
                <CardHeader className="text-center pb-4">
                  {plan.featured && (
                    <Badge className="w-fit mx-auto mb-2 bg-gold text-navy">
                      <Sparkles className="h-3 w-3 mr-1" />
                      인기
                    </Badge>
                  )}
                  <h3 className="text-xl font-bold text-navy">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.services.map((service) => (
                      <li
                        key={service.name}
                        className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                      >
                        <div className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-gold flex-shrink-0" />
                          <span className="text-sm text-navy">{service.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gold">
                          {service.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          * 위 금액은 참고용이며, 프로젝트 상세 내용에 따라 변동될 수 있습니다.
          <br />
          <span className="inline-block mt-3 text-navy/70 leading-relaxed">
            PIXEL-LOG는 준앤준솔루션의 전문 디자인/개발 브랜드입니다.<br />
            (계약 및 세금계산서 발행: 준앤준솔루션)
          </span>
        </motion.p>
      </div>
    </section>
  );
}
