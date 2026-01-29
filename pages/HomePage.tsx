import React, { useState, useEffect } from 'react';
import { Lang } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import TopNav from '../components/TopNav';
import HeroSection from '../components/HeroSection';
import EventsSection from '../components/EventsSection';
import CareersSection from '../components/CareersSection';
import SponsorsSection from '../components/SponsorsSection';
import FooterSection from '../components/FooterSection';
import ThemeSwitcher from '../components/ThemeSwitcher';

interface HomePageProps {
  lang: Lang;
  toggleLang: () => void;
}

const NAV_SECTIONS = [
  {
    key: 'hero',
    label: { cn: 'HOME', en: 'HOME' },
  },
  {
    key: 'events',
    label: { cn: 'EVENTS', en: 'EVENTS' },
    subItems: [
      { label: { cn: '黑客松', en: 'Hackathons' }, href: '#' },
      { label: { cn: '挑战赛', en: 'Challenges' }, href: '#' },
      { label: { cn: '峰会', en: 'Summits' }, href: '#' },
    ]
  },
  {
    key: 'careers',
    label: { cn: 'CAREERS', en: 'CAREERS' },
    subItems: [
      { label: { cn: '职位', en: 'Jobs' }, href: '#' },
      { label: { cn: '导师', en: 'Mentors' }, href: '#' },
      { label: { cn: '课程', en: 'Courses' }, href: '#' },
    ]
  },
  {
    key: 'sponsors',
    label: { cn: 'PARTNERS', en: 'PARTNERS' },
    subItems: [
      { label: { cn: '赞助商', en: 'Sponsors' }, href: '#' },
      { label: { cn: '合作伙伴', en: 'Partners' }, href: '#' },
      { label: { cn: '媒体', en: 'Media' }, href: '#' },
    ]
  },
  {
    key: 'footer',
    label: { cn: 'CONTACT', en: 'CONTACT' },
    subItems: [
      { label: { cn: '关于我们', en: 'About Us' }, href: '#' },
      { label: { cn: '联系方式', en: 'Contact' }, href: '#' },
      { label: { cn: '加入团队', en: 'Join Team' }, href: '#' },
    ]
  }
];

const HomePage: React.FC<HomePageProps> = ({ lang, toggleLang }) => {
  const [activeSection, setActiveSection] = useState(0);
  const { theme } = useTheme();

  const scrollToSection = (index: number) => {
    const sectionEl = document.getElementById(`section-${index}`);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      NAV_SECTIONS.forEach((_, index) => {
        const sectionEl = document.getElementById(`section-${index}`);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full relative transition-colors duration-500"
      style={{ backgroundColor: theme.colors.bgLight }}
    >
      <TopNav
        lang={lang}
        toggleLang={toggleLang}
        sections={NAV_SECTIONS}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      <main className="relative z-10">
        <HeroSection lang={lang} id="section-0" />
        <EventsSection lang={lang} id="section-1" />
        <CareersSection lang={lang} id="section-2" />
        <SponsorsSection lang={lang} id="section-3" />
        <FooterSection lang={lang} id="section-4" />
      </main>

      <ThemeSwitcher lang={lang} />
    </div>
  );
};

export default HomePage;