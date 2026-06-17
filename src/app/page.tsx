'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { Header } from '@/components/Header';
import { BannerSlider, ChampionsSection, GoodsSection } from '@/components/MainSections';
import { SocialAdGrid, SocialLogosSection, Footer } from '@/components/FooterSections';
import { useReveal } from '@/hooks/useReveal';

export default function Home() {
  // 스크롤 등장 애니메이션 훅 사용
  useReveal();

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section (Video) */}
      <Hero />

      {/* Sections with Reveal Effect */}
      <div className="relative z-10 overflow-hidden">
        {/* Banner Slide */}
        <BannerSlider />

        {/* Champions Logo Section */}
        <ChampionsSection />

        {/* Goods Shop Section */}
        <GoodsSection />

        {/* Social & AD Grid Section (4 items, 2x2 style) */}
        <SocialAdGrid />

        {/* Social Logos Section */}
        <SocialLogosSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
