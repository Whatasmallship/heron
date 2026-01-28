import React, { useEffect, useState } from 'react';
import { Lang } from '../types';

interface TimelineNavProps {
  lang: Lang;
  toggleLang: () => void;
  sections: string[];
}

const TimelineNav: React.FC<TimelineNavProps> = ({ lang, toggleLang, sections }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Determine active section based on scroll position
      const sectionElements = sections.map((_, i) => document.getElementById(`section-${i}`));
      sectionElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <>
      {/* Desktop Left Nav */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[80px] bg-[#FDFDFD] border-r border-gray-200 z-50 flex-col items-center py-8">
        {/* Lang Switcher */}
        <button
          onClick={toggleLang}
          className="w-10 h-10 border border-black flex items-center justify-center font-mono text-xs hover:bg-black hover:text-white transition-colors cursor-pointer mb-8"
        >
          {lang === 'cn' ? 'EN' : '中'}
        </button>

        {/* Timeline Axis */}
        <div className="relative flex-1 w-[1px] bg-gray-300">
          <div
            className="absolute top-0 left-0 w-full metallic-bg transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress}%` }}
          />
          
          {/* Dots */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-between py-10">
             {sections.map((_, idx) => (
               <a 
                 key={idx} 
                 href={`#section-${idx}`}
                 className={`w-[10px] h-[10px] border border-black transition-colors duration-300 ${activeSection === idx ? 'bg-[#2535bc] border-[#2535bc]' : 'bg-transparent'}`}
                 aria-label={`Go to section ${idx + 1}`}
               />
             ))}
          </div>
        </div>
      </div>

      {/* Mobile Top Progress */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[2px] bg-gray-200 z-50">
        <div 
           className="h-full metallic-bg transition-all duration-100 ease-out"
           style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Mobile Lang Toggle Floating */}
      <button
          onClick={toggleLang}
          className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 border border-black bg-white flex items-center justify-center font-mono text-xs shadow-sm"
      >
          {lang === 'cn' ? 'EN' : '中'}
      </button>
    </>
  );
};

export default TimelineNav;