import Link from 'next/link';
import { NAVIGATION, OFFICIAL } from '@/data/lions';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand"><div className="footer-manifesto">ALWAYS LIONS.<br /><span>ALWAYS BLUE.</span></div><p>어제도, 오늘도, 내일도. 우리는 삼성.</p></div>
          <div className="footer-links"><h2>EXPLORE LIONS</h2><ul>{NAVIGATION.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}</ul></div>
          <div className="footer-links"><h2>KEEP IN TOUCH</h2><ul><li><a href={OFFICIAL.youtube} target="_blank" rel="noopener noreferrer">라이온즈TV ↗</a></li><li><a href={OFFICIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></li><li><a href={OFFICIAL.naver} target="_blank" rel="noopener noreferrer">네이버TV ↗</a></li><li><a href={OFFICIAL.home} target="_blank" rel="noopener noreferrer">공식 홈페이지 ↗</a></li></ul></div>
        </div>
        <div className="footer-bottom"><p>팬이 만든 비공식 리디자인 프로젝트입니다. 사진·로고·구단 명칭의 권리는 삼성 라이온즈 및 각 권리자에게 있습니다.<br />경기·선수 정보는 확인 시점의 자료이며, 예매·구매 및 최신 안내는 <a href={OFFICIAL.home} target="_blank" rel="noopener noreferrer">공식 홈페이지</a>에서 확인하세요.</p><span>DESIGNED FOR THE BLUE. © 2026</span></div>
      </div>
    </footer>
  );
}
