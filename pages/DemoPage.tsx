import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DemoPage: React.FC = () => {
  const location = useLocation();
  // Extract a name from the previous path or generic
  const name = location.state?.name || 'MODULE';

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <Link to="/" className="group relative block w-[90%] max-w-[600px] aspect-[3/2] border border-black hover:border-[#2535bc] transition-colors duration-500 cursor-pointer bg-white z-10">
         <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold tracking-tighter mb-4 group-hover:text-[#2535bc] transition-colors">
               [ DEMO / {name} ]
            </h1>
            <p className="font-mono text-sm text-gray-500">
               System status: <span className="animate-pulse text-green-600">Developing</span> / 正在开发中
            </p>
            <div className="mt-8 text-xs font-mono border border-gray-200 px-4 py-2 text-gray-400 group-hover:text-[#2535bc] group-hover:border-[#2535bc]">
                CLICK TO RETURN HOME
            </div>
         </div>
         
         {/* Corner Accents */}
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black group-hover:border-[#2535bc]"></div>
         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black group-hover:border-[#2535bc]"></div>
         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black group-hover:border-[#2535bc]"></div>
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black group-hover:border-[#2535bc]"></div>
      </Link>
    </div>
  );
};

export default DemoPage;