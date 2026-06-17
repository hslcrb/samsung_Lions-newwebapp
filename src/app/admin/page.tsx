'use client';

import React, { useState } from 'react';
import { LIONS_CMS } from '@/cms/content';
import { Header } from '@/components/Header';
import { Footer } from '@/components/FooterSections';

export default function AdminPage() {
    const [cmsData, setCmsData] = useState(LIONS_CMS);

    return (
        <main className="min-h-screen bg-white text-zinc-900">
            <Header />

            <div className="container py-40">
                <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-100 pb-10">
                    <div>
                        <span className="text-primary font-black text-xs tracking-widest uppercase mb-2 block">Demo Admin Panel</span>
                        <h1 className="text-5xl font-black italic tracking-tighter">CMS DASHBOARD</h1>
                    </div>
                    <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                        <span className="text-sm font-bold text-primary">● PUBLIC DEMO MODE (No Login Required)</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Theme Config View */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 shadow-sm">
                            <h2 className="text-xl font-black mb-6 flex items-center gap-3">
                                <span className="w-2 h-6 bg-primary rounded-full"></span>
                                THEME TOKENS
                            </h2>
                            <div className="space-y-4">
                                {Object.entries(cmsData.theme).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-zinc-100">
                                        <span className="text-xs font-black uppercase opacity-40">{key}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 rounded-full border border-zinc-200" style={{ backgroundColor: value }}></div>
                                            <span className="text-sm font-mono font-bold">{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Config View */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="p-10 bg-white rounded-[3rem] border border-zinc-100 shadow-xl">
                            <h2 className="text-2xl font-black mb-10 flex items-center gap-4">
                                <span className="w-3 h-8 bg-secondary rounded-full"></span>
                                HERO CONFIGURATION
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black opacity-30 ml-4">HERO TITLE</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={cmsData.hero.title}
                                        className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-zinc-900 focus:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black opacity-30 ml-4">HERO SUBTITLE</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={cmsData.hero.subtitle}
                                        className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-zinc-900 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black opacity-30 ml-4">VIDEO SOURCE (YOUTUBE)</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={cmsData.hero.videoUrl}
                                        className="w-full p-5 bg-zinc-50 border border-zinc-100 rounded-2xl font-mono text-xs font-bold text-primary focus:outline-none truncate"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-zinc-900 rounded-[3rem] text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-black mb-6 italic">SYSTEM STATUS</h2>
                                <p className="opacity-60 text-sm mb-8 leading-relaxed">
                                    본 페이지는 데모용 관리자 화면입니다. 현재는 `src/cms/content.tsx`의 정적 데이터를 시각화하고 있으며,
                                    추후 DB 연동 시 실시간 편집 기능이 활성화됩니다.
                                </p>
                                <button className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform">
                                    APPLY CHANGES (DEMO)
                                </button>
                            </div>
                            <div className="absolute top-10 right-10 text-white/5 font-black text-9xl italic pointer-events-none">
                                ADM
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
