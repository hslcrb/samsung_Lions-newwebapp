'use client';

import React from 'react';
import { LIONS_CMS } from '@/cms/content';
import { RevealSection } from './RevealSection';

export const BannerSlider: React.FC = () => {
    return (
        <RevealSection className="banner-slider">
            <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
                {LIONS_CMS.banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="flex-shrink-0 w-[400px] md:w-[600px] h-[350px] rounded-[2.5rem] p-10 flex flex-col justify-end transition-all hover:scale-[1.02] snap-start group cursor-pointer relative overflow-hidden shadow-xl"
                        style={{ backgroundColor: banner.color }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black mb-3 leading-tight text-white">{banner.title}</h3>
                            <button className="text-sm font-bold bg-white/20 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all text-white">
                                {banner.cta || '자세히 보기'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
};

export const ChampionsSection: React.FC = () => {
    return (
        <RevealSection>
            <h2 className="section-title text-center">우리의 우승 역사</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {LIONS_CMS.champions.map((champ) => (
                    <div key={champ.year} className="flex flex-col items-center p-8 glass rounded-3xl group border-zinc-200 hover:border-primary/40 transition-all shadow-sm">
                        {champ.emblem ? (
                            <img
                                src={champ.emblem}
                                alt={`${champ.year} 한국시리즈 우승 엠블럼`}
                                className="w-full max-w-[120px] h-[120px] object-contain mb-4 transition-transform group-hover:scale-110"
                            />
                        ) : (
                            <span className="text-primary text-5xl font-black mb-4 transition-transform group-hover:scale-110">
                                {champ.title}
                            </span>
                        )}
                        <div className="w-10 h-1 bg-primary/20 mb-3 group-hover:w-20 transition-all" />
                        <span className="text-lg font-black tracking-widest text-zinc-400 group-hover:text-zinc-900">{champ.year}</span>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
};

export const GoodsSection: React.FC = () => {
    return (
        <RevealSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <h2 className="section-title mb-0">{LIONS_CMS.goods.sectionTitle}</h2>
                <button className="group text-sm font-black tracking-widest flex items-center gap-2 hover:text-primary transition-colors text-zinc-900">
                    공식 쇼핑몰 바로가기
                    <span className="w-8 h-px bg-zinc-900 group-hover:bg-primary transition-all" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {LIONS_CMS.goods.items.map((item) => (
                    <div key={item.id} className="group flex flex-col">
                        <div className="aspect-[4/5] bg-zinc-50 rounded-[2rem] p-12 mb-6 overflow-hidden relative flex items-center justify-center border border-zinc-100 group-hover:border-primary/20 transition-all shadow-sm">
                            {item.badge && (
                                <span className="absolute top-6 left-6 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full z-10">
                                    {item.badge}
                                </span>
                            )}
                            <div className="w-full h-full bg-zinc-100 rounded-2xl flex items-center justify-center font-black text-zinc-200 text-8xl italic uppercase select-none group-hover:scale-110 transition-transform">
                                굿즈
                            </div>
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors pointer-events-none" />
                            <div className="absolute bottom-8 right-8 bg-zinc-900 text-white w-14 h-14 rounded-full flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                            </div>
                        </div>
                        <h3 className="font-bold text-2xl mb-2 group-hover:text-primary transition-colors text-zinc-900">{item.name}</h3>
                        <p className="text-lg font-light text-zinc-500">{item.price}</p>
                    </div>
                ))}
            </div>
        </RevealSection>
    );
};
