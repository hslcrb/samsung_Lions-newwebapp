/** Official-source snapshot. See sessions/02/sources.md for provenance. */
export const VERIFIED_DATE = '2026.10.23';

export const OFFICIAL = {
  home: 'https://www.samsunglions.com/index.asp',
  schedule: 'https://www.samsunglions.com/score/score_index.asp',
  tickets: 'https://www.samsunglions.com/score/score_4_7.asp',
  seats: 'https://www.samsunglions.com/score/score_4_2_1.asp',
  stadium: 'https://www.samsunglions.com/intro/intro05_4.asp',
  history: 'https://www.samsunglions.com/intro/history_3_4.asp',
  news: 'https://www.samsunglions.com/intro/intro02.asp',
  roster: 'https://www.samsunglions.com/roster/roster_index.asp',
  pitchers: 'https://www.samsunglions.com/roster/roster_2_list.asp',
  batters: 'https://www.samsunglions.com/roster/roster_3_list.asp',
  youtube: 'https://www.youtube.com/channel/UCMWAku3a3h65QpLm63Jf2pw',
  instagram: 'https://www.instagram.com/samsunglions_baseballclub/',
  x: 'https://x.com/twittlions',
  naver: 'https://tv.naver.com/samsunglions?tab=home',
  authenticStore: 'https://www.samsunglionsauthentic.shop/',
  teamStore: 'https://shop.berriz.in/ko/lionsteamstore',
} as const;

export const NAVIGATION = [
  { label: '라이온즈', href: '/club', english: 'THE CLUB' },
  { label: '경기일정', href: '/matches', english: 'MATCH DAY' },
  { label: '선수단', href: '/players', english: 'OUR PLAYERS' },
  { label: '히스토리', href: '/history', english: 'THE LEGACY' },
  { label: '팬 라운지', href: '/community', english: 'FOR THE FANS' },
  { label: '라이온즈 숍', href: '/shop', english: 'LIONS SHOP' },
] as const;

export type Player = {
  id: string;
  name: string;
  englishName: string;
  number: number;
  position: string;
  category: 'pitcher' | 'catcher' | 'infielder' | 'outfielder';
  image: string;
  profileUrl: string;
  tagline: string;
};

export const PLAYERS: readonly Player[] = [
  { id: 'koo', name: '구자욱', englishName: 'KOO JA WOOK', number: 5, position: '외야수', category: 'outfielder', image: '/images/lions/player-koo.webp', profileUrl: 'https://www.samsunglions.com/roster/roster_2.asp?pcode=A0033', tagline: '그 이름을 부르면, 함성이 된다.' },
  { id: 'won', name: '원태인', englishName: 'WON TAE IN', number: 18, position: '투수', category: 'pitcher', image: '/images/lions/player-won.webp', profileUrl: 'https://www.samsunglions.com/roster/roster_2.asp?pcode=A0399', tagline: '마운드 위, 우리의 믿음.' },
  { id: 'kang', name: '강민호', englishName: 'KANG MIN HO', number: 47, position: '포수', category: 'catcher', image: '/images/lions/player-kang.webp', profileUrl: 'https://www.samsunglions.com/roster/roster_2.asp?pcode=A0354', tagline: '홈을 지키는 든든한 이름.' },
  { id: 'kim', name: '김지찬', englishName: 'KIM JI CHAN', number: 58, position: '외야수', category: 'outfielder', image: '/images/lions/player-kim.webp', profileUrl: 'https://www.samsunglions.com/roster/roster_2.asp?pcode=A0428', tagline: '다음 베이스를 향한 설렘.' },
];

export const CHAMPIONS = [
  { year: 1985, title: 'V1', description: '전·후기리그 통합우승. 푸른 역사의 첫 번째 정상.', emblem: '/emblem-of-win/1985.svg' },
  { year: 2002, title: 'V2', description: '기다림 끝에 들어 올린 첫 한국시리즈 우승 트로피.', emblem: '/emblem-of-win/2002.svg' },
  { year: 2005, title: 'V3', description: '다시 정상에 선 라이온즈. 새로운 황금기의 시작.', emblem: '/emblem-of-win/2005.svg' },
  { year: 2006, title: 'V4', description: '한국시리즈 2연패. 더 단단해진 우리의 이름.', emblem: '/emblem-of-win/2006.svg' },
  { year: 2011, title: 'V5', description: '정규시즌과 한국시리즈를 함께 제패한 왕조의 시작.', emblem: '/emblem-of-win/2011.svg' },
  { year: 2012, title: 'V6', description: '통합 2연패. 가을의 끝에서 또 한 번 웃다.', emblem: '/emblem-of-win/2012.svg' },
  { year: 2013, title: 'V7', description: '통합 3연패. 끝까지 믿은 팬들과 함께한 정상.', emblem: '/emblem-of-win/2013.svg' },
  { year: 2014, title: 'V8', description: '통합 4연패. 라이온즈라는 이름으로 완성한 왕조.', emblem: '/emblem-of-win/2014.svg' },
] as const;

export const RETIRED_NUMBERS = [
  { number: 22, name: '이만수', caption: '그라운드에 새긴 첫 전설' },
  { number: 10, name: '양준혁', caption: '언제나 전력으로, 언제나 삼성' },
  { number: 36, name: '이승엽', caption: '우리의 기억을 넘긴 홈런' },
  { number: 21, name: '오승환', caption: '마지막 아웃까지 지킨 이름' },
] as const;
