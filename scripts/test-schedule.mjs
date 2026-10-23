import assert from "node:assert/strict";
import test from "node:test";
import {
  MATCHES,
  FEATURED_MATCHES,
  SCHEDULE_VERIFIED_AT,
  SCHEDULE_SOURCE,
  calendarDays,
  matchDateLabel,
} from "../src/data/schedule.ts";

// Known month boundaries catch misplaced weekdays, lost dates and extra weeks.
// Weeks begin on Sunday, matching the visible schedule calendar.
const monthCases = [
  {
    name: "February 2024 includes leap day on Thursday",
    year: 2024, month: 1, days: 29, cells: 35,
    firstWeek: [null, null, null, null, 1, 2, 3],
    lastWeek: [25, 26, 27, 28, 29, null, null],
  },
  {
    name: "February 2026 occupies exactly four complete weeks",
    year: 2026, month: 1, days: 28, cells: 28,
    firstWeek: [1, 2, 3, 4, 5, 6, 7],
    lastWeek: [22, 23, 24, 25, 26, 27, 28],
  },
  {
    name: "February 1900 is not a leap month",
    year: 1900, month: 1, days: 28, cells: 35,
    firstWeek: [null, null, null, null, 1, 2, 3],
    lastWeek: [25, 26, 27, 28, null, null, null],
  },
  {
    name: "February 2000 is a leap month",
    year: 2000, month: 1, days: 29, cells: 35,
    firstWeek: [null, null, 1, 2, 3, 4, 5],
    lastWeek: [27, 28, 29, null, null, null, null],
  },
  {
    name: "October 2026 ends on Saturday without a trailing empty week",
    year: 2026, month: 9, days: 31, cells: 35,
    firstWeek: [null, null, null, null, 1, 2, 3],
    lastWeek: [25, 26, 27, 28, 29, 30, 31],
  },
  {
    name: "December 2026 ends on Thursday",
    year: 2026, month: 11, days: 31, cells: 35,
    firstWeek: [null, null, 1, 2, 3, 4, 5],
    lastWeek: [27, 28, 29, 30, 31, null, null],
  },
  {
    name: "January 2027 starts on Friday and needs six calendar rows",
    year: 2027, month: 0, days: 31, cells: 42,
    firstWeek: [null, null, null, null, null, 1, 2],
    lastWeek: [31, null, null, null, null, null, null],
  },
];

for (const fixture of monthCases) {
  test(fixture.name, () => {
    const cells = calendarDays(fixture.year, fixture.month);
    assert.equal(cells.length, fixture.cells);
    assert.deepEqual(cells.slice(0, 7), fixture.firstWeek);
    assert.deepEqual(cells.slice(-7), fixture.lastWeek);

    const firstDayIndex = cells.indexOf(1);
    const lastDayIndex = cells.indexOf(fixture.days);
    assert.equal(lastDayIndex - firstDayIndex + 1, fixture.days);
    assert.ok(cells.slice(0, firstDayIndex).every((cell) => cell === null));
    assert.ok(cells.slice(lastDayIndex + 1).every((cell) => cell === null));
    for (let index = firstDayIndex; index <= lastDayIndex; index += 1) {
      assert.equal(cells[index], index - firstDayIndex + 1, "Dates must stay contiguous between padding cells");
    }
  });
}

test("December to January preserves consecutive weekday alignment", () => {
  const december = calendarDays(2026, 11);
  const january = calendarDays(2027, 0);
  assert.equal(december.indexOf(31) % 7, 4, "December 31 is Thursday");
  assert.equal(january.indexOf(1) % 7, 5, "January 1 is Friday");
  assert.deepEqual(calendarDays(2026, 12), january, "Forward month navigation must carry into the next year");
  assert.deepEqual(calendarDays(2027, -1), december, "Backward month navigation must carry into the previous year");
});

function assertIsoDate(value, label) {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/, `${label} must use YYYY-MM-DD`);
  const parsed = new Date(`${value}T00:00:00Z`);
  assert.ok(Number.isFinite(parsed.valueOf()), `${label} must be a real date`);
  assert.equal(parsed.toISOString().slice(0, 10), value, `${label} must not overflow its month`);
}

test("published schedule is a dated, attributable snapshot with valid fixture fields", () => {
  assertIsoDate(SCHEDULE_VERIFIED_AT, "Verification date");
  const source = new URL(SCHEDULE_SOURCE);
  assert.equal(source.protocol, "https:");
  assert.equal(source.hostname, "www.samsunglions.com");
  assert.equal(source.pathname, "/score/score_index.asp");
  assert.ok(MATCHES.length > 0, "The published calendar must contain fixtures");

  for (const match of MATCHES) {
    assertIsoDate(match.date, "Match date");
    assert.match(match.time, /^(?:[01]\d|2[0-3]):[0-5]\d$/, `${match.date}: valid 24-hour start time`);
    assert.equal(typeof match.home, "boolean", `${match.date}: explicit home/away flag`);
    assert.equal(typeof match.opponent, "string");
    assert.ok(match.opponent.trim().length > 0);
    assert.equal(typeof match.venue, "string");
    assert.ok(match.venue.trim().length > 0);
    if (match.postseason !== undefined) assert.equal(typeof match.postseason, "boolean");
  }
});

test("the snapshot has one fixture per date in chronological order", () => {
  const dates = MATCHES.map((match) => match.date);
  assert.equal(new Set(dates).size, dates.length, "Duplicate dates would hide a fixture in the calendar");
  for (let index = 1; index < dates.length; index += 1) {
    assert.ok(dates[index - 1] < dates[index], `${dates[index]} must follow ${dates[index - 1]}`);
  }
});

test("known home and away fixtures retain their opponent, venue and start time", () => {
  const expected = [
    { date: "2026-10-01", time: "18:30", opponent: "한화 이글스", venue: "대구", home: true },
    { date: "2026-10-06", time: "18:30", opponent: "KIA 타이거즈", venue: "광주", home: false },
    { date: "2026-10-25", time: "14:00", opponent: "KIA 타이거즈", venue: "대구", home: true, postseason: true },
    { date: "2026-10-28", time: "18:30", opponent: "KIA 타이거즈", venue: "광주", home: false, postseason: true },
  ];

  for (const fixture of expected) {
    assert.deepEqual(MATCHES.find((match) => match.date === fixture.date), fixture);
  }
  for (const match of MATCHES) {
    assert.equal(match.home, match.venue === "대구", `${match.date}: badge must match the fixture venue`);
  }
});

test("featured matches show the next three fixtures in the verified October 23 snapshot", () => {
  assert.equal(SCHEDULE_VERIFIED_AT, "2026-10-23", "Update the fixture expectations when replacing this snapshot");
  assert.deepEqual(
    FEATURED_MATCHES.map(({ date, time, home }) => ({ date, time, home })),
    [
      { date: "2026-10-25", time: "14:00", home: true },
      { date: "2026-10-26", time: "18:30", home: true },
      { date: "2026-10-28", time: "18:30", home: false },
    ],
  );
  assert.ok(FEATURED_MATCHES.every((match) => MATCHES.includes(match)));
  assert.ok(FEATURED_MATCHES.every((match) => match.date >= SCHEDULE_VERIFIED_AT));
});

test("Korean date labels retain weekday and month across leap day and year boundaries", () => {
  assert.equal(matchDateLabel("2026-10-25"), "10. 25. (일)");
  assert.equal(matchDateLabel("2026-12-31"), "12. 31. (목)");
  assert.equal(matchDateLabel("2027-01-01"), "1. 1. (금)");
  assert.equal(matchDateLabel("2024-02-29"), "2. 29. (목)");
});

test("date labels and calendar days are independent of the server's local time zone", { concurrency: false }, () => {
  const originalTimeZone = process.env.TZ;
  try {
    for (const timeZone of ["UTC", "Asia/Seoul", "America/Los_Angeles", "Pacific/Honolulu", "Pacific/Kiritimati"]) {
      process.env.TZ = timeZone;
      assert.equal(new Intl.DateTimeFormat("en-US").resolvedOptions().timeZone, timeZone, "The test must actually change the local time zone");
      const labels = ["2026-12-31", "2027-01-01", "2024-02-29"].map(matchDateLabel);
      const january = calendarDays(2027, 0);
      assert.deepEqual(labels, ["12. 31. (목)", "1. 1. (금)", "2. 29. (목)"], timeZone);
      assert.deepEqual(january.slice(0, 7), [null, null, null, null, null, 1, 2], timeZone);
      assert.equal(january.length, 42, timeZone);
    }
  } finally {
    if (originalTimeZone === undefined) delete process.env.TZ;
    else process.env.TZ = originalTimeZone;
  }
});
