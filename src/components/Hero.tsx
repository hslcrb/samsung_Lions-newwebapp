import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { OFFICIAL } from '@/data/lions';

export function Hero() {
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-photo">
          <Image
            src="/images/lions/hero-stadium.webp"
            alt="관중석 앞에서 하이파이브하며 기쁨을 나누는 삼성 라이온즈 선수들"
            fill
            sizes="(max-width: 700px) 100vw, 75vw"
            preload
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="wrap hero-inner">
          <div className="hero-kicker">
            <span className="hero-dot" aria-hidden="true" />
            SAMSUNG LIONS · EST. 1982
          </div>

          <h1 id="home-title" className="hero-title" lang="en">
            <span>BLUE IS</span>
            <span>
              OUR HOME<span className="hero-period">.</span>
            </span>
          </h1>

          <div className="hero-bottom">
            <div>
              <h2>우리의 봄, 여름, 가을은 파랗다.</h2>
              <p>같은 이름을 부르는 우리. 오늘도, 최강삼성.</p>
              <div className="hero-actions">
                <Link href="/matches" className="button button-white">
                  우리의 다음 경기
                  <Icon name="arrow" />
                </Link>
                <a
                  href={OFFICIAL.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-video"
                  aria-label="라이온즈TV (새 창)"
                >
                  <span><Icon name="play" /></span>
                  라이온즈TV
                </a>
              </div>
            </div>

            <div className="hero-stamp">
              <span>2026 SEASON</span>
              <strong>WIN<br />OR WOW.</strong>
              <span>대구, 우리의 홈.</span>
            </div>
          </div>

          <div className="hero-scroll">
            <span>SCROLL TO THE BLUE</span>
            <Icon name="down" />
          </div>
        </div>
      </section>

      <div className="blue-ribbon" aria-label="삼성 라이온즈, 대구, 1982년부터">
        <div>
          <span>PRIDE OF DAEGU</span>
          <span aria-hidden="true">✦</span>
          <span>WE ARE LIONS</span>
          <span aria-hidden="true">✦</span>
          <span>BLUE BLOOD, ONE LOVE</span>
          <span aria-hidden="true">✦</span>
          <span>SINCE 1982</span>
          <span aria-hidden="true">✦</span>
        </div>
      </div>
    </>
  );
}
