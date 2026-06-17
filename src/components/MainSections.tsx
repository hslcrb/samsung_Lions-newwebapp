'use client';

import React from 'react';
import { SITE_CONTENT, THEME } from '@/cms/content';
import { RevealSection } from './RevealSection';

export const BannerSlider: React.FC = () => {
    return (
        <RevealSection className="banner-slider">
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
                {SITE_CONTENT.banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="flex-shrink-0 w-[300px] md-w-600 h-[300px] rounded-2xl p-8 flex flex-col justify-end transition-all hover:scale-105"
                        style={{
                            backgroundColor: banner.color,
                            scrollSnapAlign: 'start',
                            backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.6))`
                        }}
                    >
                        <h3 className="text-2xl font-bold">{banner.title}</h3>
                        <p className="text-sm opacity-80 mt-2">상세보기 →</p>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @media (min-width: 768px) { .md-w-\[600px\] { width: 600px; } }
            `}</style>
        </RevealSection>
    );
};

export const ChampionsSection: React.FC = () => {
    return (
        <RevealSection>
            <h2 className="section-title text-center">OUR CHAMPIONSHIP</h2>
            <div className="grid grid-cols-2 md-grid-cols-4 gap-8">
                {SITE_CONTENT.champions.map((champ) => (
                    <div key={champ.year} className="flex flex-col items-center p-6 glass rounded-xl" style={{ borderColor: `${THEME.accent}33` }}>
                        <span className="text-4xl font-black mb-2" style={{ color: THEME.accent }}>{champ.title}</span>
                        <span className="text-sm font-bold opacity-60">{champ.year}</span>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
};

export const GoodsSection: React.FC = () => {
    return (
        <RevealSection>
            <div className="flex justify-between items-end mb-8">
                <h2 className="section-title mb-0">{SITE_CONTENT.goods.title}</h2>
                <button className="text-sm font-bold border-b border-white pb-1">GO TO SHOP</button>
            </div>
            <div className="grid grid-cols-1 md-grid-cols-3 gap-8">
                {SITE_CONTENT.goods.items.map((item) => (
                    <div key={item.id} className="group cursor-pointer">
                        <div className="aspect-square bg-surface rounded-3xl mb-4 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                            <div className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                🛒
                            </div>
                        </div>
                        <h3 className="font-bold text-xl">{item.name}</h3>
                        <p className="opacity-60">{item.price}</p>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .group:hover .group-hover-bg-primary-40 { background-color: ${THEME.primary}66; }
            `}</style>
        </RevealSection>
    );
};
