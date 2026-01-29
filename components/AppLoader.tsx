import React, { useState, useEffect, useRef } from 'react';

interface AppLoaderProps {
    onComplete: () => void;
}

const AppLoader: React.FC<AppLoaderProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lineProgress, setLineProgress] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate the line from left to right
        const lineAnimation = setInterval(() => {
            setLineProgress(prev => {
                if (prev >= 100) {
                    clearInterval(lineAnimation);
                    return 100;
                }
                return prev + 4;
            });
        }, 20);

        // After line completes, fade out and call onComplete
        const timeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
        }, 800);

        return () => {
            clearInterval(lineAnimation);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    if (!isVisible) {
        return (
            <div
                ref={containerRef}
                className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none"
                style={{ backgroundColor: '#e7e7e7' }}
            />
        );
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500"
            style={{ backgroundColor: '#e7e7e7' }}
        >
            {/* Animated horizontal line */}
            <div className="absolute left-0 top-1/2 h-[2px] w-full">
                <div
                    className="h-full transition-all duration-100 ease-out"
                    style={{
                        width: `${lineProgress}%`,
                        background: 'linear-gradient(90deg, #6da0d7 0%, #2535bc 100%)'
                    }}
                />
            </div>

            {/* Optional: Heron text */}
            <div
                className="absolute bottom-12 right-12 font-mono text-xs tracking-widest"
                style={{ color: '#6da0d7', opacity: lineProgress / 100 }}
            >
                LOADING...
            </div>
        </div>
    );
};

export default AppLoader;
