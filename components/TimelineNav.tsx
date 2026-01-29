import React, { useEffect, useState } from 'react';
import { Lang } from '../types';

interface TimelineNavProps {
  lang: Lang;
  toggleLang: () => void;
  sections: string[];
  activeSection: number;
  onSectionClick: (index: number) => void;
}

const SECTION_LABELS: Record<string, { cn: string; en: string }> = {
  hero: { cn: 'PROJECT HERON', en: 'PROJECT HERON' },
  events: { cn: 'EVENTS', en: 'EVENTS' },
  careers: { cn: 'CAREERS', en: 'CAREERS' },
  sponsors: { cn: 'PARTNERS', en: 'PARTNERS' },
  footer: { cn: 'CONTACT', en: 'CONTACT' }
};

const TimelineNav: React.FC<TimelineNavProps> = ({ lang, toggleLang, sections, activeSection, onSectionClick }) => {
  return (
    <>
      {/* Desktop Left Nav - No border */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[200px] bg-[#FDFDFD] z-50 flex-col items-start py-8 px-6">
        {/* Lang Switcher */}
        <button
          onClick={toggleLang}
          className="w-8 h-8 border border-[#262526] flex items-center justify-center font-mono text-xs hover:bg-[#262526] hover:text-white transition-colors cursor-pointer mb-12"
        >
          {lang === 'cn' ? 'EN' : '中'}
        </button>

        {/* Timeline Axis - 1px width */}
        <div className="relative flex-1 w-[1px] bg-[#262526] ml-3">
          {/* Dots and Labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex flex-col justify-between py-8">
            {sections.map((sectionKey, idx) => {
              const isActive = activeSection === idx;
              const label = SECTION_LABELS[sectionKey] || { cn: sectionKey, en: sectionKey.toUpperCase() };

              return (
                <button
                  key={idx}
                  onClick={() => onSectionClick(idx)}
                  className="relative flex items-center group cursor-pointer"
                  aria-label={`Go to ${label.en}`}
                >
                  {/* Circular Dot - centered on line */}
                  <div
                    className={`w-[10px] h-[10px] rounded-full transition-all duration-300 border-2 border-[#262526] ${isActive
                        ? 'bg-[#262526] scale-125'
                        : 'bg-[#FDFDFD] group-hover:bg-[#262526]'
                      }`}
                    style={{ marginLeft: '-5px' }}
                  />

                  {/* Label - larger font */}
                  <span
                    className={`absolute left-6 whitespace-nowrap font-mono text-sm tracking-wider transition-all duration-300 ${isActive
                        ? 'text-[#262526] font-bold scale-105'
                        : 'text-[#262526] opacity-60 group-hover:opacity-100'
                      }`}
                  >
                    {label[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Top Progress */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-[2px] bg-[#262526] z-50">
        <div
          className="h-full bg-[#2535bc] transition-all duration-300 ease-out"
          style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Mobile Lang Toggle */}
      <button
        onClick={toggleLang}
        className="lg:hidden fixed top-4 right-4 z-50 w-8 h-8 border border-[#262526] bg-[#FDFDFD] flex items-center justify-center font-mono text-xs"
      >
        {lang === 'cn' ? 'EN' : '中'}
      </button>
    </>
  );
};

export default TimelineNav;