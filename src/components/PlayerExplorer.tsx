"use client";

import Image from "next/image";
import { useState } from "react";
import { OFFICIAL, PLAYERS } from "@/data/lions";

const FILTERS = [
  { value: "all", label: "전체" },
  { value: "pitcher", label: "투수" },
  { value: "catcher", label: "포수" },
  { value: "infielder", label: "내야수" },
  { value: "outfielder", label: "외야수" },
] as const;

type PositionFilter = (typeof FILTERS)[number]["value"];

export function PlayerExplorer() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<PositionFilter>("all");
  const normalizedQuery = query.trim().replace(/^#/, "").replace(/\s/g, "").toLowerCase();
  const visiblePlayers = PLAYERS.filter((player) => {
    const matchesPosition = position === "all" || position === player.category;
    const searchText = `${player.name}${player.englishName}${player.number}`.replace(/\s/g, "").toLowerCase();
    return matchesPosition && searchText.includes(normalizedQuery);
  });

  function resetFilters() {
    setQuery("");
    setPosition("all");
  }

  return (
    <div className="fan-player-explorer">
      <div className="fan-player-controls">
        <div className="fan-position-filters" role="group" aria-label="포지션으로 선수 찾기">
          {FILTERS.map((filter) => (
            <button key={filter.value} type="button" aria-pressed={position === filter.value} aria-controls="player-results" onClick={() => setPosition(filter.value)}>
              {filter.label}
            </button>
          ))}
        </div>
        <div className="fan-player-search">
          <label htmlFor="player-search">이름 또는 등번호로 검색</label>
          <div className="fan-search-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
            <input id="player-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="선수 이름, 등번호" autoComplete="off" aria-controls="player-results" />
          </div>
        </div>
      </div>
      <p className="fan-results-count" role="status" aria-live="polite" aria-atomic="true">스포트라이트 <strong>{visiblePlayers.length}</strong>명 <span>/ 전체 선수단은 공식 홈페이지에서 확인하세요.</span></p>

      <div id="player-results">
        {visiblePlayers.length ? (
          <ul className="fan-player-grid">
            {visiblePlayers.map((player) => (
              <li key={player.id}>
                <a className="fan-player-card" href={player.profileUrl} target="_blank" rel="noopener noreferrer" aria-label={`${player.name} ${player.number}번 ${player.position} 공식 프로필 새 창에서 보기`}>
                  <div className="fan-player-image">
                    <span className="fan-player-watermark" aria-hidden="true">{String(player.number).padStart(2, "0")}</span>
                    <Image src={player.image} alt={`${player.name} 선수`} fill sizes="(max-width: 600px) 88vw, (max-width: 1000px) 44vw, 24vw" />
                    <span className="fan-player-position">{player.position}</span>
                  </div>
                  <div className="fan-player-info">
                    <div className="fan-player-name"><h3>{player.name}</h3><span className="fan-player-number">{String(player.number).padStart(2, "0")}</span></div>
                    <p className="fan-player-english" lang="en">{player.englishName}</p>
                    <p className="fan-player-tagline">{player.tagline}</p>
                    <span className="fan-player-profile">공식 프로필 <span aria-hidden="true">↗</span></span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="fan-empty-state">
            <span className="fan-empty-label" lang="en">NEXT AT BAT</span>
            <h3>찾으시는 선수가 보이지 않나요?</h3>
            <p>선택한 조건에 맞는 스포트라이트 선수가 없습니다.<br />검색 조건을 바꾸거나 공식 전체 선수단에서 찾아보세요.</p>
            <div className="fan-empty-actions">
              <button type="button" className="button button-blue" onClick={resetFilters}>검색 조건 초기화</button>
              <a href={OFFICIAL.roster} target="_blank" rel="noopener noreferrer" className="text-link">공식 전체 선수단 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
