'use client';

import React from 'react';
import { LIONS_CMS } from '@/cms/content';
import { RevealSection } from './RevealSection';

interface GridItemProps {
    type: 'SNS' | 'AD';
    title: string;
    content: string;
    color: string;
    index: number;
}

const GridItem: React.FC<GridItemProps> = ({ type, title, content, color, index }) => {
    return (
        <div
            className="p-10 rounded-[3rem] flex flex-col justify-between h-[350px] transition-all hover:scale-[0.98] group cursor-pointer"
            style={{ backgroundColor: color }}
        >
            <div className="flex justify-between items-start">
                <span className="text-[10px] font-black tracking-[0.2em] bg-black/20 self-start px-4 py-1.5 rounded-full uppercase">
                    {type} 0{index + 1}
                </span>
                <span className="text-white/30 group-hover:text-white transition-colors">↗</span>
            </div>
            <div>
                <h4 className="text-sm font-bold opacity-60 mb-2">{title}</h4>
                <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tighter">{content}</h3>
            </div>
        </div>
    );
};

export const SocialAdGrid: React.FC = () => {
    return (
        <RevealSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LIONS_CMS.socialAdGrid.map((item, idx) => (
                    <GridItem
                        key={idx}
                        type={item.type}
                        title={item.title}
                        content={item.content}
                        color={item.color}
                        index={idx}
                    />
                ))}
            </div>
        </RevealSection>
    );
};

export const SocialLogosSection: React.FC = () => {
    return (
        <RevealSection className="py-20">
            <div className="flex flex-wrap justify-center gap-16 lg:gap-24 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                {LIONS_CMS.socialLogos.map((logo) => (
                    <a key={logo.name} href={logo.url} className="flex flex-col items-center gap-4 group">
                        <span className="text-5xl transition-transform group-hover:scale-125 duration-500">{logo.icon}</span>
                        <span className="text-[11px] font-black tracking-[0.3em] uppercase">{logo.name}</span>
                    </a>
                ))}
            </div>
        </RevealSection>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="py-24 mt-20 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
            <div className="container px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-32">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-black mb-8 tracking-tighter italic">SAMSUNG LIONS</h2>
                        <p className="text-sm opacity-40 leading-relaxed font-light mb-8">
                            {LIONS_CMS.footer.address}
                        </p>
                        <div className="flex gap-4">
                            {LIONS_CMS.socialLogos.slice(0, 3).map(logo => (
                                <div key={logo.name} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
                                    <span className="text-sm">{logo.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                        <div className="flex flex-col gap-6">
                            <span className="font-black text-[10px] opacity-20 tracking-[0.3em]">RESOURCES</span>
                            {LIONS_CMS.navigation.slice(0, 3).map(link => (
                                <a key={link.id} href={link.href} className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">{link.label}</a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-6">
                            <span className="font-black text-[10px] opacity-20 tracking-[0.3em]">LEGAL</span>
                            {LIONS_CMS.footer.links.map(link => (
                                <a key={link.id} href={link.href} className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">{link.label}</a>
                            ))}
                        </div>
                        <div className="flex flex-col gap-6">
                            <span className="font-black text-[10px] opacity-20 tracking-[0.3em]">SOCIAL</span>
                            <a href="#" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">Instagram</a>
                            <a href="#" className="text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary transition-all">YouTube</a>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-[10px] font-black opacity-20 uppercase tracking-[0.4em]">
                        {LIONS_CMS.footer.copyright}
                    </span>
                    <div className="flex items-center gap-2 grayscale opacity-30 h-6">
                        {/* Placeholder for small tech badges */}
                        <div className="px-2 py-1 border border-white text-[8px] font-black">NEXT.JS</div>
                        <div className="px-2 py-1 border border-white text-[8px] font-black">TYPESCRIPT</div>
                        <div className="px-2 py-1 border border-white text-[8px] font-black">TAILWIND</div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
