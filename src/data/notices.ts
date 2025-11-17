// FILE: src/data/notices.ts
export type Notice = {
  id?: string;
  title: string;
  content?: string;
  contentHtml?: string;
  date?: string; // "YYYY-MM-DD"
  pinned?: boolean; // 상세 페이지 상단 고정
  showOnHome?: boolean; // 홈에 노출
  href?: string; // 외부/내부 링크
  external?: boolean;
  pinHome?: boolean; // ✅ 홈 목록 상단 고정
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

const RECENT_DAYS = 14;

/** 한 곳에서 공지 관리 */
export const NOTICES: Notice[] = [
  {
    title: "2025 동계학술대회 사이트 오픈 및 초록 제출/등록 안내",
    href: "/submission",
    content: "초록 제출/등록 방법 안내 페이지로 이동합니다.",
    date: "2025-10-15",
    showOnHome: true,
    pinHome: true,
  },
  {
    href: "/submission/guideline",
    title: "발표 진행 안내 (발표 시간, 포스터 부착 위치 등)",
    content: "발표 시간과 포스터 부착 위치 등 진행 안내를 확인하세요.",
    date: "2025-10-15",
    showOnHome: true,
    pinHome: true,
  },
  {
    id: "notice-1",
    title: "2025년 동계학술대회 숙박 예약 안내",
    date: "2025-11-13",
    pinned: false,
    showOnHome: true,
    contentHtml: `
      <p>한국농림기상학회 회원님께</p>
      <p>동계학술대회 기간의 <b>숙박 예약</b>에 대해 알려드립니다.</p>
      <p>이번 동계학술대회가 개최되는     <a
              href="https://www.yeosuvenezia.com/"
              rel="noopener noreferrer"
              style="text-decoration : underline"
              target="_blank"
            >
              
            <b>여수베네치아호텔앤스위트</b>
            </a>에서 아래와 같이 숙박이 가능하오니, 여정에 참고하시기 바랍니다.</p>

      <ul style="margin:.5rem 0 0 1rem;list-style:disc">
        <li>숙박 장소 : 여수 베네치아호텔&스위트</li>
        <li>객실 예약은 예약신청서 작성 후, 호텔 메일(<span style="color:#1976d2">info@yeosuvenezia.com</span>)로 송부 <br>(호텔에서 직접 예약 확정 진행)
        </li>
      </ul>
       <p style="margin:.5rem 0 0 ">
       <img src="/notice/room.png" alt="숙박 예약 안내" style="display:block;margin:.25rem auto 0;max-width:100%;height:auto;border:1px solid #eee;border-radius:8px" />
      </p>
    `,
    attachments: [
      {
        label: "여수베네치아_객실예약신청서(25년 한국농림기상학회).docx",
        href: "/notice/여수베네치아_객실예약신청서(25년 한국농림기상학회).docx",
        type: "docx",
        size: "61.88 KB",
        downloadable: true, // 브라우저에서 곧바로 다운로드
      },
    ],
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

/** 홈 공지 리스트 (pinHome > pinned > 최신순) + 표시용 플래그 전달 */
export function getHomeNotices(limit = 6) {
  const sorted = [...NOTICES]
    .filter((n) => n.showOnHome ?? true)
    .sort((a, b) => {
      if (!!b.pinHome !== !!a.pinHome)
        return Number(!!b.pinHome) - Number(!!a.pinHome);
      if (!!b.pinned !== !!a.pinned)
        return Number(!!b.pinned) - Number(!!a.pinned);
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });

  return sorted.slice(0, limit).map((n) => ({
    title: n.title,
    href: buildNoticeHref(n),
    external: n.external ?? isExternal(n.href),
    /** ✅ 홈에서 아이콘 표시용 */
    pin: !!n.pinHome || !!n.pinned,
    /** ✅ 최근(NEW) 표시 */
    isNew: isRecent(n.date),
  }));
}

/** id에 'notice-'가 이미 있으면 그대로, 없으면 붙여서 앵커 id로 사용 */
export function anchorIdFor(n: Notice) {
  if (!n.id) return "";
  return n.id.startsWith("notice-") ? n.id : `notice-${n.id}`;
}
/** href 우선, 없으면 /about/notice#<앵커ID> */
export function buildNoticeHref(n: Notice): string {
  if (n.href) return n.href;
  if (n.id) return `/about/notice#${anchorIdFor(n)}`;
  return "#";
}

function isExternal(href?: string) {
  return !!href && /^https?:\/\//i.test(href);
}

function isRecent(dateStr?: string, days = RECENT_DAYS) {
  if (!dateStr) return false;
  const t = new Date(dateStr).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t <= days * 24 * 60 * 60 * 1000;
}
