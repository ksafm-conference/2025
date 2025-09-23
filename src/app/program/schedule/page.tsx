// FILE: src/app/program/schedule/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { asset } from "@/lib/paths";
import { PROGRAM_IMAGE } from "@/data/source_path";

export default function Page() {
  // 이미지 파일은 "public/program/schedule" 폴더에 넣으세요.
  const images: { src: string; alt: string; caption?: string }[] = [
    {
      src: asset(PROGRAM_IMAGE),
      alt: "프로그램",
    },
  ];

  // 라이트박스(전체화면) 상태
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  // 확대 배율(필요하면 1.5~2.0 사이로 조절)
  const SCALE = 1.8;

  // 표시 크기 기반 확대를 위한 참조/상태
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [baseSize, setBaseSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  // 드래그-팬(Drag-Pan)
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const movedRef = useRef(false); // 클릭과 드래그 구분

  // ESC로 닫기 + 배경 스크롤 잠금
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

  // 이미지가 라이트박스에 뜨면, 현재 표시(렌더) 크기 측정 → baseSize로 저장
  const handleImgLoaded = () => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect(); // 현재 화면에 보이는 실제 크기(px)
    setBaseSize({ w: rect.width, h: rect.height });
  };

  // 확대/축소 시 스크롤 위치 조절(확대 시 중앙으로 살짝 이동)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || baseSize.w === 0) return;

    if (zoomed) {
      const contentW = baseSize.w * SCALE;
      const contentH = baseSize.h * SCALE;
      const centerX = Math.max(0, (contentW - el.clientWidth) / 2);
      const centerY = Math.max(0, (contentH - el.clientHeight) / 2);
      el.scrollTo({ left: centerX, top: centerY });
    } else {
      el.scrollTo({ left: 0, top: 0 });
    }
  }, [zoomed, baseSize.w, baseSize.h]);

  // 드래그-팬 핸들러(확대 상태에서만)
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
      {/* breadcrumb(브레드크럼) */}
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
      {/* 
      <h1 className='mb-2 text-2xl font-bold md:text-3xl'>행사 일정표</h1>
      <p className='mb-6 text-sm text-gray-600'>※ 세부 내용은 변경될 수 있음.</p> */}

      {/* 이미지 목록 */}
      <section className="grid gap-6">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="rounded-2xl border bg-white p-4 shadow-sm"
          >
            {/* 썸네일: 클릭 시 라이트박스 오픈 */}
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

      {/* 라이트박스(전체화면) */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIdx(null)} // 배경 클릭 시 닫힘
        >
          {/* 컨텐츠 영역 클릭은 닫힘 방지 */}
          <div
            className="relative max-h-[90vh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 상단 컨트롤 */}
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

            {/* 스크롤 캔버스: 확대 시 큰 캔버스로 만들어 스크롤 가능 */}
            <div
              ref={scrollerRef}
              className={`max-h-[90vh] max-w-[95vw] overflow-auto rounded-lg bg-black/20 ${
                zoomed ? (isPanning ? "cursor-grabbing" : "cursor-grab") : ""
              }`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endPan}
              onPointerCancel={endPan}
              onPointerLeave={endPan}
            >
              {/* 확대 시, 실제 "표시 크기" 자체를 키워서 스크롤 영역을 확대 */}
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
                    // 드래그하지 않았을 때만 토글(모바일 탭 포함)
                    if (!movedRef.current) setZoomed((z) => !z);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
