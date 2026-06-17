'use client';

import React from 'react';
import Link from 'next/link';
import { LIONS_CMS } from '@/cms/content';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 glass h-20 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white transition-transform group-hover:rotate-12 shadow-lg"
            style={{ backgroundColor: LIONS_CMS.theme.primary, color: 'white' }}
          >
            SL
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-zinc-900">SAMSUNG LIONS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {LIONS_CMS.navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="relative text-sm font-bold uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-zinc-200 hover:bg-zinc-900 hover:text-white transition-all text-zinc-900">
            LOGIN
          </button>
          {/* Mobile Menu Icon */}
          <button className="lg:hidden text-zinc-900">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};
