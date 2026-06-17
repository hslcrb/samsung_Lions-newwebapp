'use client';

import React from 'react';
import { CanvasVideo } from './ObfuscatedMedia';
import { SITE_CONTENT, THEME } from '@/cms/content';

export const Hero: React.FC = () => {
    return (
        <section className="hero-video-container">
            <CanvasVideo src={SITE_CONTENT.hero.videoUrl} />

            {/* Hero Bottom Gradient */}
            <div className="hero-gradient-overlay" />

            {/* Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                <h1
                    className="text-7xl md-text-9xl font-black italic tracking-tighter mb-4 opacity-0 animate-fade-in-up"
                    style={{ textShadow: '0 0 30px rgba(7, 76, 161, 0.5)' }}
                >
                    {SITE_CONTENT.hero.title}
                </h1>
                <p className="text-xl md-text-2xl font-light tracking-wide mb-8 opacity-0 animate-fade-in-up delay-200">
                    {SITE_CONTENT.hero.subtitle}
                </p>
                <button
                    className="px-10 py-4 bg-white text-blue-900 font-bold text-lg rounded-sm hover:scale-105 transition-transform"
                    style={{ backgroundColor: 'white', color: THEME.primary }}
                >
                    {SITE_CONTENT.hero.cta}
                </button>
            </div>
        </section>
    );
};
