'use client';

import React from 'react';
import { CanvasVideo } from './ObfuscatedMedia';
import { LIONS_CMS } from '@/cms/content';

export const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <CanvasVideo src={LIONS_CMS.hero.videoUrl} className="w-full h-full object-cover" />

            {/* Refined Hero Bottom Gradient (Feathered Transition) */}
            <div className="hero-gradient-overlay" />

            {/* Content Overlays */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter mb-6 opacity-0 animate-fade-in-up"
                    style={{ textShadow: '0 0 40px rgba(7, 76, 161, 0.6)' }}
                >
                    {LIONS_CMS.hero.title}
                </h1>
                <p className="text-lg md:text-2xl font-light tracking-[0.2em] mb-10 opacity-0 animate-fade-in-up [animation-delay:200ms]">
                    {LIONS_CMS.hero.subtitle}
                </p>
                <button
                    className="group relative px-12 py-5 bg-white text-black font-black text-lg overflow-hidden transition-all hover:pr-16"
                    style={{ color: LIONS_CMS.theme.secondary }}
                >
                    <span className="relative z-10">{LIONS_CMS.hero.cta}</span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 group-hover:right-8">
                        →
                    </span>
                    <div className="absolute inset-0 bg-accent translate-x-[-100%] transition-transform group-hover:translate-x-0 -z-10" />
                </button>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white/50 rounded-full" />
                </div>
            </div>
        </section>
    );
};
