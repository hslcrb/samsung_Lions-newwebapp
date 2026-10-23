import type { Metadata } from "next";
import { FanChecklist } from "@/components/FanChecklist";
import { OFFICIAL } from "@/data/lions";

export const metadata: Metadata = {
  title: "팬 커뮤니티",
  description: "경기가 끝나도 라이온즈는 계속됩니다. 공식 라이온즈TV와 소셜 채널, 나만의 직관 준비 체크리스트를 만나보세요.",
};

const CHANNELS = [
  { name: "Instagram", label: "사진으로 이어지는 푸른 순간", handle: "@samsunglions_baseballclub", href: OFFICIAL.instagram, short: "IG" },
  { name: "X", label: "라이온즈 소식을 빠르게", handle: "@twittlions", href: OFFICIAL.x, short: "X" },
  { name: "네이버TV", label: "라이온즈의 장면을 다시 만나기", handle: "삼성라이온즈", href: OFFICIAL.naver, short: "N" },
];

export default function CommunityPage() {
  return (
    <main id="main-content" className="subpage">
      <header className="page-intro">
        <div className="wrap fan-intro-layout">
          <div><p className="eyebrow">WITH THE FANS · 팬 커뮤니티</p><h1>경기가 끝나도,<br />라이온즈는 계속된다.</h1></div>
          <p className="fan-intro-copy">다시 보고 싶은 순간부터<br />다음 직관을 기다리는 마음까지.<br />우리의 야구는 매일 이어집니다.</p>
        </div>
      </header>

      <section className="wrap fan-section" aria-labelledby="official-channels-title">
        <div className="fan-section-header">
          <div><p className="eyebrow">STAY CONNECTED</p><h2 id="official-channels-title" className="section-heading">그라운드 밖에서도, 함께.</h2></div>
          <p>삼성 라이온즈 공식 채널로 연결됩니다.</p>
        </div>
        <div className="fan-community-channels">
          <a href={OFFICIAL.youtube} target="_blank" rel="noopener noreferrer" className="fan-lions-tv" aria-label="라이온즈TV 공식 유튜브 채널 새 창에서 보기">
            <div className="fan-tv-top"><span>OFFICIAL YOUTUBE</span><span aria-hidden="true">↗</span></div>
            <div className="fan-tv-title" aria-hidden="true">LIONS<span>TV<svg width="66" height="66" viewBox="0 0 66 66" fill="none"><circle cx="33" cy="33" r="31.5" stroke="currentColor" /><path d="m27 21 19 12-19 12V21Z" fill="currentColor" /></svg></span></div>
            <div className="fan-tv-bottom"><div><h3>라이온즈TV</h3><p>라이온즈의 또 다른 이야기를 만나보세요.</p></div><span>채널 보기 <span aria-hidden="true">↗</span></span></div>
          </a>
          <ul className="fan-social-list">
            {CHANNELS.map((channel) => (
              <li key={channel.name}>
                <a href={channel.href} target="_blank" rel="noopener noreferrer" aria-label={`${channel.name} 삼성 라이온즈 공식 채널 새 창에서 보기`}>
                  <span className="fan-channel-monogram" aria-hidden="true">{channel.short}</span>
                  <div><h3>{channel.name}</h3><p>{channel.label}</p><span className="fan-channel-handle">{channel.handle}</span></div>
                  <span className="fan-channel-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="checklist" className="fan-checklist-section" aria-labelledby="checklist-title">
        <div className="wrap fan-checklist-layout">
          <div className="fan-checklist-intro">
            <p className="eyebrow">YOUR NEXT GAME DAY</p>
            <h2 id="checklist-title">직관 준비,<br />마음은 이미 라팍.</h2>
            <p>함성은 크게, 준비는 가볍게.<br />나만의 체크리스트로 경기일을 준비하세요.</p>
            <a href={OFFICIAL.stadium} target="_blank" rel="noopener noreferrer" className="text-link">구장 이용·반입 안내 확인 <span aria-hidden="true">↗</span></a>
            <p className="fan-checklist-word" aria-hidden="true">LET’S<br />GO, LIONS.</p>
          </div>
          <FanChecklist />
        </div>
      </section>

      <section className="wrap fan-section fan-faq-section" aria-labelledby="fan-faq-title">
        <div><p className="eyebrow">BEFORE YOU GO</p><h2 id="fan-faq-title" className="section-heading">직관 전, 궁금한 것들.</h2></div>
        <div className="fan-faq-list">
          <details><summary>경기 일정과 예매는 어디에서 확인하나요?<span aria-hidden="true">+</span></summary><p>경기 일정은 구단 공식 경기 일정에서 확인할 수 있습니다. 예매 일정과 이용 방법은 공식 예매 안내를 확인하세요. 일정은 변경될 수 있으니 출발 전 한 번 더 확인해 주세요.</p><div className="fan-faq-links"><a href={OFFICIAL.schedule} target="_blank" rel="noopener noreferrer" className="text-link">공식 경기 일정 ↗</a><a href={OFFICIAL.tickets} target="_blank" rel="noopener noreferrer" className="text-link">공식 예매 안내 ↗</a></div></details>
          <details><summary>좌석과 구장 이용 규정은 어디서 보나요?<span aria-hidden="true">+</span></summary><p>공식 좌석 안내에서 좌석 배치를 살펴보고, 구장 이용 안내에서 방문·반입 관련 규정을 확인하세요. 현장 운영 사항은 구단의 최신 안내를 따라 주세요.</p><div className="fan-faq-links"><a href={OFFICIAL.seats} target="_blank" rel="noopener noreferrer" className="text-link">좌석 안내 ↗</a><a href={OFFICIAL.stadium} target="_blank" rel="noopener noreferrer" className="text-link">구장 이용 안내 ↗</a></div></details>
          <details><summary>체크리스트는 다음에 와도 남아 있나요?<span aria-hidden="true">+</span></summary><p>같은 브라우저에서 다시 방문하면 체크한 내용을 불러옵니다. 브라우저 저장 공간을 지우거나 다른 기기로 접속하면 이어지지 않습니다. 저장이 제한된 환경에서는 현재 방문 중에만 유지됩니다. 다음 경기에는 ‘다시 준비하기’를 눌러 초기화하세요.</p></details>
        </div>
      </section>
    </main>
  );
}
