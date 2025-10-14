// FILE: src/components/about/NoticeBoard.tsx
"use client";

import { NOTICES } from "@/data/notices";
import { useEffect, useMemo, useRef, useState } from "react";
import { Megaphone } from "lucide-react";
import { BASE_PATH } from "@/lib/paths"; // 이전에 만든 basePath 헬퍼: export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function NoticeBoard() {
  // /about/notice 에서는 id 있고 href 없는 공지만
  const base = useMemo(() => NOTICES.filter((n) => !!n.id && !n.href), []);
  if (!base.length) return null;

  const items = [...base].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned)
      return Number(!!b.pinned) - Number(!!a.pinned);
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  return (
    <section
      id="about-notice"
      className="scroll-mt-24 rounded-2xl border bg-white p-5 shadow-sm"
    >
      {/* <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <Megaphone className="h-5 w-5" /> 공지사항
      </h2> */}

      <ul className="grid gap-3 md:grid-cols-1">
        {items.map((n) => {
          const anchorId = `notice-${n.id}`;
          return (
            <li key={anchorId} id={anchorId} className="scroll-mt-24">
              <NoticeCard
                id={anchorId}
                title={n.title}
                date={n.date}
                content={n.content}
                contentHtml={n.contentHtml}
                pinned={n.pinned}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function NoticeCard({
  id,
  title,
  date,
  content,
  contentHtml,
  pinned,
}: {
  id: string;
  title: string;
  date?: string;
  content?: string;
  contentHtml?: string;
  pinned?: boolean;
}) {
  const [hi, setHi] = useState(false);
  const htmlRef = useRef<HTMLDivElement | null>(null);

  // 앵커 하이라이트
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === `#${id}`) {
      setHi(true);
      const t = setTimeout(() => setHi(false), 1500);
      return () => clearTimeout(t);
    }
  }, [id]);

  // ✅ GH Pages 하위경로 자동 붙이기: contentHtml 안의 a/img 등 src/href가 "/"로 시작하면 prefix
  useEffect(() => {
    const root = htmlRef.current;
    if (!root) return;
    const fix = (el: Element, attr: "src" | "href") => {
      const val = el.getAttribute(attr);
      if (val && val.startsWith("/") && BASE_PATH) {
        el.setAttribute(attr, `${BASE_PATH}${val}`);
      }
    };
    root
      .querySelectorAll("img[src], a[href], link[href], source[srcset]")
      .forEach((el) => {
        if (el instanceof HTMLImageElement) fix(el, "src");
        else if (el instanceof HTMLAnchorElement) fix(el, "href");
        else if (el instanceof HTMLLinkElement) fix(el, "href");
        else if (
          el instanceof HTMLSourceElement &&
          el.srcset?.startsWith("/")
        ) {
          el.srcset = `${BASE_PATH}${el.srcset}`;
        }
      });
  }, [contentHtml]);

  return (
    <article
      className={[
        "rounded-xl border p-4 shadow-sm transition",
        hi ? "ring-2 ring-indigo-400" : "hover:shadow",
        pinned ? "border-amber-300 bg-amber-50/40" : "bg-white",
      ].join(" ")}
    >
      <div className="mb-1 flex items-center gap-2">
        <h3 className=" text-xl md:text-2xl font-semibold text-black">
          {title}
        </h3>
        {pinned && (
          <span className="rounded bg-amber-500 px-1.5 py-0.5 text-xs font-semibold text-white">
            고정
          </span>
        )}
      </div>
      {date && <p className="mb-2 md:text-md text-gray-700">{date}</p>}

      {/* contentHtml 우선, 없으면 content 간단문구 */}
      {contentHtml ? (
        <div
          ref={htmlRef}
          className="prose prose-zinc max-w-none text-sm md:text-lg leading-6 [&_*]:!break-words"
          // 신뢰된 관리자가 입력한다는 전제. 불특정 사용자 입력이면 sanitize 필요!
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      ) : content ? (
        <p className=" text-sm md:text-lg leading-6 text-gray-800">{content}</p>
      ) : null}
    </article>
  );
}
