import React, { useState } from 'react';
import { Lang } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface NavItem {
    key: string;
    label: { cn: string; en: string };
    subItems?: { label: { cn: string; en: string }; href: string }[];
}

interface TopNavProps {
    lang: Lang;
    toggleLang: () => void;
    sections: NavItem[];
    activeSection: number;
    onSectionClick: (index: number) => void;
}

const TopNav: React.FC<TopNavProps> = ({ lang, toggleLang, sections, activeSection, onSectionClick }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
    const { theme, isLiquid, isDotMap } = useTheme();

    const isDark = isDotMap;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isDotMap ? 'frosted-glass-dark' : (isLiquid ? 'frosted-glass' : '')
                }`}
            style={{
                backgroundColor: theme.colors.navBg,
            }}
        >
            <div className="flex items-center justify-between px-8 py-4">
                {/* Logo */}
                <div className="flex items-center gap-8">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 100 100"
                        fill="none"
                        stroke={theme.colors.navTextHover}
                        strokeWidth="2"
                    >
                        <path d="M20 80 Q30 60 40 50 Q50 40 60 35 Q70 30 80 25" strokeLinecap="round" />
                        <path d="M40 50 Q35 55 30 65" strokeLinecap="round" />
                        <path d="M60 35 L70 20" strokeLinecap="round" />
                        <circle cx="72" cy="18" r="3" fill={theme.colors.navTextHover} />
                    </svg>
                </div>

                {/* Navigation Items */}
                <div className="flex items-center gap-8">
                    {sections.map((section, index) => (
                        <div
                            key={section.key}
                            className="relative"
                            onMouseEnter={() => {
                                setHoveredIndex(index);
                                // 首页 (index 0) 不展开下拉菜单
                                if (index !== 0) {
                                    setDropdownOpen(index);
                                }
                            }}
                            onMouseLeave={() => {
                                setHoveredIndex(null);
                                setDropdownOpen(null);
                            }}
                        >
                            <button
                                onClick={() => onSectionClick(index)}
                                className="font-mono text-sm transition-all duration-300"
                                style={{
                                    color: hoveredIndex === index || activeSection === index
                                        ? theme.colors.navTextHover
                                        : theme.colors.navText,
                                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                                    fontWeight: hoveredIndex === index || activeSection === index ? 500 : 400,
                                }}
                            >
                                {section.label[lang]}
                            </button>

                            {section.subItems && section.subItems.length > 0 && dropdownOpen === index && (
                                <div
                                    className="absolute top-full left-0 mt-0 min-w-[150px] py-2"
                                    style={{
                                        backgroundColor: theme.colors.bgLight,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                                    }}
                                >
                                    {section.subItems.map((item, subIndex) => (
                                        <a
                                            key={subIndex}
                                            href={item.href}
                                            className="block px-4 py-2 font-mono text-sm transition-all duration-300"
                                            style={{ color: theme.colors.navText }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = theme.colors.navTextHover;
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                                e.currentTarget.style.fontWeight = '500';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = theme.colors.navText;
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.fontWeight = '400';
                                            }}
                                        >
                                            {item.label[lang]}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLang}
                        className="w-8 h-8 flex items-center justify-center font-mono text-xs transition-colors ml-4"
                        style={{
                            border: `1px solid ${theme.colors.textPrimary}`,
                            color: theme.colors.textPrimary
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = theme.colors.accent;
                            e.currentTarget.style.borderColor = theme.colors.accent;
                            e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.borderColor = theme.colors.textPrimary;
                            e.currentTarget.style.color = theme.colors.textPrimary;
                        }}
                    >
                        {lang === 'cn' ? 'EN' : '中'}
                    </button>
                </div>
            </div>

            <div
                className="w-full h-[1px] transition-colors duration-500"
                style={{ backgroundColor: theme.colors.border }}
            />
        </nav>
    );
};

export default TopNav;
