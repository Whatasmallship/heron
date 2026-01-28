import React from 'react';
import { Lang } from '../types';
import TimelineNav from '../components/TimelineNav';
import HeroSection from '../components/HeroSection';
import EventsSection from '../components/EventsSection';
import GrowthSection from '../components/GrowthSection';
import EcosystemSection from '../components/EcosystemSection';
import FooterSection from '../components/FooterSection';

interface HomePageProps {
  lang: Lang;
  toggleLang: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ lang, toggleLang }) => {
  const sections = ['hero', 'events', 'growth', 'ecosystem', 'footer'];

  return (
    <div className="flex flex-col w-full min-h-screen">
      <TimelineNav lang={lang} toggleLang={toggleLang} sections={sections} />
      
      {/* Main Content shifted right on desktop */}
      <main className="lg:pl-[80px] w-full">
        <HeroSection lang={lang} id="section-0" />
        <EventsSection lang={lang} id="section-1" />
        <GrowthSection lang={lang} id="section-2" />
        <EcosystemSection lang={lang} id="section-3" />
        <FooterSection lang={lang} id="section-4" />
      </main>
    </div>
  );
};

export default HomePage;