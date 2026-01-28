import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStaticData } from '../services/dataGateway';
import { Lang, Event } from '../types';

interface EventsSectionProps {
  lang: Lang;
  id: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ lang, id }) => {
  const events = getStaticData<Event>('events');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Convert vertical scroll to horizontal scroll when hovering this section
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // If we are at the start and scrolling up, or end and scrolling down, let default happen
      const isStart = el.scrollLeft === 0;
      const isEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth;

      if ((isStart && e.deltaY < 0) || (isEnd && e.deltaY > 0)) {
         return; 
      }
      
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 2,
        behavior: 'smooth'
      });
    };

    el.addEventListener('wheel', onWheel);
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <section id={id} className="w-full py-20 border-b border-gray-100 overflow-hidden relative">
      <div className="px-8 lg:px-12 mb-8 flex justify-between items-end">
        <h2 className="text-2xl font-bold tracking-tight">
          {lang === 'cn' ? '活动与竞技' : 'EVENTS & CHALLENGES'}
        </h2>
        <span className="font-mono text-xs text-gray-400 hidden lg:block">SCROLL TO EXPLORE -></span>
      </div>

      {/* Background Texture (0.5px lines) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5" 
           style={{ backgroundImage: 'linear-gradient(45deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar pb-12 px-8 lg:px-12 space-x-6 z-10 relative"
      >
        {events.map((event) => (
          <div 
            key={event.id}
            className="flex-shrink-0 w-[300px] h-[400px] border border-gray-300 bg-white hover:border-[#2535bc] transition-colors duration-300 flex flex-col justify-between p-6 group"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-block w-2 h-2 ${event.priority === 'high' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                <span className="font-mono text-xs text-gray-400">{event.date}</span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-[#2535bc] transition-colors">
                {event.name[lang]}
              </h3>
              <div className="mt-4 inline-block px-2 py-1 border border-gray-200 text-xs font-mono text-gray-500">
                {event.tag[lang]}
              </div>
            </div>

            <div>
               <div className="mb-6 font-mono text-sm text-gray-600">
                  STATUS: {event.status[lang]}
               </div>
               <Link 
                 to="/demo"
                 className="block w-full py-3 border border-black text-center text-sm font-bold hover:bg-[#2535bc] hover:border-[#2535bc] hover:text-white transition-all"
               >
                 {lang === 'cn' ? '查看详情' : 'VIEW DETAILS'}
               </Link>
            </div>
          </div>
        ))}
        {/* Spacer for right padding */}
        <div className="w-12 flex-shrink-0"></div>
      </div>
    </section>
  );
};

export default EventsSection;