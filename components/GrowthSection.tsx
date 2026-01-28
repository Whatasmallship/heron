import React from 'react';
import { Link } from 'react-router-dom';
import { getStaticData } from '../services/dataGateway';
import { Lang, Job } from '../types';

interface GrowthSectionProps {
  lang: Lang;
  id: string;
}

const GrowthSection: React.FC<GrowthSectionProps> = ({ lang, id }) => {
  const jobs = getStaticData<Job>('jobs');

  return (
    <section id={id} className="w-full border-b border-gray-100">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {/* Section Header Tile */}
         <div className="aspect-square border-b border-r border-gray-100 p-8 flex flex-col justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {lang === 'cn' ? '职业与成长' : 'GROWTH & CAREERS'}
            </h2>
            <p className="font-mono text-xs text-gray-500">
              {lang === 'cn' ? '加入我们的飞行编队' : 'JOIN THE FORMATION'}
            </p>
         </div>

         {/* Job Tiles */}
         {jobs.slice(0, 5).map((job) => (
           <Link 
             key={job.id} 
             to="/demo"
             className="aspect-square border-b border-r border-gray-100 group relative overflow-hidden block"
           >
             {/* Default State */}
             <div className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-white transition-transform duration-500 group-hover:-translate-y-full">
                <h3 className="text-lg font-bold text-center">{job.position[lang]}</h3>
                <span className="mt-2 text-xs font-mono text-gray-400">{job.department[lang]}</span>
             </div>

             {/* Hover State (Metallic Blue) */}
             <div className="absolute inset-0 top-full metallic-bg flex flex-col justify-center items-center p-6 transition-transform duration-500 group-hover:-translate-y-full text-white">
                <h3 className="text-lg font-bold text-center">{job.position[lang]}</h3>
                <p className="mt-2 text-xs font-mono opacity-80">{job.salaryRange}</p>
                <span className="mt-8 text-xs border border-white/30 px-3 py-1">
                  {lang === 'cn' ? '申请' : 'APPLY'}
                </span>
             </div>
           </Link>
         ))}

         {/* View All Tile */}
         <Link to="/demo" className="aspect-square border-b border-r border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="font-mono text-sm border-b border-black pb-1">
               {lang === 'cn' ? '查看所有职位 ->' : 'VIEW ALL POSITIONS ->'}
            </span>
         </Link>
       </div>
    </section>
  );
};

export default GrowthSection;