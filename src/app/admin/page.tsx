import type { Metadata } from 'next';
import Link from 'next/link';
import { OFFICIAL, PLAYERS, CHAMPIONS, VERIFIED_DATE } from '@/data/lions';

export const metadata: Metadata = { title: '콘텐츠 관리 안내', robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <main id="main-content" className="subpage">
      <header className="page-intro"><div className="wrap"><p className="eyebrow">CONTENT REFERENCE</p><h1>콘텐츠 관리 안내.</h1><p>이 프로젝트는 정적 콘텐츠로 운영되는 비공식 팬 사이트입니다.</p></div></header>
      <section className="wrap fan-section" aria-labelledby="content-guide-title">
        <div className="fan-section-header"><div><p className="eyebrow">SOURCE OF TRUTH</p><h2 id="content-guide-title" className="section-heading">수정할 곳을 명확하게.</h2></div><Link href="/" className="text-link">홈으로 돌아가기 →</Link></div>
        <div className="admin-guide"><p>이 화면에서는 내용을 수정하거나 저장하지 않습니다. 저장소에서 아래 파일을 수정한 뒤 검증·배포하면 사이트에 반영됩니다.</p><dl><dt>구단·선수·링크·우승 기록</dt><dd><code>src/data/lions.ts</code> · 선수 스포트라이트 {PLAYERS.length}명, 우승 기록 {CHAMPIONS.length}개</dd><dt>경기 일정 스냅샷</dt><dd><code>src/data/schedule.ts</code> · 데이터와 함께 확인 날짜도 갱신합니다.</dd><dt>사진과 폰트 출처</dt><dd><code>sessions/02/assets.md</code>, <code>sessions/02/fonts.md</code></dd></dl><p>현재 콘텐츠 확인일: {VERIFIED_DATE}</p><a className="button button-blue" href={OFFICIAL.home} target="_blank" rel="noopener noreferrer">공식 정보 확인 ↗</a></div>
      </section>
    </main>
  );
}
