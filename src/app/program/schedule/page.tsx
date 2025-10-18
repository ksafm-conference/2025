// FILE: src/app/program/schedule/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { asset } from "@/lib/paths";
import { PROGRAM_IMAGE } from "@/data/source_path";
import ComingSoon from "@/components/ComingSoon";

export default function Page() {
  // 이미지 파일은 public 경로에 있어야 합니다.
  const images: { src: string; alt: string; caption?: string }[] = [
    { src: asset(PROGRAM_IMAGE), alt: "프로그램" },
    // 이미지가 아직 없으면 위 배열을 [] 로 두세요.
  ];

  // 라이트박스 상태
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const SCALE = 1.8;

  // 확대 기준 크기
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [baseSize, setBaseSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  // 드래그-팬
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const movedRef = useRef(false);

  // ESC 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setLightboxIdx(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIdx]);

  const handleImgLoaded = () => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setBaseSize({ w: rect.width, h: rect.height });
  };

  // 확대/축소 시 스크롤 중앙 맞춤
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || baseSize.w === 0) return;
    if (zoomed) {
      const contentW = baseSize.w * SCALE;
      const contentH = baseSize.h * SCALE;
      el.scrollTo({
        left: Math.max(0, (contentW - el.clientWidth) / 2),
        top: Math.max(0, (contentH - el.clientHeight) / 2),
      });
    } else {
      el.scrollTo({ left: 0, top: 0 });
    }
  }, [zoomed, baseSize.w, baseSize.h]);

  // 드래그-팬 핸들러
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!zoomed) return;
    const el = scrollerRef.current;
    if (!el) return;
    setIsPanning(true);
    movedRef.current = false;
    panStart.current = {
      x: e.clientX,
      y: e.clientY,
      sx: el.scrollLeft,
      sy: el.scrollTop,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isPanning || !zoomed) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) movedRef.current = true;
    el.scrollLeft = panStart.current.sx - dx;
    el.scrollTop = panStart.current.sy - dy;
  };
  const endPan = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    setIsPanning(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600" aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:underline">
              홈
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <span className="text-gray-700">프로그램</span>
          </li>
          <li className="text-gray-400">/</li>
          <li aria-current="page" className="font-medium text-indigo-500">
            행사 일정표
          </li>
        </ol>
      </nav>

      {1 ? (
        <ComingSoon />
      ) : (
        <>
          <section className="grid gap-6">
            {images.map((img, i) => (
              <figure
                key={img.src}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <button
                  type="button"
                  className="block w-full cursor-zoom-in"
                  onClick={() => {
                    setLightboxIdx(i);
                    setZoomed(false);
                  }}
                  aria-label={`${img.alt} 확대 보기`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-auto w-full rounded-lg"
                    loading="lazy"
                  />
                </button>
                {img.caption && (
                  <figcaption className="mt-2 text-center text-sm text-gray-600">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </section>

          {/* 라이트박스 */}
          {lightboxIdx !== null && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
              role="dialog"
              aria-modal="true"
              onClick={() => setLightboxIdx(null)}
            >
              <div
                className="relative max-h-[90vh] max-w-[95vw]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* 컨트롤 */}
                <div className="absolute right-2 top-2 z-[101] flex gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-white/90 px-3 py-2 text-xs font-medium text-gray-900 shadow hover:bg-white"
                    onClick={() => setZoomed((z) => !z)}
                    aria-label={zoomed ? "축소" : "확대"}
                  >
                    <span className="inline-flex items-center gap-1">
                      {zoomed ? (
                        <ZoomOut className="h-4 w-4" />
                      ) : (
                        <ZoomIn className="h-4 w-4" />
                      )}
                      {zoomed ? "축소" : "확대"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-white/90 px-3 py-2 text-xs font-semibold text-gray-900 shadow hover:bg-white"
                    onClick={() => setLightboxIdx(null)}
                    aria-label="닫기"
                  >
                    <span className="inline-flex items-center gap-1">
                      <X className="h-4 w-4" /> 닫기
                    </span>
                  </button>
                </div>

                {/* 스크롤 캔버스 */}
                <div
                  ref={scrollerRef}
                  className={`max-h-[90vh] max-w-[95vw] overflow-auto rounded-lg bg-black/20 ${
                    zoomed
                      ? isPanning
                        ? "cursor-grabbing"
                        : "cursor-grab"
                      : ""
                  }`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endPan}
                  onPointerCancel={endPan}
                  onPointerLeave={endPan}
                >
                  <div
                    style={{
                      width: baseSize.w
                        ? zoomed
                          ? baseSize.w * SCALE
                          : baseSize.w
                        : undefined,
                      height: baseSize.h
                        ? zoomed
                          ? baseSize.h * SCALE
                          : baseSize.h
                        : undefined,
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={images[lightboxIdx].src}
                      alt={images[lightboxIdx].alt}
                      className="block h-auto w-full select-none"
                      draggable={false}
                      onLoad={handleImgLoaded}
                      onClick={() => {
                        if (!movedRef.current) setZoomed((z) => !z);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
