"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "lions-game-day-checklist-v1";
const CHANGE_EVENT = "lions-checklist-change";
const EMPTY_SNAPSHOT = "[]";

const ITEMS = [
  { id: "ticket", title: "티켓, 확인했나요?", description: "예매 내역과 모바일 티켓을 미리 확인해요." },
  { id: "battery", title: "휴대폰과 보조배터리", description: "입장부터 귀가까지, 배터리를 넉넉하게 준비해요." },
  { id: "sun", title: "모자와 자외선 차단", description: "야외 관람에 맞춰 햇빛을 가릴 준비를 해요." },
  { id: "drink", title: "음료와 반입 규정", description: "공식 반입 규정을 확인한 뒤 음료를 챙겨요." },
  { id: "weather", title: "날씨와 구단 공지", description: "출발 전에 당일 날씨와 경기 공지를 확인해요." },
  { id: "transit", title: "가는 길, 돌아오는 길", description: "경기 후 귀가편까지 미리 확인해 둬요." },
] as const;

let memorySnapshot = EMPTY_SNAPSHOT;
let memoryOnly = false;

function readSnapshot() {
  if (memoryOnly) return memorySnapshot;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return memorySnapshot;
  }
}

function serverSnapshot() {
  return EMPTY_SNAPSHOT;
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function decodeSnapshot(snapshot: string): string[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!Array.isArray(value)) return [];
    return ITEMS.filter((item) => value.includes(item.id)).map((item) => item.id);
  } catch {
    return [];
  }
}

function saveItems(items: string[]) {
  memorySnapshot = JSON.stringify(items);
  try {
    window.localStorage.setItem(STORAGE_KEY, memorySnapshot);
    memoryOnly = false;
  } catch {
    memoryOnly = true;
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function FanChecklist() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, serverSnapshot);
  const checkedItems = decodeSnapshot(snapshot);
  const completed = checkedItems.length;

  function toggleItem(id: string) {
    const current = decodeSnapshot(readSnapshot());
    saveItems(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="fan-checklist">
      <div className="fan-checklist-progress">
        <p role="status" aria-live="polite" aria-atomic="true"><strong>{String(completed).padStart(2, "0")}</strong><span> / 06</span><span className="fan-progress-caption">{completed === ITEMS.length ? "준비 끝. 라팍에서 만나요!" : "하나씩 챙겨볼까요?"}</span></p>
        <progress max={ITEMS.length} value={completed} aria-label={`직관 준비 ${ITEMS.length}개 중 ${completed}개 완료`} />
      </div>
      <fieldset className="fan-checklist-items">
        <legend>나의 경기일 준비 목록</legend>
        {ITEMS.map((item, index) => (
          <label key={item.id} className={checkedItems.includes(item.id) ? "fan-checklist-item fan-checklist-item-done" : "fan-checklist-item"}>
            <input type="checkbox" checked={checkedItems.includes(item.id)} onChange={() => toggleItem(item.id)} />
            <span className="fan-checklist-item-text"><strong>{item.title}</strong><span>{item.description}</span></span>
            <span className="fan-checklist-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </label>
        ))}
      </fieldset>
      <div className="fan-checklist-footer">
        <p>체크한 항목은 이 브라우저에 저장됩니다. 저장을 사용할 수 없으면 현재 방문 중에만 유지되며, 다른 곳으로 전송되지 않습니다.</p>
        <button type="button" onClick={() => saveItems([])} disabled={completed === 0}>다시 준비하기 <span aria-hidden="true">↺</span></button>
      </div>
    </div>
  );
}
