// FILE: src/app/page.tsx
import Link from "next/link";
import {
  Calendar,
  MapPin,
  BookOpen,
  ArrowRight,
  Newspaper,
  ChevronRight,
  Pin,
  Handshake, // ▶ 추가: 화살표 아이콘
} from "lucide-react";
import { externalLinks } from "@/data/nav";
import { home } from "@/data/home";
import { getHomeNotices } from "@/data/notices";

export default function Page() {
  // 메인 CTA 3개 정의
  const ctas: {
    label: string;
    href: string;
    external?: boolean;
    color: "blue" | "emerald" | "amber";
  }[] = [
    { label: "프로그램", href: "/program/schedule", color: "blue" },
    {
      label: "참가등록",
      href: externalLinks.registration,
      external: true,
      color: "emerald",
    },
    {
      label: "초록제출",
      href: externalLinks.submission,
      external: true,
      color: "amber",
    },
  ];

  // 색상 테마 매핑
  const theme = {
    blue: {
      gradient: "bg-gradient-to-b from-blue-500 to-blue-600",
      text: "text-white",
      hover: "hover:from-blue-500 hover:to-blue-700",
      active: "active:scale-95",
      ring: "focus-visible:ring-blue-500/50",
      border: "border-blue-600/20",
    },
    emerald: {
      gradient: "bg-gradient-to-b from-emerald-500 to-emerald-600",
      text: "text-white",
      hover: "hover:from-emerald-500 hover:to-emerald-700",
      active: "active:scale-95",
      ring: "focus-visible:ring-emerald-500/50",
      border: "border-emerald-600/20",
    },
    amber: {
      gradient: "bg-gradient-to-b from-amber-500 to-amber-600",
      text: "text-white",
      hover: "hover:from-amber-500 hover:to-amber-700",
      active: "active:scale-95",
      ring: "focus-visible:ring-amber-500/50",
      border: "border-amber-600/20",
    },
  } as const;

  return (
    <main>
      {/* Hero (상단 배너) */}
      <section className="border-b bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <div>
              <p className="mb-2 text-[11px] md:text-sm font-semibold tracking-widest text-gray-500">
                {home.society}
              </p>
              <h1 className="mb-3 text-xl font-extrabold leading-tight md:text-3xl">
                {home.title}
              </h1>
            </div>
            <p className="h-full space-y-3 mb-6 text-[15px] leading-relaxed text-gray-900 md:text-lg ">
              주제: {home.theme}
              <br />
              <span className="inline-flex items-center gap-2 text-gray-800">
                일시: {home.dateText}
              </span>
              <br />
              <span className="inline-flex items-center gap-2 text-gray-800">
                장소: {home.venueText}
              </span>
              <br />
              <span className="inline-flex items-center gap-2 text-gray-800">
                후원:{" "}
                {home.sponsorship.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <img
                      src={s.logo}
                      alt={s.name ?? "sponsorship logo"}
                      className="h-7 w-auto md:h-8"
                    />
                  </a>
                ))}
              </span>
            </p>

            {/* ▶ 메인 CTA 버튼 3개 (프로그램 / 참가등록 / 초록제출) */}
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
              {ctas.map((btn) => {
                const t = theme[btn.color];
                const inner = (
                  <span
                    className={[
                      "inline-flex w-full items-center justify-between gap-3",
                      "rounded-xl border px-5 py-4",
                      "text-sm lg:text-base font-semibold shadow-md transition",
                      t.gradient,
                      t.text,
                      t.hover,
                      t.active,
                      t.ring,
                      t.border,
                      "hover:-translate-y-0.5",
                      "focus-visible:outline-none focus-visible:ring-4",
                    ].join(" ")}
                  >
                    <span>{btn.label}</span>
                    <ChevronRight
                      className="h-5 w-5 opacity-90"
                      aria-hidden="true"
                    />
                  </span>
                );

                return btn.external ? (
                  <a
                    key={btn.label}
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${btn.label} 바로가기`}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={btn.label}
                    href={btn.href}
                    aria-label={`${btn.label} 바로가기`}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 우측 Important Dates 박스 */}
          <div className="rounded-[14px] border bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold">
              <Calendar className="h-5 w-5" />
              주요 일정
            </h2>
            <ul className="space-y-1">
              {home.importantDates.map((d) => {
                const crossed = d.strike === true; // ✅ 수동 플래그만 확인
                return (
                  <li key={d.date} className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-800" />
                    <div>
                      <p
                        className={[
                          "font-medium text-lg md:text-xl",
                          crossed
                            ? "line-through text-gray-500"
                            : "text-gray-900",
                        ].join(" ")}
                      >
                        {d.label}
                      </p>
                      <p
                        className={[
                          "text-lg md:text-xl",
                          crossed
                            ? "line-through text-gray-500"
                            : "text-gray-900",
                        ].join(" ")}
                      >
                        {d.date}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* 중간 영역: 공지 + 바로가기 카드 */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* 공지 리스트 */}
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <Newspaper className="h-5 w-5" />
              <h2 className="text-[18px] md:text-xl font-bold">공지사항</h2>
            </div>

            <ul className="divide-y rounded-[14px] border bg-white">
              {getHomeNotices(6).map((n) => (
                <li key={n.title} className="hover:bg-gray-50">
                  <Link
                    href={n.href}
                    target={n.external ? "_blank" : undefined}
                    rel={n.external ? "noopener noreferrer" : undefined}
                    className="group flex w-full items-center justify-between px-4 py-3 text-base md:text-lg text-gray-800"
                  >
                    <span className="inline-flex items-center gap-2">
                      {/* ✅ 핀 아이콘 (상단고정) */}
                      {n.pin && (
                        <Pin
                          className="h-4 w-4 text-indigo-700"
                          aria-label="상단 고정"
                        />
                      )}
                      {/* 제목 */}
                      <span className="group-hover:underline">{n.title}</span>
                      {/* ✅ NEW 배지 (최근 글) */}
                      {n.isNew && (
                        <span className="ml-1 inline-flex items-center rounded-full border-[0.5px] border-red-200 bg-red-50 px-0.5 py-1 text-[8px] leading-none              font-semibold text-red-600">
                          NEW
                        </span>
                      )}
                    </span>

                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 바로가기 카드 */}
          <div className="grid gap-4">
            <Link
              href="/about/overview"
              className="block rounded-[14px] border p-4 shadow-sm transition hover:shadow"
            >
              <h3 className="mb-1 flex items-center gap-2 text-base md:text-xl font-semibold text-gray-900">
                <BookOpen className="h-5 w-5" /> 학술대회 개요
              </h3>
              <p className="text-sm md:text-lg text-gray-700">
                행사 목적·주제·세부 분야 안내
              </p>
            </Link>
            <Link
              href="/program/schedule"
              className="block rounded-[14px] border p-4 shadow-sm transition hover:shadow"
            >
              <h3 className="mb-1 flex items-center gap-2 text-base md:text-xl font-semibold text-gray-900">
                <Calendar className="h-5 w-5" /> 행사 일정표
              </h3>
              <p className="text-sm md:text-lg text-gray-700">
                세션 시간표 및 장소
              </p>
            </Link>
            <Link
              href="/contact"
              className="block rounded-[14px] border p-4 shadow-sm transition hover:shadow"
            >
              <h3 className="mb-1 flex items-center gap-2 text-base md:text-xl font-semibold text-gray-900">
                <MapPin className="h-5 w-5" /> 오시는 길
              </h3>
              <p className="text-sm md:text-lg text-700">
                장소 및 교통·숙박 안내
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
