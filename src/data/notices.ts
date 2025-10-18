// FILE: src/data/notices.ts
export type Notice = {
  id?: string;
  title: string;
  /** 기존 짧은 내용(선택) */
  content?: string;
  /** ✅ HTML 전체를 그대로 넣어 꾸밀 수 있음 */
  contentHtml?: string;
  date?: string;
  pinned?: boolean;
  showOnHome?: boolean;
  href?: string;
  external?: boolean;
  pinHome?: boolean;
  images?: string[];
  attachments?: {
    label: string;
    href: string;
    type?: string;
    size?: string;
    external?: boolean;
    openInNewTab?: boolean;
    downloadable?: boolean;
  }[];
};

/** 한 곳에서 공지 관리 */
export const NOTICES: Notice[] = [
  {
    title: "2025 동계학술대회 사이트 오픈 및 초록 제출/등록 안내",
    href: "/submission",
    content: "초록 제출/등록 방법 안내 페이지로 이동합니다.",
    date: "2025-06-05",
    showOnHome: true,
    pinHome: true,
  },
  {
    href: "/submission/guideline",
    title: "발표 진행 안내 (발표 시간, 포스터 부착 위치 등)",
    content: "발표 시간과 포스터 부착 위치 등 진행 안내를 확인하세요.",
    date: "2025-06-05",
    showOnHome: true,
    pinHome: true,
  },

  // {
  //   id: "notice-68",
  //   title: "발표 진행 안내",
  //   date: "2025-06-10",
  //   pinned: true,
  //   showOnHome: true,
  //   contentHtml: `
  //     <p><strong style="color:#d32f2f">구두 발표</strong> 슬라이드는 행사 전 이메일(<a href="mailto:ksafm2@gmail.com">ksafm2@gmail.com</a>)로 보내주세요.</p>
  //     <ul style="margin:.5rem 0 0 1rem;list-style:disc">
  //       <li>발표 시간: 12분 발표 + 3분 질의</li>
  //       <li>포스터 부착: <span style="color:#1976d2">B동 1층 로비</span></li>
  //     </ul>
  //     <p style="margin:.75rem 0 0">자세한 위치 안내는 아래 이미지를 참고하세요.</p>
  //     <p style="margin:.5rem 0 0">
  //       <img src="/program/schedule/program_image.jpg" alt="포스터 부착 위치" style="max-width:100%;height:auto;border:1px solid #eee;border-radius:8px" />
  //     </p>
  //   `,
  // },
];

/** 홈 공지 리스트 생성 (pinHome 우선 > pinned > 날짜 내림차순) */
export function getHomeNotices(limit = 6) {
  const sorted = [...NOTICES]
    .filter((n) => n.showOnHome ?? true)
    .sort((a, b) => {
      // 1) 메인 고정 우선
      if (!!b.pinHome !== !!a.pinHome)
        return Number(!!b.pinHome) - Number(!!a.pinHome);
      // 2) (옵션) pinned도 고려하고 싶으면 다음 줄 유지
      if (!!b.pinned !== !!a.pinned)
        return Number(!!b.pinned) - Number(!!a.pinned);
      // 3) 최신 날짜 먼저
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

  return sorted.slice(0, limit).map((n) => ({
    title: n.title,
    href: buildNoticeHref(n),
    external: n.external ?? isExternal(n.href),
  }));
}

/** href 우선, 없으면 /about/notice#notice-<id> */
export function buildNoticeHref(n: Notice): string {
  if (n.href) return n.href;
  if (n.id) return `/about/notice#notice-${n.id}`;
  return "#";
}

function isExternal(href?: string) {
  return !!href && /^https?:\/\//i.test(href);
}
