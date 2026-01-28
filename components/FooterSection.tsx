import React from 'react';
import { Link } from 'react-router-dom';
import { Lang } from '../types';

interface FooterSectionProps {
  lang: Lang;
  id: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ lang, id }) => {
  return (
    <footer id={id} className="relative w-full border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Links */}
        <div className="w-full lg:w-1/2 p-12 lg:p-24 bg-white z-10">
           <div className="grid grid-cols-2 gap-12">
              <div>
                <h4 className="font-mono text-xs text-gray-400 mb-6">NAVIGATION</h4>
                <ul className="space-y-2 text-sm font-medium">
                   <li><Link to="/demo" className="hover:text-[#2535bc]">About Us</Link></li>
                   <li><Link to="/demo" className="hover:text-[#2535bc]">Careers</Link></li>
                   <li><Link to="/demo" className="hover:text-[#2535bc]">Contact</Link></li>
                   <li><Link to="/demo" className="hover:text-[#2535bc]">Brand Kit</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-xs text-gray-400 mb-6">SOCIAL</h4>
                <ul className="space-y-2 text-sm font-medium">
                   <li><a href="#" className="hover:text-[#2535bc]">GitHub</a></li>
                   <li><a href="#" className="hover:text-[#2535bc]">Twitter / X</a></li>
                   <li><a href="#" className="hover:text-[#2535bc]">Discord</a></li>
                </ul>
              </div>
           </div>
           <div className="mt-24 text-[10px] font-mono text-gray-400">
              © 2024 PROJECT HERON. ZERO RADIUS DESIGN SYSTEM.
           </div>
        </div>

        {/* The Feather Art */}
        <div className="w-full lg:w-1/2 min-h-[300px] relative bg-[#fafafa] overflow-hidden flex items-center justify-center">
             {/* Abstract Feather Constructed of lines */}
             <div className="relative w-64 h-64">
                {/* Center Shaft */}
                <div className="absolute top-0 left-1/2 w-[1px] h-full metallic-bg transform -translate-x-1/2 rotate-12"></div>
                
                {/* Barbs (Lines) */}
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={`l-${i}`}
                        className="absolute h-[1px] bg-gray-300 origin-right transition-all duration-1000 hover:bg-[#2535bc]"
                        style={{
                            top: `${10 + (i * 4)}%`,
                            left: '10%',
                            width: '40%',
                            transform: `rotate(${20 + i}deg)`
                        }}
                    ></div>
                ))}
                 {[...Array(20)].map((_, i) => (
                    <div 
                        key={`r-${i}`}
                        className="absolute h-[1px] bg-gray-300 origin-left transition-all duration-1000 hover:bg-[#2535bc]"
                        style={{
                            top: `${15 + (i * 4)}%`,
                            left: '52%',
                            width: '35%',
                            transform: `rotate(${-20 - i}deg)`
                        }}
                    ></div>
                ))}
             </div>
             <div className="absolute bottom-4 right-4 font-mono text-[10px] text-gray-300">
                THE FEATHER
             </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;