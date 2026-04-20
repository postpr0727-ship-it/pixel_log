import { MainHero } from '@/components/hero';
import { EditorialServicesSection, StatsSection } from '@/components/sections';

export default async function HomePage() {
  return (
    <>
      <MainHero />
      <div id="services" className="scroll-mt-20">
        <EditorialServicesSection />
      </div>
      <StatsSection />
    </>
  );
}
