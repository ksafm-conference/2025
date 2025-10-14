// FILE: src/app/about/notice/page.tsx
import Link from "next/link";
import NoticeBoard from "@/components/about/NoticeBoard";

export default function Page() {
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
            <span className="text-gray-700">학술대회 안내</span>
          </li>
          <li className="text-gray-400">/</li>
          <li aria-current="page" className="font-medium text-indigo-500">
            공지사항
          </li>
        </ol>
      </nav>

      {/* ✅ 카드형 공지 섹션 */}
      <NoticeBoard />
    </main>
  );
}
