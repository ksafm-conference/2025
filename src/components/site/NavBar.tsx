"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/data/nav";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null); // 데스크톱 드롭다운 열림 인덱스
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const closeWithDelay = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpenIdx(null), 150); // 150ms 지연 닫힘 (브리지 효과)
  };
  const openMenu = (i: number) => {
    clearCloseTimer();
    setOpenIdx(i);
  };

  // 라우트가 바뀌면 모두 닫기
  useEffect(() => {
    setOpenIdx(null);
    setMobileOpen(false);
  }, [pathname]);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function onDocPointerDown(e: PointerEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setOpenIdx(null);
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    return () => document.removeEventListener("pointerdown", onDocPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur ">
      <div
        ref={navRef}
        className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4"
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tight"
          aria-label="KSAFM"
        >
          한국농림기상학회 학술대회
        </Link>

        {/* 데스크톱 네비 */}
        <nav
          className="hidden items-center gap-6 md:flex h-full"
          aria-label="주 메뉴"
        >
          {nav.map((item, i) => {
            if ("href" in item) {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex h-full items-center px-2 text-md font-medium ${
                    active ? "text-black" : "text-gray-700 hover:underline"
                  }`}
                  onClick={() => setOpenIdx(null)}
                >
                  {item.label}
                </Link>
              );
            }

            // 드롭다운 (호버 열림 + 지연 닫힘 + 롤다운 애니메이션)
            const isOpen = openIdx === i;
            return (
              <div
                key={item.label}
                className="relative h-full"
                onMouseEnter={() => openMenu(i)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  type="button"
                  className={`inline-flex h-full items-center gap-1 px-2 text-md font-medium ${
                    isOpen ? "text-black" : "text-gray-700 hover:underline"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={() => (isOpen ? setOpenIdx(null) : openMenu(i))}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpenIdx(null);
                    if (e.key === "Enter" || e.key === " ")
                      isOpen ? setOpenIdx(null) : openMenu(i);
                  }}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {/* 드롭다운 래퍼: 항상 DOM에 두고, max-height로 롤다운 애니메이션 */}
                <div
                  className={`absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden [transform-origin:top] transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "max-h-80 opacity-100 translate-y-0 pointer-events-auto"
                      : "max-h-0 opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                  onMouseEnter={clearCloseTimer}
                  onMouseLeave={closeWithDelay}
                  role="menu"
                >
                  <div className="rounded-xl border bg-white p-2 shadow-lg">
                    {item.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`block rounded-lg px-3 py-2 text-sm hover:bg-gray-50 ${
                          pathname === sub.href
                            ? "bg-gray-50 text-black"
                            : "text-gray-700"
                        }`}
                        onClick={() => setOpenIdx(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* 모바일 토글 버튼 */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="mx-auto block max-w-6xl px-4 pb-3 md:hidden">
          <div className="grid gap-2">
            {nav.map((item) => {
              if ("href" in item) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-md font-semibold rounded-lg px-4 py-2 bg-gray-200  hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <div key={item.label} className="rounded-lg bg-gray-200 p-2">
                  <div className="px-2 pb-1 text-md font-semibold text-gray-700">
                    {item.label}
                  </div>
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block text-sm rounded-lg px-3 py-2 hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
