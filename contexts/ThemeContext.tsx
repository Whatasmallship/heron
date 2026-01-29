import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, ThemeId, THEMES, DEFAULT_THEME_ID, getThemeById } from '../config/themes';

// 重新导出类型，方便其他文件使用
export type { ThemeConfig, ThemeId };
export { THEMES };

interface ThemeContextType {
    theme: ThemeConfig;
    themeId: ThemeId;
    setThemeId: (id: ThemeId) => void;
    isLiquid: boolean;
    isDotMap: boolean;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME_ID);

    const theme = getThemeById(themeId);
    const isLiquid = themeId === 'liquid';
    const isDotMap = themeId === 'dotmap';

    // 将主题颜色应用到 CSS 变量
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
        if (theme.liquidGradient) {
            root.style.setProperty('--liquid-gradient', theme.liquidGradient);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, themeId, setThemeId, isLiquid, isDotMap }}>
            {children}
        </ThemeContext.Provider>
    );
};
