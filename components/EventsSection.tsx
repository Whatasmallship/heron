import React, { useState, useRef, useEffect } from 'react';
import { getStaticData } from '../services/dataGateway';
import { Lang, Event } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface EventsSectionProps {
  lang: Lang;
  id: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ lang, id }) => {
  const events = getStaticData<Event>('events');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const { theme, isLiquid, isDotMap } = useTheme();

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.date.replace(/\D/g, '');
    const dateB = b.date.replace(/\D/g, '');
    return dateB.localeCompare(dateA);
  });

  const displayEvent = hoveredId
    ? events.find(e => e.id === hoveredId)
    : sortedEvents[0];

  const updateScrollState = () => {
    const el = timelineRef.current;
    if (!el) return;
    setIsAtTop(el.scrollTop <= 0);
    setIsAtBottom(Math.abs(el.scrollTop + el.clientHeight - el.scrollHeight) < 2);
  };

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const currentTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      let newScrollTop = currentTop + e.deltaY;

      if (newScrollTop < 0) {
        el.style.transform = `translateY(${Math.min(15, -newScrollTop * 0.2)}px)`;
        setTimeout(() => {
          el.style.transition = 'transform 0.25s ease-out';
          el.style.transform = 'translateY(0)';
          setTimeout(() => { el.style.transition = ''; }, 250);
        }, 50);
        newScrollTop = 0;
      } else if (newScrollTop > maxScroll) {
        const overflow = newScrollTop - maxScroll;
        el.style.transform = `translateY(${-Math.min(15, overflow * 0.2)}px)`;
        setTimeout(() => {
          el.style.transition = 'transform 0.25s ease-out';
          el.style.transform = 'translateY(0)';
          setTimeout(() => { el.style.transition = ''; }, 250);
        }, 50);
        newScrollTop = maxScroll;
      }

      el.scrollTop = newScrollTop;
      updateScrollState();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', updateScrollState);
    updateScrollState();

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  return (
    <section
      id={id}
      className="min-h-screen flex relative overflow-hidden pt-20 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.bgAlt }}
    >
      {/* Left: Timeline */}
      <div className="w-full lg:w-[45%] flex justify-center py-8 relative">
        <div
          ref={timelineRef}
          className="relative h-[75vh] overflow-y-auto no-scrollbar px-4"
          style={{ width: '480px' }}
        >
          <div className="relative py-8">
            {/* Timeline line */}
            <div
              className="absolute transition-colors duration-500"
              style={{
                left: '50%',
                top: 0,
                height: '100%',
                width: '2px',
                transform: 'translateX(-50%)',
                backgroundColor: theme.colors.textPrimary
              }}
            />

            {sortedEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const isHovered = hoveredId === event.id;

              return (
                <div key={event.id} className="relative mb-14" style={{ height: '70px' }}>
                  {/* Dot - gets liquid metal effect when hovered in liquid theme */}
                  <div
                    className={`absolute rounded-full transition-all duration-300 ${isLiquid && isHovered ? 'liquid-metal-element' : ''
                      }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      width: isHovered ? '14px' : '10px',
                      height: isHovered ? '14px' : '10px',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      backgroundColor: (isLiquid && isHovered) ? undefined : (isHovered ? theme.colors.accent : theme.colors.textPrimary),
                      boxShadow: isDotMap && isHovered ? `0 0 12px ${theme.colors.accent}` : 'none'
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-[calc(50%+24px)] text-right' : 'left-[calc(50%+24px)] text-left'
                      }`}
                    style={{ width: 'calc(50% - 40px)' }}
                  >
                    <div
                      onMouseEnter={() => setHoveredId(event.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`cursor-pointer transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}
                    >
                      <div className="font-mono text-[10px] mb-0.5" style={{ color: theme.colors.textMuted }}>
                        {event.date}
                      </div>
                      <h4 className="text-sm font-semibold leading-tight" style={{ color: theme.colors.textPrimary }}>
                        {event.name[lang]}
                      </h4>
                      <div className="text-[10px] mt-0.5" style={{ color: theme.colors.textSecondary }}>
                        {event.tag[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll indicators */}
        {!isAtTop && (
          <div
            className="absolute top-8 left-0 right-0 h-12 pointer-events-none z-20"
            style={{ background: `linear-gradient(to bottom, ${theme.colors.bgAlt}, transparent)` }}
          />
        )}
        {!isAtBottom && (
          <div
            className="absolute bottom-8 left-0 right-0 h-12 pointer-events-none z-20"
            style={{ background: `linear-gradient(to top, ${theme.colors.bgAlt}, transparent)` }}
          />
        )}
      </div>

      {/* Right: Event details with frosted glass */}
      <div className="hidden lg:flex w-[55%] items-center justify-center p-12 relative">
        {displayEvent && (
          <div
            className="max-w-lg p-6 rounded-lg"
            style={{
              backgroundColor: theme.colors.cardBg,
              border: theme.colors.cardBorder === 'none' ? 'none' : theme.colors.cardBorder,
              backdropFilter: theme.colors.cardBackdropFilter,
            }}
          >
            <div
              className="w-full h-[260px] mb-6 bg-cover bg-center rounded-lg overflow-hidden"
              style={{
                backgroundImage: displayEvent.image
                  ? `url(${displayEvent.image})`
                  : `linear-gradient(135deg, ${theme.colors.textMuted} 0%, ${theme.colors.accent} 100%)`
              }}
            />

            <div className="flex items-center gap-4 mb-4">
              <span
                className="px-3 py-1 text-xs font-mono rounded"
                style={{
                  backgroundColor: displayEvent.status[lang] === '报名中' || displayEvent.status[lang] === 'Open'
                    ? theme.colors.accent
                    : theme.colors.border,
                  color: displayEvent.status[lang] === '报名中' || displayEvent.status[lang] === 'Open'
                    ? '#FFFFFF'
                    : theme.colors.textSecondary
                }}
              >
                {displayEvent.status[lang]}
              </span>
              <span className="font-mono text-sm" style={{ color: theme.colors.textSecondary }}>
                {displayEvent.date}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: theme.colors.textPrimary }}>
              {displayEvent.name[lang]}
            </h2>

            <p className="mb-4" style={{ color: theme.colors.textSecondary }}>
              {displayEvent.shortIntro[lang]}
            </p>

            <p className="text-sm leading-relaxed" style={{ color: theme.colors.textMuted }}>
              {displayEvent.detailedIntro[lang]}
            </p>
          </div>
        )}

        <button
          className="absolute bottom-8 right-8 font-mono text-xs transition-colors"
          style={{ color: theme.colors.textSecondary }}
          onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
          onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textSecondary}
        >
          {lang === 'cn' ? '查看全部活动' : 'VIEW ALL EVENTS'} {'->'}
        </button>
      </div>
    </section>
  );
};

export default EventsSection;