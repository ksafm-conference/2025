// ===============================
// FILE: src/data/events/index.ts
// ===============================
import summer2025 from './2025-summer';
import type { EventData } from './types';

export const events: Record<string, EventData> = {
  [summer2025.slug]: summer2025,
  // 예: 가을 행사 추가 시 다음과 같이 확장
  // [fall2025.slug]: fall2025,
};

export const latestSlug = summer2025.slug; // 기본 진입용
