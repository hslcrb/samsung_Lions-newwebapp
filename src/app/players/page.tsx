import type { Metadata } from "next";
import { PlayerExplorer } from "@/components/PlayerExplorer";
import { OFFICIAL, VERIFIED_DATE } from "@/data/lions";

export const metadata: Metadata = {
  title: "선수단",
  description: "우리가 부르는 이름들. 삼성 라이온즈 선수 스포트라이트와 공식 선수단을 만나보세요.",
};

export default function PlayersPage() {
  return (
    <main id="main-content" className="subpage">
      <header className="page-intro">
        <div className="wrap fan-intro-layout">
          <div>
            <p className="eyebrow">THE PLAYERS · 선수단</p>
            <h1>우리가 부르는<br />이름들.</h1>
          </div>
          <p className="fan-intro-copy">등번호 하나에 담긴 수많은 순간.<br />그라운드를 푸르게 물들이는<br />라이온즈의 얼굴들을 만납니다.</p>
        </div>
      </header>

      <section className="wrap fan-section" aria-labelledby="player-spotlight-title">
        <div className="fan-section-header">
          <div>
            <p className="eyebrow">PLAYER SPOTLIGHT</p>
            <h2 id="player-spotlight-title" className="section-heading">지금, 이 이름에 주목.</h2>
          </div>
          <p>라이온즈를 만나는 네 개의 시작점.</p>
        </div>
        <PlayerExplorer />
        <p className="fan-source">선수 이름·등번호·포지션은 삼성 라이온즈 공식 선수단 기준 · 확인 {VERIFIED_DATE}</p>
      </section>

      <section className="fan-roster-banner" aria-labelledby="full-roster-title">
        <div className="wrap fan-roster-inner">
          <div>
            <p className="eyebrow">ONE TEAM. MANY HEROES.</p>
            <h2 id="full-roster-title">우리의 팀은 더 크니까.</h2>
            <p>스포트라이트에 담지 못한 모든 선수의 프로필과 기록은 공식 선수단에서 확인하세요.</p>
          </div>
          <div className="fan-links">
            <a href={OFFICIAL.pitchers} target="_blank" rel="noopener noreferrer" className="fan-light-link">공식 투수진 보기 <span aria-hidden="true">↗</span></a>
            <a href={OFFICIAL.batters} target="_blank" rel="noopener noreferrer" className="fan-light-link">공식 타자진 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
