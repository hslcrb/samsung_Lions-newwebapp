import type { Metadata } from "next";
import Image from "next/image";
import { CHAMPIONS, OFFICIAL, RETIRED_NUMBERS, VERIFIED_DATE } from "@/data/lions";

export const metadata: Metadata = {
  title: "라이온즈의 역사",
  description: "여덟 번의 우승, 2011–2014 통합 4연패, 그리고 네 개의 영구결번. 삼성 라이온즈의 푸른 역사를 만나보세요.",
};

export default function HistoryPage() {
  return (
    <main id="main-content" className="subpage">
      <header className="page-intro">
        <div className="wrap fan-intro-layout">
          <div>
            <p className="eyebrow">OUR LEGACY · 역사</p>
            <h1>우리가 쌓아 올린<br />푸른 역사.</h1>
          </div>
          <div className="fan-history-score"><strong>08</strong><span>CHAMPIONSHIPS<br />라이온즈의 여덟 번의 우승</span></div>
        </div>
      </header>

      <section className="wrap fan-section" aria-labelledby="championships-title">
        <div className="fan-section-header">
          <div><p className="eyebrow">THE WINNING YEARS</p><h2 id="championships-title" className="section-heading">기억은, 빛이 된다.</h2></div>
          <p>각 우승 연도를 눌러 그해의 이야기를 확인하세요.</p>
        </div>
        <ol className="fan-championship-grid">
          {CHAMPIONS.map((champion) => (
            <li key={champion.year} id={`season-${champion.year}`}>
              <details className="fan-championship">
                <summary>
                  <Image src={champion.emblem} width={180} height={140} alt={`${champion.year}년 삼성 라이온즈 우승 엠블럼`} className="fan-championship-emblem" />
                  <span className="fan-championship-year">{champion.year}</span>
                  <span className="fan-championship-title">{champion.title}</span>
                  <span className="fan-expand-mark" aria-hidden="true">+</span>
                </summary>
                <p>{champion.description}</p>
              </details>
            </li>
          ))}
        </ol>
        <p className="fan-source">1985년은 전·후기 통합우승입니다. 우승 기록은 삼성 라이온즈 공식 역사관을 기준으로 정리했습니다.</p>
      </section>

      <section className="fan-dynasty" aria-labelledby="dynasty-title">
        <div className="wrap fan-dynasty-inner">
          <p className="fan-dynasty-years" aria-label="2011년부터 2014년까지">2011<span>—</span>2014</p>
          <div>
            <p className="eyebrow">FOUR YEARS. ONE DYNASTY.</p>
            <h2 id="dynasty-title">왕조, 네 번의 가을.</h2>
            <p>2011년부터 2014년까지, 정규시즌과 한국시리즈를 모두 제패한 4년 연속 통합우승. 같은 계절, 같은 이름으로 쌓아 올린 라이온즈의 역사입니다.</p>
            <a href={OFFICIAL.history} target="_blank" rel="noopener noreferrer" className="fan-light-link">공식 역사관에서 더 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="wrap fan-section" aria-labelledby="retired-numbers-title">
        <div className="fan-section-header">
          <div><p className="eyebrow">FOREVER LIONS</p><h2 id="retired-numbers-title" className="section-heading">이름은 역사에.<br />번호는 우리의 가슴에.</h2></div>
          <p>영원히 함께할 네 개의 등번호.</p>
        </div>
        <ul className="fan-retired-grid">
          {RETIRED_NUMBERS.map((player) => (
            <li key={player.number}>
              <span className="fan-retired-number">{player.number}</span>
              <h3>{player.name}</h3>
              <p>{player.caption}</p>
              <span className="fan-retired-label">RETIRED NUMBER</span>
            </li>
          ))}
        </ul>
        <div className="fan-history-sources">
          <p className="fan-source">2025년 지정된 오승환의 21번을 포함합니다. · 확인 {VERIFIED_DATE}</p>
          <a className="text-link" href="https://www.samsunglions.com/intro/intro02.asp?act=view&idx=1017064" target="_blank" rel="noopener noreferrer">오승환 영구결번 공식 발표 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </main>
  );
}
