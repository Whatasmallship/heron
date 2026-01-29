import React, { useState } from 'react';
import { useTheme, THEMES, ThemeId } from '../contexts/ThemeContext';
import { Lang } from '../types';

interface ThemeSwitcherProps {
    lang: Lang;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ lang }) => {
    const { themeId, setThemeId, theme, isLiquid, isDotMap } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const getThemeDescription = (id: ThemeId): { cn: string; en: string } => {
        switch (id) {
            case 'classic':
                return { cn: '经典黑白蓝', en: 'Classic black & blue' };
            case 'purple':
                return { cn: '优雅紫色调', en: 'Elegant purple' };
            case 'liquid':
                return { cn: '液态金属蓝', en: 'Liquid metal blue' };
            case 'dotmap':
                return { cn: '点阵地球', en: 'Dot matrix globe' };
            default:
                return { cn: '', en: '' };
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Theme panels */}
            {isOpen && (
                <div
                    className={`absolute bottom-14 right-0 p-4 rounded-lg shadow-2xl mb-2 ${isDotMap ? 'frosted-glass-dark' : (isLiquid ? 'frosted-glass' : '')
                        }`}
                    style={{
                        backgroundColor: (isLiquid || isDotMap) ? undefined : theme.colors.bgLight,
                        border: `1px solid ${theme.colors.border}`,
                        minWidth: '280px'
                    }}
                >
                    <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: theme.colors.textMuted }}>
                        {lang === 'cn' ? '配色方案' : 'COLOR SCHEME'}
                    </div>

                    <div className="space-y-3">
                        {THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setThemeId(t.id);
                                }}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${themeId === t.id
                                        ? 'ring-2 ring-offset-2'
                                        : 'hover:scale-[1.02]'
                                    }`}
                                style={{
                                    backgroundColor: t.colors.bgAlt,
                                    // @ts-ignore
                                    '--tw-ring-color': t.colors.accent,
                                    '--tw-ring-offset-color': isDotMap ? '#0A0A0F' : theme.colors.bgLight
                                }}
                            >
                                {/* Color swatches */}
                                <div className="flex gap-1">
                                    <div
                                        className="w-5 h-5 rounded-full border border-white/20"
                                        style={{ backgroundColor: t.colors.bgDark }}
                                    />
                                    <div
                                        className="w-5 h-5 rounded-full border border-white/20"
                                        style={{ backgroundColor: t.colors.accent }}
                                    />
                                    <div
                                        className="w-5 h-5 rounded-full border border-white/20"
                                        style={{ backgroundColor: t.id === 'dotmap' ? t.colors.textPrimary : t.colors.bgLight }}
                                    />
                                </div>

                                {/* Theme name */}
                                <div className="flex-1 text-left">
                                    <div
                                        className="text-sm font-medium"
                                        style={{ color: t.colors.textPrimary }}
                                    >
                                        {t.name[lang]}
                                    </div>
                                    <div
                                        className="text-xs"
                                        style={{ color: t.colors.textSecondary }}
                                    >
                                        {getThemeDescription(t.id)[lang]}
                                    </div>
                                </div>

                                {/* Map type indicator */}
                                {t.mapType === 'dot' && (
                                    <div className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ backgroundColor: t.colors.accent, color: '#fff' }}>
                                        DOT
                                    </div>
                                )}

                                {/* Selected indicator */}
                                {themeId === t.id && (
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: t.colors.accent }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${isLiquid ? 'liquid-metal-element' : ''
                    }`}
                style={{
                    backgroundColor: isLiquid ? undefined : theme.colors.accent,
                    color: '#FFFFFF'
                }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
            </button>
        </div>
    );
};

export default ThemeSwitcher;
