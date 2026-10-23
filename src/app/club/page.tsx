import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OFFICIAL, VERIFIED_DATE } from "@/data/lions";

export const metadata: Metadata = {
  title: "구단 · 우리의 홈, 대구",
  description:
    "1982년부터 이어온 삼성 라이온즈의 이야기. 대구 삼성 라이온즈 파크와 첫 직관을 위한 공식 안내를 만나보세요.",
};

const visitGuides = [
  {
    step: "01",
    title: "경기를 고르고, 티켓 준비",
    description: "예매 일정과 입장 방법을 공식 안내에서 확인하세요.",
    link: "공식 예매 안내",
    href: OFFICIAL.tickets,
  },
  {
    step: "02",
    title: "나에게 맞는 자리 찾기",
    description: "좌석 배치와 요금을 살펴보고 오늘의 응원 자리를 정하세요.",
    link: "좌석·요금 안내",
    href: OFFICIAL.seats,
  },
  {
    step: "03",
    title: "라팍까지 가는 길 확인",
    description: "교통편과 구장 이용 정보를 확인하면 첫 방문도 한결 편해집니다.",
    link: "구장·교통 안내",
    href: OFFICIAL.stadium,
  },
] as const;

export default function ClubPage() {
  return (
    <main id="main-content" className="subpage">
      <section className="page-intro">
        <div className="wrap fan-club-intro">
          <div>
            <p className="eyebrow">OUR CLUB · OUR CITY</p>
            <h1>대구의 자부심.<br />우리의 라이온즈.</h1>
            <p>도시를 닮은 열정, 세대를 잇는 응원.<br />1982년부터 우리의 야구는 푸른색입니다.</p>
          </div>
          <p className="fan-club-era" aria-label="1982년부터">
            <span>SINCE</span>
            <strong>1982</strong>
          </p>
        </div>
      </section>

      <section className="wrap fan-section" aria-labelledby="stadium-title">
        <div className="fan-section-header">
          <div>
            <p className="eyebrow">HOME OF THE LIONS</p>
            <h2 id="stadium-title" className="section-heading">우리의 홈, 라팍.</h2>
          </div>
          <a className="text-link" href={OFFICIAL.stadium} target="_blank" rel="noopener noreferrer">
            공식 구장 안내 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className="fan-stadium">
          <div className="fan-stadium-image">
            <Image
              src="/images/lions/stadium.webp"
              alt="야간 조명 아래 대구 삼성 라이온즈 파크 그라운드에 나란히 선 삼성 라이온즈 선수단"
              fill
              sizes="(max-width: 767px) 100vw, 1200px"
            />
          </div>
          <figcaption className="fan-stadium-caption">
            <div>
              <span className="fan-store-kicker">OUR HOME, OUR TEAM</span>
              <h3>대구 삼성 라이온즈 파크</h3>
            </div>
            <address>대구광역시 수성구 야구전설로 1</address>
          </figcaption>
        </figure>

        <div className="fan-identity">
          <h3>같은 이름을 부르는 곳.<br />함께 다음 장면을 만드는 곳.</h3>
          <div>
            <p>처음 유니폼을 입은 날부터 익숙한 응원가를 다시 부르는 날까지. 라이온즈 파크에서 쌓이는 저마다의 순간이 우리의 야구가 됩니다.</p>
            <Link className="arrow-link" href="/history">라이온즈의 역사 만나기 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="fan-visit-section" aria-labelledby="visit-title">
        <div className="wrap fan-section">
          <div className="fan-section-header">
            <div>
              <p className="eyebrow">YOUR FIRST GAME DAY</p>
              <h2 id="visit-title" className="section-heading">처음이라면, 이 순서로.</h2>
            </div>
            <Link className="text-link" href="/community">직관 체크리스트 <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="fan-visit-grid">
            {visitGuides.map((guide) => (
              <a className="fan-visit-link" href={guide.href} key={guide.step} target="_blank" rel="noopener noreferrer">
                <span className="fan-step" aria-hidden="true">{guide.step}</span>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <span className="arrow-link">{guide.link} <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
          <p className="fan-source">구장 주소·이용 안내: 삼성 라이온즈 공식 홈페이지 · 확인 {VERIFIED_DATE}. 경기별 운영 안내는 방문 전 공식 사이트에서 확인해 주세요.</p>
        </div>
      </section>
    </main>
  );
}
