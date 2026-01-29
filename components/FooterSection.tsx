import React from 'react';
import { Link } from 'react-router-dom';
import { Lang } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface FooterSectionProps {
   lang: Lang;
   id: string;
}

const ASCII_FEATHER = `                                                --                
                                            +#-                   
                                         .%=                      
                                       #.                         
                                   -#=                            
                                =##+                              
                             :*&&*:                               
                          .+&&&#+                                 
                        =*#&#%*-                                  
                      =#*%&##+                                    
                    +###%###%.                                    
                  +#%%#&#&&*.                                     
                =#+*%%#&&#+                                       
               +#+=*%#&&#=                                        
              *&%=*%&&&*.                                         
             **+%%##&%=                                           
           .*#+:+#&&#-                                            
           %*+#+*&&*.                                             
          =%- +#&*:                                               
         :#=.-**:                                                 
         :+--+#:                                                  
          =.++                                                    
           +                           ..                         
          *                         +                             
         =                       :                                
               =     +        +                                   
        *   .      .       ..                                     
       +         ..     +                                         
       ..`;

const FooterSection: React.FC<FooterSectionProps> = ({ lang, id }) => {
   const { theme, isLiquid, isDotMap } = useTheme();

   return (
      <footer
         id={id}
         className="relative w-full overflow-hidden pt-12 pb-6 transition-colors duration-500"
         style={{ backgroundColor: theme.colors.bgAlt }}
      >
         <div className="flex flex-row px-8 lg:px-12">
            {/* Left: Links in 3 columns */}
            <div className="flex-1">
               <div className="grid grid-cols-3 gap-12 mb-8">
                  <div>
                     <h4
                        className="font-mono text-xs mb-4 uppercase tracking-wider font-medium"
                        style={{ color: theme.colors.textSecondary }}
                     >
                        {lang === 'cn' ? '关于' : 'ABOUT'}
                     </h4>
                     <ul className="space-y-2 text-[13px]">
                        {[
                           { cn: '关于我们', en: 'About Us' },
                           { cn: '团队', en: 'Team' },
                           { cn: '职业机会', en: 'Careers' },
                           { cn: '新闻', en: 'Press' },
                        ].map((item, i) => (
                           <li key={i}>
                              <Link
                                 to="#"
                                 className="transition-colors"
                                 style={{ color: theme.colors.textPrimary }}
                                 onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
                                 onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textPrimary}
                              >
                                 {item[lang]}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div>
                     <h4
                        className="font-mono text-xs mb-4 uppercase tracking-wider font-medium"
                        style={{ color: theme.colors.textSecondary }}
                     >
                        {lang === 'cn' ? '资源' : 'RESOURCES'}
                     </h4>
                     <ul className="space-y-2 text-[13px]">
                        {[
                           { cn: '文档', en: 'Docs' },
                           { cn: '品牌资源', en: 'Brand' },
                           { cn: 'API', en: 'API' },
                           { cn: '开源项目', en: 'Open Source' },
                        ].map((item, i) => (
                           <li key={i}>
                              <Link
                                 to="#"
                                 className="transition-colors"
                                 style={{ color: theme.colors.textPrimary }}
                                 onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
                                 onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textPrimary}
                              >
                                 {item[lang]}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div>
                     <h4
                        className="font-mono text-xs mb-4 uppercase tracking-wider font-medium"
                        style={{ color: theme.colors.textSecondary }}
                     >
                        {lang === 'cn' ? '社区' : 'COMMUNITY'}
                     </h4>
                     <ul className="space-y-2 text-[13px]">
                        {['GitHub', 'Discord', 'Twitter', lang === 'cn' ? '微信' : 'WeChat'].map((item, i) => (
                           <li key={i}>
                              <a
                                 href="#"
                                 className="transition-colors"
                                 style={{ color: theme.colors.textPrimary }}
                                 onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
                                 onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textPrimary}
                              >
                                 {item}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>

               {/* Contact row */}
               <div
                  className="flex flex-wrap gap-6 text-[13px] mb-5 pt-5"
                  style={{
                     color: theme.colors.textPrimary,
                     borderTop: `1px solid ${theme.colors.border}`
                  }}
               >
                  <a
                     href="mailto:hello@projectheron.io"
                     className="transition-colors"
                     onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accent}
                     onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.textPrimary}
                  >
                     hello@projectheron.io
                  </a>
                  <span>+86 10 1234 5678</span>
                  <span>{lang === 'cn' ? '北京市海淀区' : 'Haidian, Beijing'}</span>
               </div>

               {/* Copyright */}
               <div
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: theme.colors.textMuted }}
               >
                  © 2024 PROJECT HERON. ALL RIGHTS RESERVED.
               </div>
            </div>

            {/* Right: ASCII Feather Art - gets liquid/glow effect */}
            <div className="hidden lg:flex w-[280px] items-start justify-end">
               <pre
                  className={`text-[5px] leading-[1.1] font-mono select-none whitespace-pre ${isLiquid ? 'liquid-feather' : 'metallic-flow-text-slow'
                     }`}
                  style={{
                     transform: 'rotate(-12deg) translateY(-20px)',
                     ...(isDotMap && {
                        color: theme.colors.accent,
                        textShadow: `0 0 10px ${theme.colors.accent}60`,
                     })
                  }}
               >
                  {ASCII_FEATHER}
               </pre>
            </div>
         </div>
      </footer>
   );
};

export default FooterSection;