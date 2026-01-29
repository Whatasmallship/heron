import React from 'react';
import { Lang } from '../types';
import { STATIC_REGISTRY } from '../data/staticRegistry';
import { useTheme } from '../contexts/ThemeContext';

interface SponsorsSectionProps {
    lang: Lang;
    id: string;
}

const SPONSORS_COL1 = [
    { name: 'Vercel', logo: '▲' },
    { name: 'Stripe', logo: 'S' },
    { name: 'Figma', logo: 'F' },
    { name: 'Notion', logo: 'N' },
    { name: 'Linear', logo: 'L' },
];

const SPONSORS_COL2 = [
    { name: 'Supabase', logo: '⚡' },
    { name: 'Prisma', logo: 'P' },
    { name: 'Railway', logo: 'R' },
    { name: 'Resend', logo: '✉' },
    { name: 'Clerk', logo: 'C' },
];

const SPONSORS_COL3 = [
    { name: 'Neon', logo: 'N' },
    { name: 'Turso', logo: 'T' },
    { name: 'Upstash', logo: 'U' },
    { name: 'Deno', logo: 'D' },
    { name: 'Bun', logo: 'B' },
];

const SponsorsSection: React.FC<SponsorsSectionProps> = ({ lang, id }) => {
    const impactData = STATIC_REGISTRY.impactData;
    const { theme, isLiquid, isDotMap } = useTheme();

    const SponsorCard: React.FC<{ name: string; logo: string }> = ({ name, logo }) => (
        <div
            className="w-full h-[100px] flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 mb-3"
            style={{
                backgroundColor: theme.colors.sponsorCardBg,
                border: theme.colors.sponsorCardBorder === 'transparent'
                    ? 'none'
                    : `1px solid ${theme.colors.sponsorCardBorder}`,
                backdropFilter: theme.colors.sponsorCardBg !== 'transparent' ? 'blur(12px)' : 'none',
            }}
        >
            <div className="text-center">
                <div
                    className="text-3xl mb-1"
                    style={{ color: theme.colors.sponsorCardIcon }}
                >
                    {logo}
                </div>
                <div className="text-[10px] font-mono" style={{ color: theme.colors.sponsorCardText }}>
                    {name}
                </div>
            </div>
        </div>
    );

    return (
        <section
            id={id}
            className="min-h-screen flex relative overflow-hidden pt-20 transition-colors duration-500"
            style={{ backgroundColor: theme.colors.bgDark }}
        >
            {/* Left: Impact data - numbers get liquid metal effect in liquid theme */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 lg:p-16">
                <h2
                    className="text-3xl font-bold mb-12"
                    style={{ color: isDotMap ? theme.colors.textPrimary : theme.colors.bgLight }}
                >
                    {lang === 'cn' ? '合作与资源' : 'PARTNERS'}
                </h2>

                {/* Prize Pool - THIS gets liquid metal in liquid theme */}
                <div className="mb-12">
                    <div
                        className={`text-5xl lg:text-6xl font-bold mb-2 ${isLiquid ? 'liquid-metal-text' : ''}`}
                        style={{
                            color: isLiquid ? undefined : (isDotMap ? theme.colors.accent : theme.colors.bgLight),
                        }}
                    >
                        {impactData.prizePool[lang]}
                    </div>
                    <div className="text-sm font-mono uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                        {impactData.prizeLabel[lang]}
                    </div>
                </div>

                {/* Partners */}
                <div>
                    <div
                        className="text-5xl lg:text-6xl font-bold mb-2"
                        style={{
                            color: isDotMap ? theme.colors.accent : theme.colors.bgLight,
                        }}
                    >
                        {impactData.partners[lang]}
                    </div>
                    <div className="text-sm font-mono uppercase tracking-wider" style={{ color: theme.colors.textMuted }}>
                        {impactData.partnersLabel[lang]}
                    </div>
                </div>
            </div>

            {/* Right: 3-column carousel */}
            <div className="hidden lg:flex w-[60%] items-center gap-3 p-8 overflow-hidden">
                <div className="flex-1 h-[600px] overflow-hidden relative">
                    <div className="scroll-up" style={{ display: 'flex', flexDirection: 'column' }}>
                        {[...SPONSORS_COL1, ...SPONSORS_COL1].map((sponsor, index) => (
                            <SponsorCard key={`col1-${index}`} name={sponsor.name} logo={sponsor.logo} />
                        ))}
                    </div>
                </div>

                <div className="flex-1 h-[600px] overflow-hidden relative">
                    <div className="scroll-down" style={{ display: 'flex', flexDirection: 'column' }}>
                        {[...SPONSORS_COL2, ...SPONSORS_COL2].map((sponsor, index) => (
                            <SponsorCard key={`col2-${index}`} name={sponsor.name} logo={sponsor.logo} />
                        ))}
                    </div>
                </div>

                <div className="flex-1 h-[600px] overflow-hidden relative">
                    <div className="scroll-up" style={{ display: 'flex', flexDirection: 'column', animationDuration: '25s' }}>
                        {[...SPONSORS_COL3, ...SPONSORS_COL3].map((sponsor, index) => (
                            <SponsorCard key={`col3-${index}`} name={sponsor.name} logo={sponsor.logo} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SponsorsSection;
