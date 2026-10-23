"use client";

import { useRef, useState } from "react";
import { OFFICIAL } from "@/data/lions";
import { calendarDays, FEATURED_MATCHES, MATCHES, matchDateLabel, SCHEDULE_SOURCE, SCHEDULE_VERIFIED_AT, type Match } from "@/data/schedule";

type MatchFilter = "all" | "home" | "away";
const FILTERS = [{ value: "all", label: "전체 경기" }, { value: "home", label: "홈 경기" }, { value: "away", label: "원정 경기" }] as const;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const [VERIFIED_YEAR, VERIFIED_MONTH] = SCHEDULE_VERIFIED_AT.split("-").map(Number);
const FIRST_MONTH = 2025 * 12;
const LAST_MONTH = 2027 * 12 + 11;
const DEFAULT_DATE = FEATURED_MATCHES[0]?.date ?? SCHEDULE_VERIFIED_AT;

function matchesFilter(match: Match, filter: MatchFilter) {
  return filter === "all" || (filter === "home" ? match.home : !match.home);
}

function monthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export function MatchCalendar() {
  const [month, setMonth] = useState({ year: VERIFIED_YEAR, month: VERIFIED_MONTH - 1 });
  const [filter, setFilter] = useState<MatchFilter>("all");
  const [selectedDate, setSelectedDate] = useState(DEFAULT_DATE);
  const selectedDetailsRef = useRef<HTMLElement>(null);
  const currentMonthKey = monthKey(month.year, month.month);
  const monthIndex = month.year * 12 + month.month;
  const filteredMatches = MATCHES.filter((match) => match.date.startsWith(currentMonthKey) && matchesFilter(match, filter));
  const matchByDate = new Map(filteredMatches.map((match) => [match.date, match]));
  const selectedMatch = matchByDate.get(selectedDate);
  const selectedUnfilteredMatch = MATCHES.find((match) => match.date === selectedDate);
  const days = calendarDays(month.year, month.month);
  const weeks = Array.from({ length: days.length / 7 }, (_, index) => days.slice(index * 7, index * 7 + 7));

  function changeMonth(direction: number) {
    const nextIndex = monthIndex + direction;
    if (nextIndex < FIRST_MONTH || nextIndex > LAST_MONTH) return;
    const next = { year: Math.floor(nextIndex / 12), month: nextIndex % 12 };
    const nextKey = monthKey(next.year, next.month);
    const firstMatch = MATCHES.find((match) => match.date.startsWith(nextKey) && matchesFilter(match, filter));
    setMonth(next);
    setSelectedDate(firstMatch?.date ?? `${nextKey}-01`);
  }

  function changeFilter(next: MatchFilter) {
    setFilter(next);
    if (selectedUnfilteredMatch && matchesFilter(selectedUnfilteredMatch, next)) return;
    const firstMatch = MATCHES.find((match) => match.date.startsWith(currentMonthKey) && matchesFilter(match, next));
    setSelectedDate(firstMatch?.date ?? `${currentMonthKey}-01`);
  }

  function showVerifiedMonth() {
    setMonth({ year: VERIFIED_YEAR, month: VERIFIED_MONTH - 1 });
    const candidates = MATCHES.filter((match) => match.date.startsWith(SCHEDULE_VERIFIED_AT.slice(0, 7)) && matchesFilter(match, filter));
    setSelectedDate(candidates.find((match) => match.date >= SCHEDULE_VERIFIED_AT)?.date ?? candidates[0]?.date ?? SCHEDULE_VERIFIED_AT);
  }

  function showMatchDetails(date: string) {
    setSelectedDate(date);
    requestAnimationFrame(() => {
      const panel = selectedDetailsRef.current;
      if (!panel) return;
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  }

  return (
    <div className="schedule-calendar">
      <div className="schedule-toolbar">
        <div className="schedule-month-controls">
          <button type="button" className="schedule-month-arrow" onClick={() => changeMonth(-1)} disabled={monthIndex === FIRST_MONTH} aria-label="이전 달 보기"><span aria-hidden="true">←</span></button>
          <h3 id="calendar-month" aria-live="polite" aria-atomic="true"><span>{month.year}</span><span className="schedule-month-divider">.</span>{String(month.month + 1).padStart(2, "0")}<span className="sr-only">월</span></h3>
          <button type="button" className="schedule-month-arrow" onClick={() => changeMonth(1)} disabled={monthIndex === LAST_MONTH} aria-label="다음 달 보기"><span aria-hidden="true">→</span></button>
          <button type="button" className="schedule-reset" onClick={showVerifiedMonth}>확인한 달</button>
        </div>
        <div className="schedule-filters" role="group" aria-label="홈·원정 경기 필터">
          {FILTERS.map((option) => <button key={option.value} type="button" aria-pressed={filter === option.value} aria-controls="schedule-table monthly-matches" onClick={() => changeFilter(option.value)}>{option.label}</button>)}
        </div>
      </div>

      <div className="schedule-legend"><p>날짜를 선택하면 아래에서 경기 내용을 볼 수 있습니다.</p><span><i className="schedule-dot schedule-dot-home" aria-hidden="true" />홈</span><span><i className="schedule-dot schedule-dot-away" aria-hidden="true" />원정</span></div>
      <table id="schedule-table" className="schedule-table" aria-labelledby="calendar-month">
        <caption className="sr-only">{month.year}년 {month.month + 1}월 삼성 라이온즈 {FILTERS.find((option) => option.value === filter)?.label} 일정. 확인된 경기만 표시합니다.</caption>
        <thead><tr>{WEEKDAYS.map((weekday, index) => <th key={weekday} scope="col" className={index === 0 ? "schedule-sunday" : index === 6 ? "schedule-saturday" : undefined}><abbr title={`${weekday}요일`}>{weekday}</abbr></th>)}</tr></thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                if (day === null) return <td key={dayIndex} className="schedule-outside" aria-hidden="true" />;
                const date = `${currentMonthKey}-${String(day).padStart(2, "0")}`;
                const match = matchByDate.get(date);
                return (
                  <td key={dayIndex} className={dayIndex === 0 ? "schedule-sunday" : dayIndex === 6 ? "schedule-saturday" : undefined}>
                    <button type="button" className={match ? "schedule-day schedule-day-match" : "schedule-day"} aria-pressed={selectedDate === date} aria-controls="selected-match" aria-label={`${month.year}년 ${month.month + 1}월 ${day}일 ${WEEKDAYS[dayIndex]}요일, ${match ? `${match.home ? "홈" : "원정"} ${match.opponent}, ${match.time}, ${match.venue}` : "현재 조건으로 확인된 경기 기록 없음"}`} onClick={() => setSelectedDate(date)}>
                      <span className="schedule-day-number">{day}</span>
                      {match && <span className="schedule-day-content"><span className="schedule-day-opponent">{match.opponent}</span><span className="schedule-day-time">{match.time}</span><span className={match.home ? "schedule-day-badge schedule-day-badge-home" : "schedule-day-badge schedule-day-badge-away"}><i className={match.home ? "schedule-dot schedule-dot-home" : "schedule-dot schedule-dot-away"} aria-hidden="true" /><span>{match.home ? "HOME" : "AWAY"}</span></span></span>}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <section ref={selectedDetailsRef} id="selected-match" className="schedule-selected" tabIndex={-1} aria-labelledby="selected-match-title" aria-live="polite" aria-atomic="true">
        <div className="schedule-selected-date"><p className="eyebrow">SELECTED DAY</p><h3 id="selected-match-title">{matchDateLabel(selectedDate)}</h3><span>{selectedDate.slice(0, 4)} SEASON</span></div>
        {selectedMatch ? (
          <>
            <div className="schedule-selected-game"><p className="schedule-selected-tags"><span>{selectedMatch.home ? "홈 경기" : "원정 경기"}</span>{selectedMatch.postseason && <span>포스트시즌</span>}</p><h4>삼성 라이온즈 <span>VS</span> {selectedMatch.opponent}</h4><p className="schedule-selected-time"><time dateTime={`${selectedMatch.date}T${selectedMatch.time}:00+09:00`}>{selectedMatch.time}</time><span>{selectedMatch.venue}</span><span>한국 시간 기준</span></p></div>
            <a href={selectedMatch.home ? OFFICIAL.tickets : SCHEDULE_SOURCE} target="_blank" rel="noopener noreferrer" className="button button-blue">{selectedMatch.home ? "공식 예매 안내" : "공식 일정 확인"}<span aria-hidden="true">↗</span></a>
          </>
        ) : (
          <div className="schedule-selected-empty"><h4>{selectedUnfilteredMatch ? "선택한 필터에 해당하는 경기 기록이 없습니다." : "확인한 일정에 기록된 경기가 없습니다."}</h4><p>{selectedUnfilteredMatch ? "전체 경기 필터에서 이 날짜의 경기 내용을 확인하세요." : "경기 미편성을 뜻하지 않습니다. 최신 일정은 공식 홈페이지에서 확인하세요."}</p>{selectedUnfilteredMatch ? <button type="button" className="text-link" onClick={() => setFilter("all")}>전체 경기로 보기 <span aria-hidden="true">→</span></button> : <a href={SCHEDULE_SOURCE} target="_blank" rel="noopener noreferrer" className="text-link">공식 일정 확인 <span aria-hidden="true">↗</span></a>}</div>
        )}
      </section>

      <section id="monthly-matches" className="schedule-month-list" aria-labelledby="monthly-matches-title">
        <div className="schedule-list-header"><div><p className="eyebrow">THIS MONTH’S GAMES</p><h3 id="monthly-matches-title">{month.month + 1}월, 확인한 경기</h3></div><p role="status" aria-live="polite" aria-atomic="true">{FILTERS.find((option) => option.value === filter)?.label} <strong>{filteredMatches.length}</strong>건</p></div>
        {filteredMatches.length ? (
          <ul>
            {filteredMatches.map((match) => <li key={match.date}><button type="button" className="schedule-list-game" aria-pressed={selectedDate === match.date} aria-controls="selected-match" aria-label={`${matchDateLabel(match.date)}, ${match.home ? "홈" : "원정"} ${match.opponent}, ${match.time}, ${match.venue}, 경기 내용 보기`} onClick={() => showMatchDetails(match.date)}><span className="schedule-list-date">{matchDateLabel(match.date)}</span><span className={match.home ? "schedule-list-badge schedule-list-badge-home" : "schedule-list-badge"}>{match.home ? "홈" : "원정"}</span><span className="schedule-list-opponent">{match.opponent}{match.postseason && <small>포스트시즌</small>}</span><span className="schedule-list-time">{match.time}</span><span className="schedule-list-venue">{match.venue}</span><span className="schedule-list-arrow" aria-hidden="true">↗</span></button></li>)}
          </ul>
        ) : (
          <div className="schedule-month-empty"><p>이 달의 선택한 조건에 해당하는 경기 기록이 없습니다.</p><span>이 페이지는 {SCHEDULE_VERIFIED_AT.replaceAll("-", ".")}에 확인한 일정만 담고 있습니다.</span><a href={SCHEDULE_SOURCE} target="_blank" rel="noopener noreferrer" className="text-link">최신 공식 일정 확인 <span aria-hidden="true">↗</span></a></div>
        )}
      </section>
    </div>
  );
}
