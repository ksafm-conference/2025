// ===============================
// FILE: src/data/events/types.ts
// ===============================
export type Fee = { tier: string; price: string; perks: string[] };
export type ImportantDate = { date: string; label: string };

export type EventData = {
  slug: string; // 예: "2025-summer"
  title: string; // 예: "KSAFM 2025 Summer"
  theme?: string; // 주제
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  venue: string; // 장소 명칭
  city?: string; // 도시
  contactEmail?: string; // 문의 메일
  importantDates: ImportantDate[];
  fees: Fee[];
};
