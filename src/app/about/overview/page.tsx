import Link from "next/link";
import { Calendar, MapPin, Building2 } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { ICON_IMAGE } from "@/data/source_path";

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
            학술대회 개요
          </li>
        </ol>
      </nav>

      {/* 주최/주관 */}
      <section className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          주최/주관
        </SectionTitle>
        <p className="text-gray-800 text-lg">- 한국농림기상학회</p>
      </section>

      {/* 행사 장소 */}
      <section className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          행사 장소
        </SectionTitle>
        <ul className="list-none space-y-2 text-lg text-gray-800">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            여수베네치아호텔앤스위트
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            웹사이트:{" "}
            <a
              href="https://www.yeosuvenezia.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline underline-offset-2"
            >
              https://www.yeosuvenezia.com/
            </a>
          </li>
        </ul>
      </section>

      {/* 주제 */}
      <section className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          주제
        </SectionTitle>
        <p className="text-gray-800 text-lg">-</p>
      </section>

      {/* 주요 일정 */}
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          주요 일정
        </SectionTitle>
        <ul className="list-none space-y-2 text-lg text-gray-800">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            초록제출 마감(1차): 2025년 11월 14일
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            초록제출 최종마감 : 2025년 11월 21일
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            온라인 등록기간: 2025년 12월 03일 까지
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            행사 기간: 2025년 12월 04-05일 (1박 2일)
          </li>
        </ul>
      </section>
    </main>
  );
}
