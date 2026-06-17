'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONTENT, THEME } from '@/cms/content';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-300 glass" style={{ height: 'var(--nav-height)' }}>
            <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl"
                        style={{ backgroundColor: THEME.primary, color: 'white', border: '2px solid white' }}
                    >
                        SL
                    </div>
                    <span className="font-extrabold text-2xl tracking-tighter text-white">SAMSUNG LIONS</span>
                </Link>

                <nav className="hidden lg:flex items-center gap-8">
                    {SITE_CONTENT.header.nav.map((item) => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="text-sm font-semibold uppercase tracking-widest hover:text-blue-400 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 hover:bg-white hover:text-black transition-all">
                        LOGIN
                    </button>
                </div>
            </div>

            <style jsx>{`
        header {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        nav a {
          position: relative;
          padding: 0.5rem 0;
        }
        nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }
        nav a:hover::after {
          width: 100%;
        }
      `}</style>
        </header>
    );
};
