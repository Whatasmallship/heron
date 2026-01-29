/**
 * 主题配置文件
 * ============
 * 
 * 在这里修改所有主题的配色方案。
 * 每个主题包含一组颜色变量，会自动应用到整个网站。
 * 
 * 颜色说明:
 * - primary: 主要颜色（通常用于重要文本）
 * - secondary: 次要颜色
 * - accent: 强调色（按钮、链接悬停等）
 * - accentHover: 强调色悬停状态
 * - bgLight: 主背景色（亮色）
 * - bgAlt: 备用背景色（稍深）
 * - bgDark: 深色背景（用于对比区块）
 * - textPrimary: 主要文本颜色
 * - textSecondary: 次要文本颜色
 * - textMuted: 弱化文本颜色
 * - border: 边框颜色
 * - mapStroke: 地图线条颜色
 * - mapFill: 地图填充颜色
 */

export type ThemeId = 'classic' | 'purple' | 'liquid' | 'dotmap';

export interface ThemeColors {
    primary: string;
    secondary: string;
    accent: string;
    accentHover: string;
    bgLight: string;
    bgAlt: string;
    bgDark: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    mapStroke: string;
    mapFill: string;
    // 导航栏颜色
    navBg: string;            // 导航栏背景色
    navText: string;          // 导航栏文字颜色
    navTextHover: string;     // 导航栏文字悬停颜色
    // 赞助商卡片颜色
    sponsorCardBg: string;        // 卡片背景色
    sponsorCardBorder: string;    // 卡片边框色 (设为 'transparent' 则无边框)
    sponsorCardIcon: string;      // 图标颜色
    sponsorCardText: string;      // 文字颜色
    // 通用卡片颜色 (Blog, Event, Career)
    cardBg: string;
    cardBorder: string;
    cardText: string;
    cardBackdropFilter: string;
}

export interface ThemeConfig {
    id: ThemeId;
    name: { cn: string; en: string };
    description: { cn: string; en: string };
    mapType: 'line' | 'dot';
    colors: ThemeColors;
    /** 液态金属渐变（仅 liquid 主题使用） */
    liquidGradient?: string;
}

// ============================================
// 在下面修改各主题的配色
// ============================================

export const THEMES: ThemeConfig[] = [
    // -----------------------------------------
    // 经典主题 - 黑白蓝配色
    // -----------------------------------------
    {
        id: 'classic',
        name: { cn: '经典', en: 'Classic' },
        description: { cn: '经典黑白蓝', en: 'Classic black & blue' },
        mapType: 'line',
        colors: {
            primary: '#262526',
            secondary: '#4777abff',
            accent: '#4777abff',
            accentHover: '#4777abff',
            bgLight: '#ffffffff',
            bgAlt: '#ffffffff',
            bgDark: '#262526',
            textPrimary: '#262526',
            textSecondary: '#666666',
            textMuted: '#a0a0a0',
            border: '#e0e0e0',
            mapStroke: '#c0c0c0',
            mapFill: '#4777abff',
            // 导航栏
            navBg: '#FDFDFD',
            navText: '#a0a0a0',
            navTextHover: '#262526',
            // 赞助商卡片 - 白色图标无边框
            sponsorCardBg: 'transparent',
            sponsorCardBorder: 'transparent',
            sponsorCardIcon: '#FFFFFF',
            sponsorCardText: 'rgba(255,255,255,0.7)',
            // 通用卡片
            cardBg: '#FFFFFF',
            cardBorder: 'transparent',
            cardText: '#262526',
            cardBackdropFilter: 'none',
        },
    },

    // -----------------------------------------
    // 紫韵主题 - 优雅紫色调
    // -----------------------------------------
    {
        id: 'purple',
        name: { cn: '紫韵', en: 'Purple' },
        description: { cn: '优雅紫色调', en: 'Elegant purple' },
        mapType: 'line',
        colors: {
            primary: '#363636',
            secondary: '#4b468f',
            accent: '#4446a5',
            accentHover: '#fdb006',
            bgLight: '#ffffffff',
            bgAlt: '#ffffffff',
            bgDark: '#363636',
            textPrimary: '#363636',
            textSecondary: '#8e8e8eff',
            textMuted: '#b8b8b8ff',
            border: '#E8E6E3',
            mapStroke: '#B0B0C8',
            mapFill: '#4b468f',
            // 导航栏
            navBg: '#ffffffff',
            navText: '#b8b8b8ff',
            navTextHover: '#363636',
            // 赞助商卡片
            sponsorCardBg: 'rgba(255, 255, 255, 1)',
            sponsorCardBorder: 'rgba(0, 0, 0, 1)',
            sponsorCardIcon: '#4b468f',
            sponsorCardText: '#4b468f',
            // 通用卡片
            cardBg: '#FFFFFF',
            cardBorder: 'transparent',
            cardText: '#363636',
            cardBackdropFilter: 'none',
        },
    },

    // -----------------------------------------
    // 液态金属主题 - 克制的金属蓝
    // -----------------------------------------
    {
        id: 'liquid',
        name: { cn: '液态金属', en: 'Liquid Metal' },
        description: { cn: '液态金属蓝', en: 'Liquid metal blue' },
        mapType: 'line',
        colors: {
            primary: '#0D1B2A',       // 深海军蓝 - 主要文字
            secondary: '#1E4A7A',     // 深蓝
            accent: '#3498DB',        // 亮蓝 - 强调色
            accentHover: '#5DADE2',   // 悬停时的亮蓝
            bgLight: '#ffffffff',       // 奶油色 - 主背景 (用户之前改成了白色)
            bgAlt: '#ffffffff',         // 稍深的奶油色
            bgDark: '#0D1B2A',        // 深海军蓝 - 深色区块
            textPrimary: '#0D1B2A',   // 深海军蓝
            textSecondary: '#1E4A7A', // 深蓝
            textMuted: '#5A7A9A',     // 浅蓝灰
            border: '#D5D3C8',        // 奶油色边框
            mapStroke: '#1E4A7A',     // 深蓝
            mapFill: '#3498DB',       // 亮蓝
            // 导航栏
            navBg: 'rgba(255, 255, 255, 0.85)',
            navText: '#5A7A9A',
            navTextHover: '#0D1B2A',
            // 赞助商卡片
            sponsorCardBg: 'rgba(13, 27, 42, 0.8)',
            sponsorCardBorder: 'transparent',
            sponsorCardIcon: '#FFFFFF',
            sponsorCardText: 'rgba(255,255,255,0.7)',
            // 通用卡片
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBorder: '1px solid rgba(255, 255, 255, 0.3)',
            cardText: '#0D1B2A',
            cardBackdropFilter: 'blur(12px)',
        },
        // 金属渐变 - 45度深蓝到亮蓝平滑渐变 (参考用户提供的橙色几何体效果)
        liquidGradient: 'linear-gradient(45deg, #3498dbb7 0%, #58aae083 60%, #e2f0faff 100%)',
    },

    // -----------------------------------------
    // 圆点地球主题 - 浅色背景 + 蓝色点阵
    // -----------------------------------------
    {
        id: 'dotmap',
        name: { cn: '圆点地球', en: 'Dot Globe' },
        description: { cn: '点阵地球', en: 'Dot matrix globe' },
        mapType: 'dot',
        colors: {
            primary: '#1a365d',       // 深蓝 - 主色调
            secondary: '#2b6cb0',     // 中蓝
            accent: '#3182ce',        // 亮蓝 - 强调色
            accentHover: '#4299e1',   // 悬停蓝
            bgLight: '#ffffffff',       // 浅灰白背景 (用户改为白)
            bgAlt: '#ffffffff',         // 稍深的灰白
            bgDark: '#e2e8f0',        // 浅蓝灰 (原深色区块现在变浅)
            textPrimary: '#1a365d',   // 深蓝文字
            textSecondary: '#4a5568', // 灰色次要文字
            textMuted: '#a0aec0',     // 浅灰弱化文字
            border: '#e2e8f0',        // 浅灰边框
            mapStroke: '#3182ce',     // 亮蓝点阵
            mapFill: '#63b3ed',       // 浅蓝填充
            // 导航栏
            navBg: 'rgba(255, 255, 255, 1)',
            navText: '#a0aec0',
            navTextHover: '#1a365d',
            // 赞助商卡片 - 透明背景无边框深色文字
            sponsorCardBg: 'transparent',
            sponsorCardBorder: 'transparent',
            sponsorCardIcon: '#1a365d',
            sponsorCardText: '#4a5568',
            // 通用卡片 - 透明背景无边框浅色文字
            cardBg: 'transparent',
            cardBorder: 'none',
            cardText: '#64748b', // 浅蓝灰
            cardBackdropFilter: 'none',
        },
    },
];

// 默认主题 ID
export const DEFAULT_THEME_ID: ThemeId = 'purple';

// 根据 ID 获取主题配置
export const getThemeById = (id: ThemeId): ThemeConfig => {
    return THEMES.find(t => t.id === id) || THEMES.find(t => t.id === DEFAULT_THEME_ID)!;
};
