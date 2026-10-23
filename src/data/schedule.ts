export type Match = {
  date: string;
  time: string;
  opponent: string;
  venue: string;
  home: boolean;
  postseason?: boolean;
};

export const SCHEDULE_VERIFIED_AT = '2026-10-23';
export const SCHEDULE_SOURCE = 'https://www.samsunglions.com/score/score_index.asp';

/** October 2026, transcribed from the official schedule on the date above.
 * No scores, final statuses, or live feed are implied by this snapshot. */
export const MATCHES: readonly Match[] = [
  { date: '2026-10-01', time: '18:30', opponent: '한화 이글스', venue: '대구', home: true },
  { date: '2026-10-03', time: '14:00', opponent: '두산 베어스', venue: '대구', home: true },
  { date: '2026-10-04', time: '14:00', opponent: '두산 베어스', venue: '대구', home: true },
  { date: '2026-10-05', time: '14:00', opponent: '두산 베어스', venue: '대구', home: true },
  { date: '2026-10-06', time: '18:30', opponent: 'KIA 타이거즈', venue: '광주', home: false },
  { date: '2026-10-07', time: '18:30', opponent: 'kt wiz', venue: '수원', home: false },
  { date: '2026-10-09', time: '14:00', opponent: 'SSG 랜더스', venue: '문학', home: false },
  { date: '2026-10-11', time: '14:00', opponent: 'kt wiz', venue: '대구', home: true },
  { date: '2026-10-12', time: '18:30', opponent: 'kt wiz', venue: '대구', home: true },
  { date: '2026-10-25', time: '14:00', opponent: 'KIA 타이거즈', venue: '대구', home: true, postseason: true },
  { date: '2026-10-26', time: '18:30', opponent: 'KIA 타이거즈', venue: '대구', home: true, postseason: true },
  { date: '2026-10-28', time: '18:30', opponent: 'KIA 타이거즈', venue: '광주', home: false, postseason: true },
  { date: '2026-10-29', time: '18:30', opponent: 'KIA 타이거즈', venue: '광주', home: false, postseason: true },
  { date: '2026-10-31', time: '14:00', opponent: 'KIA 타이거즈', venue: '대구', home: true, postseason: true },
];

export const FEATURED_MATCHES = MATCHES.filter((match) => match.date >= SCHEDULE_VERIFIED_AT).slice(0, 3);

export function matchDateLabel(date: string) {
  return new Intl.DateTimeFormat('ko-KR', { month: 'numeric', day: 'numeric', weekday: 'short', timeZone: 'Asia/Seoul' }).format(new Date(`${date}T12:00:00+09:00`));
}

export function calendarDays(year: number, month: number): (number | null)[] {
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return cells;
}
