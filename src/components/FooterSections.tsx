'use client';

import React from 'react';
import { SITE_CONTENT, THEME } from '@/cms/content';
import { RevealSection } from './RevealSection';

interface GridItemProps {
    type: string;
    content: string;
    color: string;
    index: number;
}

const GridItem: React.FC<GridItemProps> = ({ type, content, color, index }) => {
    return (
        <div
            className="p-10 rounded-3xl flex flex-col justify-between h-[300px] transition-all hover:scale-105"
            style={{ backgroundColor: color }}
        >
            <span className="text-xs font-black tracking-widest bg-black-20 self-start px-3 py-1 rounded-full">
                {type} {index + 1}
            </span>
            <h3 className="text-2xl font-black leading-tight">{content}</h3>
            <style jsx>{`
                .bg-black-20 { background-color: rgba(0,0,0,0.2); }
                .self-start { align-self: flex-start; }
            `}</style>
        </div>
    );
};

export const SocialAdGrid: React.FC = () => {
    return (
        <RevealSection>
            <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
                {SITE_CONTENT.socialAd.map((item, idx) => (
                    <GridItem
                        key={idx}
                        type={item.type}
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
        <RevealSection className="py-10">
            <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover-grayscale-0 hover-opacity-100 transition-all">
                {SITE_CONTENT.socialLogos.map((logo) => (
                    <div key={logo.name} className="flex flex-col items-center gap-2 cursor-pointer">
                        <span className="text-4xl">{logo.icon}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase">{logo.name}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hover-grayscale-0:hover { filter: grayscale(0); }
                .hover-opacity-100:hover { opacity: 1; }
            `}</style>
        </RevealSection>
    );
};

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 mt-20 border-t border-white-5">
            <div className="container">
                <div className="flex flex-col md-flex-row justify-between items-start gap-10">
                    <div>
                        <h2 className="text-3xl font-black mb-4">SAMSUNG LIONS</h2>
                        <p className="text-sm opacity-50 max-w-sm leading-relaxed">
                            {SITE_CONTENT.footer.address}
                        </p>
                    </div>
                    <div className="flex gap-20">
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-xs opacity-30">CLUB</span>
                            <a href="#" className="text-sm hover:text-primary">구단소개</a>
                            <a href="#" className="text-sm hover:text-primary">엠블럼</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-xs opacity-30">CONTACT</span>
                            <a href="#" className="text-sm hover:text-primary">문의하기</a>
                            <a href="#" className="text-sm hover:text-primary">채용공고</a>
                        </div>
                    </div>
                </div>
                <div className="mt-20 pt-8 border-t border-white-5 text-[10px] font-bold opacity-30 uppercase tracking-widest">
                    {SITE_CONTENT.footer.copyright}
                </div>
            </div>
            <style jsx>{`
                .border-white-5 { border-color: rgba(255,255,255,0.05); }
            `}</style>
        </footer>
    );
};
