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
                    className="text-7xl md:text-9xl font-black italic tracking-tighter mb-4 opacity-0 animate-fade-in-up"
                    style={{ textShadow: '0 0 30px rgba(7, 76, 161, 0.5)' }}
                >
                    {SITE_CONTENT.hero.title}
                </h1>
                <p className="text-xl md:text-2xl font-light tracking-wide mb-8 opacity-0 animate-fade-in-up delay-200">
                    {SITE_CONTENT.hero.subtitle}
                </p>
                <button
                    className="px-10 py-4 bg-white text-blue-900 font-bold text-lg rounded-sm hover:scale-105 transition-transform"
                    style={{ backgroundColor: 'white', color: THEME.primary }}
                >
                    {SITE_CONTENT.hero.cta}
                </button>
            </div>

            <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; position: absolute; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .text-center { text-align: center; }
        .text-7xl { font-size: 4.5rem; }
        .md\\:text-9xl { font-size: 8rem; }
        .font-black { font-weight: 900; }
        .italic { font-style: italic; }
        .tracking-tighter { letter-spacing: -0.05em; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-8 { margin-bottom: 2rem; }
        .text-xl { font-size: 1.25rem; }
        .md\\:text-2xl { font-size: 1.5rem; }
        .font-light { font-weight: 300; }
        .tracking-wide { letter-spacing: 0.05em; }
        .px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .font-bold { font-weight: 700; }
        .text-lg { font-size: 1.125rem; }
        .rounded-sm { border-radius: 0.125rem; }
      `}</style>
        </section>
    );
};
