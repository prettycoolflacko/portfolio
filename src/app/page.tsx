import TopNav from '@/components/bento/TopNav';
import HeroSection from '@/components/bento/HeroSection';
import ToolsSection from '@/components/bento/ToolsSection';
import MarqueeBanner from '@/components/bento/MarqueeBanner';
import ServicesSection from '@/components/bento/ServicesSection';
import WorkSection from '@/components/bento/WorkSection';
import SkillsSection from '@/components/bento/SkillsSection';

export default function HomePage() {
  return (
    <main className="px-3 md:px-6">
      <div
        id="top"
        className="mx-auto my-4 md:my-8 max-w-[1280px] border-[3px] border-[#111111] bg-[#111111] shadow-[6px_6px_0_#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[2px]"
      >
        <TopNav />
        <HeroSection />
        <div className="md:col-span-2 lg:col-span-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[1fr_auto] gap-[2px] bg-[#111111]">
          <ToolsSection />
          <MarqueeBanner />
        </div>
        <ServicesSection />
        <WorkSection />
        <SkillsSection />
      </div>
    </main>
  );
}
