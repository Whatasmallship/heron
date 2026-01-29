import React from 'react';
import { Lang } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface CareersSectionProps {
    lang: Lang;
    id: string;
}

const CAREER_STORIES = [
    {
        id: 'story1',
        title: { cn: '从实习生到技术主管', en: 'Intern to Tech Lead' },
        quote: {
            cn: '"三年前我参加了Project Heron的第一场黑客松，那次经历彻底改变了我的职业轨迹。"',
            en: '"Three years ago I joined my first Project Heron hackathon. That experience completely changed my career trajectory."'
        },
        author: { cn: '— 张明，现任某独角兽公司技术主管', en: '— Ming Zhang, Tech Lead at a Unicorn Startup' },
        highlight: '3x',
        highlightLabel: { cn: '薪资增长', en: 'Salary Growth' }
    },
    {
        id: 'story2',
        title: { cn: '跨越边界', en: 'Crossing Boundaries' },
        quote: {
            cn: '"导师计划让我认识了来自不同背景的顶尖工程师，他们的视角帮助我突破了技术瓶颈。"',
            en: '"The mentorship program connected me with top engineers from diverse backgrounds."'
        },
        author: { cn: '— 李华，全栈工程师', en: '— Hua Li, Full-Stack Engineer' },
        highlight: '150+',
        highlightLabel: { cn: '认证导师', en: 'Certified Mentors' }
    },
    {
        id: 'story3',
        title: { cn: '创造属于自己的机会', en: 'Creating Your Own Opportunities' },
        quote: {
            cn: '"在这里，你不只是找工作——你是在打造自己的职业品牌。"',
            en: '"Here, you\'re not just job hunting—you\'re building your career brand."'
        },
        author: { cn: '— 王芳，开发者关系专家', en: '— Fang Wang, Developer Relations' },
        highlight: '25K+',
        highlightLabel: { cn: '社区成员', en: 'Community Members' }
    },
    {
        id: 'story4',
        title: { cn: '技术改变世界', en: 'Tech Changes the World' },
        quote: {
            cn: '"我在黑客松上开发的项目，后来成为了一家公司的核心产品。"',
            en: '"The project I built at a hackathon became the core product of a company."'
        },
        author: { cn: '— 陈杰，创业公司CTO', en: '— Jie Chen, Startup CTO' },
        highlight: '500+',
        highlightLabel: { cn: '创业项目孵化', en: 'Startups Incubated' }
    }
];

const CareersSection: React.FC<CareersSectionProps> = ({ lang, id }) => {
    const { theme, isLiquid, isDotMap } = useTheme();

    return (
        <section
            id={id}
            className="min-h-screen relative pt-20 w-full transition-colors duration-500"
            style={{ backgroundColor: theme.colors.bgLight }}
        >
            <div className="w-full max-w-[1400px] mx-auto px-8 lg:px-16">
                {/* Header */}
                <div className="py-12">
                    <h2
                        className="text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: theme.colors.textPrimary }}
                    >
                        {lang === 'cn' ? '成长故事' : 'GROWTH STORIES'}
                    </h2>
                    <p style={{ color: theme.colors.textSecondary }} className="text-lg">
                        {lang === 'cn' ? '真实的声音，真实的蜕变。' : 'Real voices, real transformations.'}
                    </p>
                </div>

                {/* Stories grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 pb-16">
                    {CAREER_STORIES.map((story) => (
                        <div
                            key={story.id}
                            className="flex gap-6 p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                            style={{
                                backgroundColor: theme.colors.cardBg,
                                border: theme.colors.cardBorder === 'none' ? 'none' : theme.colors.cardBorder,
                                backdropFilter: theme.colors.cardBackdropFilter,
                            }}
                        >
                            {/* Highlight number */}
                            <div className="flex-shrink-0 w-[100px]">
                                <div
                                    className="text-4xl lg:text-5xl font-bold"
                                    style={{
                                        color: theme.colors.accent,
                                        textShadow: isDotMap ? `0 0 15px ${theme.colors.accent}40` : 'none'
                                    }}
                                >
                                    {story.highlight}
                                </div>
                                <div
                                    className="text-xs font-mono uppercase tracking-wider mt-1"
                                    style={{ color: theme.colors.textMuted }}
                                >
                                    {story.highlightLabel[lang]}
                                </div>
                            </div>

                            {/* Story content */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2" style={{ color: theme.colors.textPrimary }}>
                                    {story.title[lang]}
                                </h3>
                                <blockquote className="italic mb-2 leading-relaxed text-sm" style={{ color: theme.colors.textSecondary }}>
                                    {story.quote[lang]}
                                </blockquote>
                                <p className="text-xs font-mono" style={{ color: theme.colors.textMuted }}>
                                    {story.author[lang]}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="py-10" style={{ borderTop: `1px solid ${theme.colors.border}` }}>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold" style={{ color: theme.colors.textPrimary }}>
                                {lang === 'cn' ? '准备好开始你的故事了吗？' : 'Ready to Start Your Story?'}
                            </h3>
                            <p className="text-sm mt-1" style={{ color: theme.colors.textSecondary }}>
                                {lang === 'cn' ? '加入我们的社区，开启你的成长之旅。' : 'Join our community and begin your growth journey.'}
                            </p>
                        </div>
                        <button
                            className="px-6 py-3 font-mono text-sm transition-all duration-300"
                            style={{
                                backgroundColor: theme.colors.accent,
                                color: '#FFFFFF',
                                boxShadow: isDotMap ? `0 0 15px ${theme.colors.accent}40` : 'none'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.accentHover}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.accent}
                        >
                            {lang === 'cn' ? '加入我们' : 'JOIN US'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareersSection;
