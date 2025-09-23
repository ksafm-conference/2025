// ===============================
// FILE: src/data/events/2025-summer.ts
// ===============================
import type { EventData } from './types';

const data: EventData = {
  slug: '2025-summer',
  title: 'KSAFM 2025 Summer',
  theme: '극한기상에 따른 농림분야 피해와 대책',
  startDate: '2025-06-24',
  endDate: '2025-06-25',
  venue: '한국농수산대학교',
  city: '전주',
  contactEmail: 'secretariat@example.org',
  importantDates: [
    { date: '2025-04-30', label: '초록제출 마감' },
    { date: '2025-05-15', label: '채택 통보' },
    { date: '2025-05-20', label: '사전등록 시작' },
    { date: '2025-06-24', label: '행사 시작' },
    { date: '2025-06-25', label: '행사 종료' },
  ],
  fees: [
    { tier: '학생 (Student)', price: '₩40,000', perks: ['세션 입장', '프로시딩'] },
    { tier: '일반 (Regular)', price: '₩80,000', perks: ['세션 입장', '프로시딩', '점심'] },
    { tier: '현장 (On-site)', price: '₩100,000', perks: ['현장 등록'] },
  ],
};
export default data;
