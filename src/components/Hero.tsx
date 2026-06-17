'use client';

import React from 'react';
import { LIONS_CMS } from '@/cms/content';
import { HeroGradient } from './HeroGradient';
import { TouchInterceptor } from './TouchInterceptor';

export const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-white">
            {/* YouTube Background Iframe - pointer-events-none으로 기본 조작 차단 */}
            <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <iframe
                    src={LIONS_CMS.hero.videoUrl}
                    className="w-full h-full scale-[1.5] aspect-video object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    style={{ border: 'none' }}
                ></iframe>
            </div>

            {/* Component-based Protective Layers */}
            <TouchInterceptor />
            <HeroGradient />

            {/* Content Overlays */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <h1
                    className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter mb-6 opacity-0 animate-fade-in-up text-zinc-900"
                    style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.8)' }}
                >
                    {LIONS_CMS.hero.title}
                </h1>
                <p className="text-lg md:text-2xl font-black tracking-[0.2em] mb-10 opacity-0 animate-fade-in-up [animation-delay:200ms] text-primary">
                    {LIONS_CMS.hero.subtitle}
                </p>
                <button
                    className="group relative px-12 py-5 bg-primary text-white font-black text-lg overflow-hidden transition-all hover:pr-16 shadow-xl"
                >
                    <span className="relative z-10">{LIONS_CMS.hero.cta}</span>
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100 group-hover:right-8">
                        →
                    </span>
                    <div className="absolute inset-0 bg-secondary translate-x-[-100%] transition-transform group-hover:translate-x-0 -z-10" />
                </button>
            </div>

            {/* Decorative Element (Scroll Guide) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-500 animate-bounce group-scroll-guide">
                <div className="w-6 h-10 border-2 border-zinc-900/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-primary rounded-full" />
                </div>
            </div>
        </section>
    );
};
