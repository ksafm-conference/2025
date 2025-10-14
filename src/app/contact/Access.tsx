// FILE: src/components/venue/Access.tsx
"use client";

import { useState, PropsWithChildren } from "react";
import clsx from "clsx";
import { DOT_IMAGE } from "@/data/source_path";
import { asset } from "@/lib/paths";

type AccessProps = {
  embedded?: boolean; // 바깥에서 카드로 감싸면 true
  className?: string;
};

type RouteRow = {
  from: string;
  to: string;
  time: string; // "약 55분", "2시간 50분(KTX)" 등
  route?: string; // "서울 > 천안JC > ..." (선택)
  layout?: "row" | "col" | "auto";
};

export default function Access({ embedded = false, className }: AccessProps) {
  const [tab, setTab] = useState<"car" | "train" | "air">("car");

  const Container = ({ children }: PropsWithChildren) =>
    embedded ? (
      <div className={className}>{children}</div>
    ) : (
      <section
        className={clsx("rounded-2xl border bg-white p-5 shadow-sm", className)}
      >
        {children}
      </section>
    );

  return (
    <Container>
      <Tabs value={tab} onChange={setTab} />
      {tab === "car" && <CarPanel />}
      {tab === "train" && <TrainPanel />}
      {tab === "air" && <AirPanel />}
    </Container>
  );
}

/* ----------------------------- Tabs ------------------------------ */

function Tabs({
  value,
  onChange,
}: {
  value: "car" | "train" | "air";
  onChange: (v: "car" | "train" | "air") => void;
}) {
  const items: { key: "car" | "train" | "air"; label: string }[] = [
    { key: "car", label: "자동차편" },
    { key: "train", label: "기차편" },
    { key: "air", label: "항공편" },
  ];

  return (
    <ul className="my-5 flex flex-wrap gap-2 md:gap-3">
      {items.map((t) => {
        const active = value === t.key;
        return (
          <li key={t.key}>
            <button
              type="button"
              onClick={() => onChange(t.key)}
              aria-current={active ? "page" : undefined}
              aria-pressed={active}
              className={[
                // 크기
                "inline-flex items-center rounded-full border px-4 py-2 md:px-5 md:py-2.5",
                "text-md md:text-lg font-semibold",
                // 컬러(밝은 파랑 테마)
                active
                  ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                  : "bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-200",
                // 포커스/전환
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
                "transition-colors",
              ].join(" ")}
            >
              {t.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* --------------------------- Panels ------------------------------ */

function CarPanel() {
  const rows: RouteRow[] = [
    {
      from: "서울",
      to: "여수",
      time: "서울시청 출발 기준 약 3시간 55분",
      route: "서울 > 천안JC > 논산JC > 익산JC > 완주JC > 동순천IC > 여수",
    },
    {
      from: "대전",
      to: "여수",
      time: "대전시청 출발 기준 약 2시간 40분",
      route: "대전 > 익산JC > 완주JC > 동순천IC > 여수",
    },
    {
      from: "광주",
      to: "여수",
      time: "광주시청 출발 기준 약 1시간 20분",
      route: "서광주 > 순천IC > 여수",
    },
    {
      from: "부산",
      to: "여수",
      time: "부산시청 출발 기준 약 2시간 10분",
      route: "부산 > 냉정JC > 진주JC > 옥곡IC > 여수",
    },
    {
      from: "목포",
      to: "여수",
      time: "목포시청 출발 기준 약 1시간 30분",
      route: "목포 > 죽림JC > 도룡IC > 여수",
    },
  ];

  return (
    // 모바일: 세로 / md부터 내부 10그리드(2:8)로 두 줄 배치
    <div className="flex flex-col md:grid md:grid-cols-10 md:gap-6">
      {/* --- 1행: 자동차편 제목(2) + 리스트(8) --- */}
      <strong className="block text-xl md:col-span-2 md:pr-4">
        자동차편으로
        <br className="hidden sm:block" />
        오실 때
      </strong>
      <div className="md:col-span-8">
        <ul className="mt-3 space-y-3 md:mt-0">
          {rows.map((r) => (
            <RouteCard key={r.from} row={r} />
          ))}
        </ul>
      </div>
      {/* --- 2행: 주차 안내(2) + 투숙객 무료(8) --- */}
      {/* <strong className="mt-6 block text-xl md:col-span-2 md:mt-4 md:pr-4">
        주차 안내
      </strong>
      <p className="mt-2 rounded-lg border bg-gray-50 p-3 text-md text-gray-800 md:col-span-8 md:mt-4">
        투숙객 무료
      </p> */}
    </div>
  );
}

function TrainPanel() {
  const rowsA: RouteRow[] = [
    { from: "서울역+용산역", to: "여수", time: "2시간 50분(KTX)" },
    { from: "수서", to: "여수", time: "3시간 15분(SRT)" },
    { from: "대전권", to: "여수", time: "2시간 40분(ITX)" },
    { from: "전주권", to: "여수", time: "1시간 30분(KTX)" },
  ];

  return (
    // 모바일: 세로, md 이상: 10칸 그리드에서 각 섹션을 2:8로 배치
    <div className="flex flex-col md:grid md:grid-cols-10 md:gap-6">
      {/* --- 1행: 기차편으로 오실 때 (2:8) --- */}
      <strong className="block text-xl md:col-span-2 md:pr-4">
        기차편으로
        <br className="hidden sm:block" />
        오실 때
      </strong>
      <div className="md:col-span-8">
        <ul className="mt-3 space-y-3 md:mt-0">
          {rowsA.map((r) => (
            <RouteCard key={r.from} row={r} />
          ))}
        </ul>

        {/* 필요 시 기차 예약 버튼은 1행의 내용 끝에 유지 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <PillButton href="http://www.letskorail.com/">
            KTX 예약하기
          </PillButton>
          <PillButton href="https://etk.srail.co.kr/main.do">
            SRT 예약하기
          </PillButton>
        </div>
      </div>

      {/* --- 2행: 여수 엑스포역에서 오실 때 (2:8) --- */}
      <strong className="mt-6 block text-xl md:col-span-2 md:mt-6 md:pr-4">
        여수 엑스포역에서
        <br className="hidden sm:block" />
        오실 때
      </strong>
      <div className="md:col-span-8">
        <ul className="mt-3 space-y-3 md:mt-0 ">
          <RouteCard
            row={{
              from: "여수 엑스포역",
              to: "여수 베네치아 호텔&스위트",
              time:
                "버스 \n - 약 10분 소요 1,300원/인 오동도방면 정류장 2번 버스 탑승 → 박람회장 정류장 895 하차\n\n" +
                "택시 \n - 약 2분 소요 약 2,800원",
            }}
          />
        </ul>
      </div>
    </div>
  );
}

function AirPanel() {
  const rows: RouteRow[] = [
    { from: "김포", to: "여수", time: "약 55분" },
    { from: "제주", to: "여수", time: "약 45분" },
    {
      from: "여수공항",
      to: "여수 베네치아 호텔&스위트",
      time:
        `버스 \n - 약 60분소요 시내버스 32,33,35번 > "시외버스터미널" 하차 > 333번 시내버스 환승 > 박람회장(한화아쿠아리움) 정류장에서 하차\n\n` +
        `약 40분 소요 공항버스 탑승 > "이순신광장"에서 하차 > 2번 시내버스 환승 > 박람회장(한화아쿠아리움) 정류장에서 하차\n\n` +
        "택시 \n - 약 18분 소요 약 17,000원\n\n",
    },
  ];

  return (
    <div className="flex flex-col md:grid md:grid-cols-10 md:gap-6">
      <strong className="block text-lg md:col-span-2 md:pr-4">
        항공편으로
        <br className="hidden sm:block" />
        오실 때
      </strong>

      <div className="md:col-span-8">
        <ul className="mt-3 space-y-3 md:mt-0">
          {rows.map((r) => (
            <RouteCard key={r.from} row={r} />
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          <PillButton href="https://kr.koreanair.com/korea/ko.html">
            대한항공
          </PillButton>
          <PillButton href="https://flyasiana.com/">아시아나</PillButton>
          <PillButton href="https://www.jinair.com/">진에어</PillButton>
          <PillButton href="https://www.jejuair.net/">제주에어</PillButton>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Small Components ------------------------ */
// RouteCard: dt(가로) + dd(아래로) 세로 스택
function RouteCard({
  row,
  className,
  dtClassName,
}: {
  row: RouteRow;
  className?: string;
  dtClassName?: string;
}) {
  return (
    <li className={clsx("rounded-lg border p-3", className)}>
      {/* ✅ dl은 세로 스택(기본 block). md:flex 제거! */}
      <dl className="space-y-1">
        {/* ✅ dt는 가로 정렬 */}
        <dt
          className={clsx(
            "mb-1 flex items-center gap-2 font-bold text-sm md:text-xl",
            dtClassName
          )}
        >
          <Badge type="from">{row.from}</Badge>
          <Dot />
          <Badge type="to">{row.to}</Badge>
        </dt>

        {/* ✅ dd는 dt 아래로 (설명) */}
        <dd className="text-gray-800 mx-3 md:w-[95%]">
          {row.time.includes("\n") ? (
            <span className=" whitespace-pre-wrap text-sm md:text-base">
              {row.time}
            </span>
          ) : (
            <span className="text-sm md:text-base ">{row.time}</span>
          )}
          {row.route && (
            <>
              <br />
              <span className="text-gray-700">{row.route}</span>
            </>
          )}
        </dd>
      </dl>
    </li>
  );
}

function Badge({
  children,
  type = "from",
}: PropsWithChildren<{ type?: "from" | "to" }>) {
  // from: 진한 파랑 배경 / 흰 글씨
  // to:   아주 연한 파랑 배경 / 파랑 글씨 / 테두리
  const base = "inline-flex min-w-12 justify-center rounded px-2 py-0.5";
  const cls =
    type === "from"
      ? "bg-blue-500 text-white"
      : "bg-blue-50 text-blue-700 border border-blue-200";
  return <span className={`${base} ${cls}`}>{children}</span>;
}

function Dot() {
  return <img src={asset(DOT_IMAGE)} />;
}

/* 공용 파란 pill 버튼 */
function PillButton({
  href,
  children,
  className,
  target = "_blank",
}: PropsWithChildren<{
  href: string;
  className?: string;
  target?: "_blank" | "_self";
}>) {
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={[
        "inline-flex items-center rounded-full border px-4 py-2 md:px-5 md:py-2.5",
        "text-sm md:text-base font-semibold transition",
        "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
