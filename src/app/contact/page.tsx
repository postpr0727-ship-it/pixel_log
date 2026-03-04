import { Metadata } from 'next';
import { PageHero } from '@/components/hero';
import { ContactForm } from './ContactForm';
import { PricingSection } from './PricingSection';
import { ContactInfo } from './ContactInfo';

export const metadata: Metadata = {
  title: '문의하기',
  description: '프로젝트에 대해 문의해 주세요. 무료 상담을 통해 최적의 솔루션을 제안해 드립니다.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="문의하기"
        titleEn="CONTACT US"
        description="프로젝트에 대해 문의해 주세요. 무료 상담을 통해 최적의 솔루션을 제안해 드립니다."
        breadcrumbs={[{ label: '문의하기' }]}
      />
      <ContactInfo />
      <ContactForm />
      <PricingSection />
    </>
  );
}
