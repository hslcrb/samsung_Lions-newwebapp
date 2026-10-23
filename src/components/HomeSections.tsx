import Image from 'next/image';
import Link from 'next/link';
import { CHAMPIONS, OFFICIAL, PLAYERS, VERIFIED_DATE } from '@/data/lions';
import { FEATURED_MATCHES, matchDateLabel } from '@/data/schedule';
import { Icon } from './Icon';

export function MatchdaySection() {
  return (
    <section className="home-matchday" aria-labelledby="matchday-title">
      <div className="wrap">
        <div className="section-top"><div><p className="eyebrow">MARK YOUR CALENDAR</p><h2 id="matchday-title" className="section-heading">다음 함성을 준비하는 시간.</h2></div><Link className="text-link" href="/matches">경기일정 보기 <Icon name="arrow" /></Link></div>
        <div className="match-cards">{FEATURED_MATCHES.map((match, index) => <article className={`match-card${index === 0 ? ' match-card-featured' : ''}`} key={match.date}>
          <div className="match-card-top"><span className={`match-location ${match.home ? 'is-home' : ''}`}>{match.home ? 'HOME' : 'AWAY'}</span><time dateTime={`${match.date}T${match.time}:00+09:00`}>{matchDateLabel(match.date)} <strong>{match.time}</strong></time></div>
          <div className="match-teams"><div><Image src="/logo.svg" alt="삼성 라이온즈" width={88} height={64} /><span>삼성 라이온즈</span></div><span className="match-versus">VS</span><div><strong className="opponent-word">KIA</strong><span>{match.opponent}</span></div></div>
          <div className="match-card-bottom"><span><Icon name="pin" />{match.home ? '대구 삼성 라이온즈 파크' : '광주'}</span><a href={OFFICIAL.schedule} target="_blank" rel="noopener noreferrer" aria-label={`${matchDateLabel(match.date)} ${match.opponent} 공식 경기 안내`}><Icon name="external" /></a></div>
        </article>)}</div>
        <p className="match-source">10월 주요 경기 · 구단 공개 일정 {VERIFIED_DATE} 확인 · 일정은 변경될 수 있습니다. <a href={OFFICIAL.schedule} target="_blank" rel="noopener noreferrer">최신 공식 일정 ↗</a></p>
      </div>
    </section>
  );
}

export function PlayersSection() {
  return (
    <section className="home-players wrap" aria-labelledby="players-title">
      <div className="section-top"><div><p className="eyebrow">OUR PLAYERS, OUR PRIDE</p><h2 id="players-title" className="section-heading">우리가 부르는 이름들.</h2></div><Link href="/players" className="text-link">선수 만나기 <Icon name="arrow" /></Link></div>
      <div className="home-player-grid">{PLAYERS.map((player) => <a href={player.profileUrl} target="_blank" rel="noopener noreferrer" className="home-player-card" key={player.id} aria-label={`${player.name} 공식 프로필 새 창에서 보기`}><div className="home-player-image"><span className="home-player-number" aria-hidden="true">{String(player.number).padStart(2, '0')}</span><Image src={player.image} alt={`${player.position} ${player.name} 선수`} fill sizes="(max-width: 700px) 45vw, 24vw" /><span className="home-player-position">{player.position}</span><span className="home-player-arrow"><Icon name="external" /></span></div><div className="home-player-name"><h3>{player.name}</h3><span>NO. {String(player.number).padStart(2, '0')}</span></div><p lang="en">{player.englishName}</p></a>)}</div>
      <p className="home-player-caption">등번호 하나에 담긴 수많은 순간. 우리는 그 이름을 기억합니다.</p>
    </section>
  );
}

export function LegacySection() {
  return (
    <section className="home-legacy" aria-labelledby="legacy-title"><div className="wrap">
      <div className="legacy-intro"><div className="legacy-eight" aria-label="8회 우승">8<span>CHAMPIONSHIPS</span></div><div><p className="eyebrow">A LEGACY WRITTEN IN BLUE</p><h2 id="legacy-title">왕조는 기록으로.<br />자부심은 우리에게.</h2><p className="legacy-copy">수많은 가을을 푸르게 물들인 이름.<br />1985년의 첫 정상부터, 2011–2014 통합 4연패까지.</p></div><Link href="/history" className="legacy-link">푸른 역사 속으로 <Icon name="external" /></Link></div>
      <div className="legacy-years">{CHAMPIONS.map((champion) => <Link href={`/history#season-${champion.year}`} key={champion.year} className="legacy-year"><Image src={champion.emblem} alt={`${champion.year} ${champion.year === 1985 ? '전·후기 통합' : '한국시리즈'} 우승 엠블럼`} width={90} height={90} /><span>{champion.year}</span><small>{champion.title}</small></Link>)}</div>
      <p className="legacy-footnote">1985년 전·후기 통합우승 및 7회의 한국시리즈 우승</p>
    </div></section>
  );
}

export function ParkSection() {
  return (
    <section className="home-park wrap" aria-labelledby="park-title"><div className="park-photo"><Image src="/images/lions/stadium.webp" alt="라이온즈파크 전광판 앞에 함께 선 삼성 라이온즈 선수단" fill sizes="(max-width: 850px) 100vw, 55vw" /><span className="park-photo-label"><Icon name="pin" />DAEGU SAMSUNG LIONS PARK</span></div><div className="park-content"><p className="eyebrow">THERE’S NO PLACE LIKE HOME</p><h2 id="park-title">우리의 홈,<br /><span>라팍.</span></h2><p className="park-copy">처음 만난 옆자리와 하이파이브.<br />목이 쉬도록 함께 부른 그 이름.<br />야구보다 더 큰 하루가, 여기 있습니다.</p><div className="park-links"><a href={OFFICIAL.tickets} target="_blank" rel="noopener noreferrer"><span>01</span>티켓 예매 안내<Icon name="external" /></a><a href={OFFICIAL.seats} target="_blank" rel="noopener noreferrer"><span>02</span>내 응원 자리 찾기<Icon name="external" /></a><Link href="/club"><span>03</span>처음 가는 라팍 안내<Icon name="arrow" /></Link></div></div></section>
  );
}

export function StoriesSection() {
  return (
    <section className="home-stories" aria-labelledby="stories-title"><div className="wrap"><div className="section-top"><div><p className="eyebrow">BEYOND THE NINTH INNING</p><h2 id="stories-title" className="section-heading">경기가 끝나도, 라이온즈.</h2></div><Link href="/community" className="text-link">팬 라운지 <Icon name="arrow" /></Link></div><div className="stories-grid"><a className="story-card" href={OFFICIAL.youtube} target="_blank" rel="noopener noreferrer"><div className="story-photo"><Image src="/images/lions/story-team.webp" alt="그라운드에서 주먹을 맞대며 격려하는 삼성 라이온즈 선수들" fill sizes="(max-width: 700px) 100vw, 48vw" /><span className="story-play"><Icon name="play" /></span></div><div className="story-copy"><p className="eyebrow">LIONS TV</p><h3>우리가 사랑한 순간,<br />한 번 더 플레이.</h3><Icon name="external" /></div></a><a className="story-card" href={OFFICIAL.instagram} target="_blank" rel="noopener noreferrer"><div className="story-photo"><Image src="/images/lions/story-fans.webp" alt="관중석을 배경으로 세리머니하는 삼성 라이온즈 디아즈" fill sizes="(max-width: 700px) 100vw, 48vw" /><span className="story-social">@samsunglions_baseballclub</span></div><div className="story-copy"><p className="eyebrow">LIONS EVERY DAY</p><h3>그라운드의 열기를<br />내 일상으로.</h3><Icon name="external" /></div></a></div><div className="home-shop-banner"><div><p className="eyebrow">WEAR YOUR PRIDE</p><h3>나의 일상에도, 라이온즈 블루.</h3></div><Link href="/shop" className="button button-white">공식 스토어 만나기 <Icon name="external" /></Link></div></div></section>
  );
}
