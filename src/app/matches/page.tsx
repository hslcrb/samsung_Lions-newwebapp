import type { Metadata } from "next";
import { MatchCalendar } from "@/components/MatchCalendar";
import { OFFICIAL } from "@/data/lions";
import { SCHEDULE_SOURCE, SCHEDULE_VERIFIED_AT } from "@/data/schedule";

export const metadata: Metadata = {
  title: "경기 일정",
  description: "삼성 라이온즈 경기 일정을 달력으로 살펴보고, 홈·원정 경기와 공식 예매 안내를 확인하세요.",
};

export default function MatchesPage() {
  return (
    <main id="main-content" className="subpage">
      <header className="page-intro">
        <div className="wrap matches-intro">
          <div><p className="eyebrow">MATCH DAY · 경기 일정</p><h1>함께 채울,<br />다음 이닝.</h1></div>
          <div className="matches-intro-copy"><p>우리의 다음 함성은<br />여기서 시작됩니다.</p><a href={OFFICIAL.tickets} target="_blank" rel="noopener noreferrer" className="text-link">공식 예매 안내 <span aria-hidden="true">↗</span></a></div>
        </div>
      </header>

      <section className="wrap matches-section" aria-labelledby="schedule-title">
        <div className="section-top"><div><p className="eyebrow">PLAN YOUR GAME DAY</p><h2 id="schedule-title" className="section-heading">우리, 언제 만날까요?</h2></div></div>
        <div className="matches-snapshot">
          <span>공식 일정 스냅샷</span>
          <p><time dateTime={SCHEDULE_VERIFIED_AT}>{SCHEDULE_VERIFIED_AT.replaceAll("-", ".")}</time> 확인 · 경기 시간과 장소는 변경될 수 있습니다. 방문 전 공식 일정을 확인하세요.</p>
          <a href={SCHEDULE_SOURCE} target="_blank" rel="noopener noreferrer">공식 일정 <span aria-hidden="true">↗</span></a>
        </div>
        <MatchCalendar />
      </section>

      <section className="matches-guide" aria-labelledby="match-guide-title">
        <div className="wrap matches-guide-inner">
          <div><p className="eyebrow">SEE YOU AT THE PARK</p><h2 id="match-guide-title">일정을 골랐다면,<br />이제 라팍으로.</h2></div>
          <div className="matches-guide-links"><a href={OFFICIAL.seats} target="_blank" rel="noopener noreferrer">좌석·요금 살펴보기 <span aria-hidden="true">↗</span></a><a href={OFFICIAL.stadium} target="_blank" rel="noopener noreferrer">구장·교통 안내 <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
  );
}
