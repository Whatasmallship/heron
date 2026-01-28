import React, { useState } from 'react';
import { getStaticData } from '../services/dataGateway';
import { Lang, Sponsor, Resource } from '../types';
import { Link } from 'react-router-dom';

interface EcosystemSectionProps {
  lang: Lang;
  id: string;
}

const EcosystemSection: React.FC<EcosystemSectionProps> = ({ lang, id }) => {
  const sponsors = getStaticData<Sponsor>('sponsors');
  const resources = getStaticData<Resource>('resources');
  
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (itemId: string) => {
    setOpenId(openId === itemId ? null : itemId);
  };

  const renderItem = (id: string, title: string, subtitle: string, content: string, link: string, label: string) => {
    const isOpen = openId === id;
    
    return (
      <div key={id} className="border-b border-gray-200">
        <button 
          onClick={() => toggle(id)}
          className="w-full text-left py-8 px-8 lg:px-12 flex justify-between items-center hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all group"
        >
           <div className="flex items-baseline gap-4">
             <span className="font-mono text-xs text-gray-400 w-24">{label}</span>
             <h3 className="text-xl lg:text-2xl font-medium group-hover:text-[#2535bc] transition-colors">{title}</h3>
           </div>
           <div className="flex items-center gap-4">
             <span className="hidden lg:block font-mono text-xs text-gray-400">{subtitle}</span>
             <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''} text-2xl font-light`}>+</span>
           </div>
        </button>
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48' : 'max-h-0'}`}
        >
          <div className="px-8 lg:px-12 pb-8 pt-0 pl-36 lg:pl-44">
             <p className="text-gray-600 mb-4 max-w-2xl">{content}</p>
             <Link to="/demo" className="text-sm font-bold border-b border-black pb-1 hover:text-[#2535bc] hover:border-[#2535bc]">
                {lang === 'cn' ? '了解更多' : 'LEARN MORE'}
             </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id={id} className="w-full py-20">
      <div className="px-8 lg:px-12 mb-12">
        <h2 className="text-2xl font-bold tracking-tight">
          {lang === 'cn' ? '合作与资源' : 'ECOSYSTEM & RESOURCES'}
        </h2>
      </div>

      <div className="border-t border-gray-200">
        {sponsors.map(s => renderItem(
          s.id, 
          s.brandName[lang], 
          s.industry[lang], 
          `${s.tier} Partner`, 
          '/sponsor.html',
          'SPONSOR'
        ))}
        {resources.map(r => renderItem(
          r.id, 
          r.resourceName[lang], 
          r.format, 
          r.description[lang], 
          r.link,
          'RESOURCE'
        ))}
      </div>
    </section>
  );
};

export default EcosystemSection;