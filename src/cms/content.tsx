import React from 'react';

/**
 * 물리적 TSX CMS (Physical TSX CMS)
 * 여기서 모든 사이트의 가변 데이터와 색상을 관리합니다.
 * DB 연결 전 단계로, 하드코딩을 지양하고 이 파일을 통해 관리합니다.
 */

export const THEME = {
  primary: '#074CA1', // 삼성 라이온즈 블루
  secondary: '#00357A', // 다크 블루
  accent: '#FFD700', // 골드 (챔피언 포인트)
  text: '#FFFFFF',
  background: '#000000',
  surface: '#111111',
  gradientHero: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
};

export const SITE_CONTENT = {
  header: {
    nav: [
      { id: 'team', label: '구단', href: '/club' },
      { id: 'players', label: '선수단', href: '/players' },
      { id: 'match', label: '경기정보', href: '/matches' },
      { id: 'history', label: '히스토리', href: '/history' },
      { id: 'fans', label: '팬', href: '/community' },
      { id: 'shop', label: '쇼핑', href: '/shop' },
    ],
  },
  hero: {
    videoUrl: 'https://cdn.pixabay.com/video/2016/09/20/5125-183794356_tiny.mp4', // 예시 영상 (나중에 교체 가능)
    title: 'SAMSUNG LIONS',
    subtitle: '대구의 자부심, 푸른 사자들의 시대',
    cta: '티켓 예매하기',
  },
  banners: [
    { id: 1, title: '2024 시즌 연간 회원 모집', image: '/banners/banner1.jpg', color: '#074CA1' },
    { id: 2, title: 'NEW APP 출시 기념 이벤트', image: '/banners/banner2.jpg', color: '#00357A' },
    { id: 3, title: '라이온즈 파크 투어 안내', image: '/banners/banner3.jpg', color: '#C0C0C0' },
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
    title: 'LIONS GOODS SHOP',
    items: [
      { id: 'g1', name: 'Home Uniform', price: '120,000₩' },
      { id: 'g2', name: 'Winning Cap', price: '35,000₩' },
      { id: 'g3', name: 'Lion Mascot Doll', price: '28,000₩' },
    ],
  },
  socialAd: [
    { type: 'SNS', content: 'Instagram @samsunglions_notes', color: '#E1306C' },
    { type: 'AD', content: '지금 당장 라이온즈 파크로!', color: '#074CA1' },
    { type: 'SNS', content: 'YouTube Lions TV', color: '#FF0000' },
    { type: 'AD', content: '삼성 라이온즈 몰 포인트 2배 적립', color: '#00357A' },
  ],
  socialLogos: [
    { name: 'Instagram', icon: '📸' },
    { name: 'YouTube', icon: '📺' },
    { name: 'Facebook', icon: '📘' },
    { name: 'Twitter', icon: '🐦' },
  ],
  footer: {
    address: '대구광역시 수성구 야구전설로 1 (연호동)',
    copyright: '© SAMSUNG LIONS. ALL RIGHTS RESERVED.',
  }
};
