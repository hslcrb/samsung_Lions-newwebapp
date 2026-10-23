'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAVIGATION, OFFICIAL } from '@/data/lions';
import { Icon } from './Icon';

export function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const closeMenu = () => dialog.current?.close();

  return (
    <>
      <div className="club-topline"><div className="wrap"><span>대구의 자부심, 우리의 라이온즈.</span><span>INDEPENDENT FAN CONCEPT <span aria-hidden="true">/</span> SINCE 1982</span></div></div>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand" aria-label="삼성 라이온즈 팬 사이트 홈"><Image src="/logo.svg" width={96} height={66} alt="Samsung Lions" preload /></Link>
          <nav className="desktop-nav" aria-label="주 메뉴">{NAVIGATION.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
          <div className="header-actions">
            <a className="ticket-link" href={OFFICIAL.tickets} target="_blank" rel="noopener noreferrer"><Icon name="ticket" /><span>티켓 예매 안내</span><Icon name="external" /></a>
            <button ref={trigger} type="button" className="menu-trigger" aria-label="메뉴 열기" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Icon name="menu" /></button>
          </div>
        </div>
      </header>
      <dialog id="mobile-navigation" ref={dialog} className="mobile-menu" aria-labelledby="mobile-menu-title" onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="mobile-menu-panel">
          <div className="mobile-menu-top"><span id="mobile-menu-title">WE ARE LIONS.</span><button type="button" onClick={closeMenu} aria-label="메뉴 닫기" className="icon-button"><Icon name="close" /></button></div>
          <nav aria-label="모바일 주 메뉴"><Link href="/" onClick={closeMenu}>홈 <span>HOME</span></Link>{NAVIGATION.map((item) => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined} onClick={closeMenu}>{item.label}<span>{item.english}</span></Link>)}</nav>
          <a href={OFFICIAL.tickets} target="_blank" rel="noopener noreferrer" className="button button-blue" onClick={closeMenu}>공식 예매 안내 <Icon name="external" /></a>
          <p className="mobile-menu-note">오늘도, 우리는 삼성.</p>
        </div>
      </dialog>
    </>
  );
}
