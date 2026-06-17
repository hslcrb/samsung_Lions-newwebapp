import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/FooterSections';

export default function SubPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />
            <div className="container py-40">
                <h1 className="section-title">페이지 준비 중입니다</h1>
                <p className="opacity-60">삼성 라이온즈의 새로운 웹사이트를 기대해 주세요.</p>
            </div>
            <Footer />
        </main>
    );
}
