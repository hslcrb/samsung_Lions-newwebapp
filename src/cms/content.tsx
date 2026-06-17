import React from 'react';

/**
 * SAMSUNG LIONS PREMIUM TSX CMS
 * WordPress-tier structured content management system.
 * This file acts as the source of truth for all dynamic content and visual tokens.
 */

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export interface Banner {
    id: number;
    title: string;
    image: string;
    color: string;
    cta?: string;
}

export interface Champion {
    year: number;
    title: string;
    description?: string;
}

export interface GoodsItem {
    id: string;
    name: string;
    price: string;
    image?: string;
    badge?: string;
}

export interface SocialAdItem {
    type: 'SNS' | 'AD';
    title: string;
    content: string;
    color: string;
    link?: string;
}

export interface SiteConfig {
    theme: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
        surface: string;
    };
    navigation: NavItem[];
    hero: {
        videoUrl: string;
        title: string;
        subtitle: string;
        cta: string;
    };
    banners: Banner[];
    champions: Champion[];
    goods: {
        sectionTitle: string;
        items: GoodsItem[];
    };
    socialAdGrid: SocialAdItem[];
    socialLogos: { name: string; icon: string; url: string }[];
    footer: {
        companyName: string;
        address: string;
        copyright: string;
        links: NavItem[];
    };
}

export const LIONS_CMS: SiteConfig = {
    theme: {
        primary: '#074CA1',
        secondary: '#00357A',
        accent: '#FFD700',
        background: '#FFFFFF',
        surface: '#F5F5F5',
    },
    navigation: [
        { id: 'team', label: '구단', href: '/club' },
        { id: 'players', label: '선수단', href: '/players' },
        { id: 'match', label: '경기정보', href: '/matches' },
        { id: 'history', label: '히스토리', href: '/history' },
        { id: 'fans', label: '팬', href: '/community' },
        { id: 'shop', label: '쇼핑', href: '/shop' },
    ],
    hero: {
        videoUrl: 'https://www.youtube.com/embed/L-5aa-5xqOI?autoplay=1&mute=1&controls=0&loop=1&playlist=L-5aa-5xqOI&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1&autohide=1',
        title: '최강삼성! 라이온즈',
        subtitle: '대구의 자부심, 푸른 사자들의 시대',
        cta: '티켓 예매하기',
    },
    banners: [
        { id: 1, title: '2024 시즌 연간 회원 모집', image: '/banners/banner1.jpg', color: '#074CA1', cta: '자세히 보기' },
        { id: 2, title: 'NEW APP 출시 기념 이벤트', image: '/banners/banner2.jpg', color: '#00357A', cta: '참여하기' },
        { id: 3, title: '라이온즈 파크 투어 안내', image: '/banners/banner3.jpg', color: '#666666', cta: '예약하기' },
    ],
    champions: [
        { year: 1985, title: 'V1' },
        { year: 2002, title: 'V2' },
        { year: 2005, title: 'V3' },
        { year: 2006, title: 'V4' },
        { year: 2011, title: 'V5' },
        { year: 2012, title: 'V6' },
        { year: 2013, title: 'V7' },
        { year: 2014, title: 'V8' },
    ],
    goods: {
        sectionTitle: '라이온즈 굿즈샵',
        items: [
            { id: 'g1', name: '홈 유니폼 2024', price: '120,000원', badge: '신상' },
            { id: 'g2', name: '우승 기념 모자', price: '35,000원', badge: '베스트' },
            { id: 'g3', name: '라이온 마스코트 인형', price: '28,000원' },
        ],
    },
    socialAdGrid: [
        { type: 'SNS', title: '인스타그램', content: '@samsunglions_notes', color: '#E1306C', link: 'https://instagram.com' },
        { type: 'AD', title: '티켓 예매', content: '지금 당장 라이온즈 파크로!', color: '#074CA1', link: '#' },
        { type: 'SNS', title: '유튜브', content: '라이온즈 TV 구독하기', color: '#FF0000', link: 'https://youtube.com' },
        { type: 'AD', title: '회원 혜택', content: '라이온즈 몰 포인트 2배 적립', color: '#00357A', link: '#' },
    ],
    socialLogos: [
        { name: '인스타그램', icon: '📸', url: '#' },
        { name: '유튜브', icon: '📺', url: '#' },
        { name: '페이스북', icon: '📘', url: '#' },
        { name: '트위터/X', icon: '🐦', url: '#' },
    ],
    footer: {
        companyName: '삼성 라이온즈',
        address: '대구광역시 수성구 야구전설로 1 (연호동)',
        copyright: '© 삼성 라이온즈. 모든 권리 보유.',
        links: [
            { id: 'privacy', label: '개인정보처리방침', href: '/privacy' },
            { id: 'terms', label: '이용약관', href: '/terms' },
        ],
    }
};
