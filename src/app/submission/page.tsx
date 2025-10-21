// FILE: src/app/submission/page.tsx
import Link from "next/link";
import { ExternalLink, Download, Info } from "lucide-react";
import { externalLinks } from "@/data/nav";
import SectionTitle from "@/components/SectionTitle";
import { ICON_IMAGE, TEMPLATE_DOC } from "@/data/source_path";
import { asset } from "@/lib/paths";
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
          <li aria-current="page" className="font-medium text-indigo-500">
            초록 제출
          </li>
        </ol>
      </nav>

      {/* 초록 제출*/}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          초록 제출
        </SectionTitle>

        <ul className="list-none pl-0 space-y-2 text-sm md:text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            초록은 마감일을 확인하신 후 기한 내 제출해 주시기 바랍니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            학술대회에서는 초록의 첫 번째 저자가 발표하는 것이 원칙입니다.
            <br />
            (※ 부득이한 경우 공동저자 중 한 명이 발표 가능합니다.)
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            학술대회 등록 1회로 최대 3편의 초록을 제출 및 발표하실 수 있으며,
            4편 이상 등록을 원하실 경우 추가 등록이 필요합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            여러 편의 초록 등록 시, 첫 번째 저자가 다른 경우에는 저자별로 각각
            등록해야 합니다.
          </li>
        </ul>
      </section>

      {/* 발표 분야 안내*/}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          발표 분야 안내
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-sm md:text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            추후 안내
          </li>
        </ul>
      </section>

      {/* 제출 절차 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          초록 제출 절차
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-sm md:text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            초록 제출 정보 및 프레젠테이션 가이드라인을 확인합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            초록 제출 웹페이지로 이동하여 계정을 생성합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            제출 양식에 맞게 정보를 입력하고 초록 파일을 업로드합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            제출 후 확인 이메일을 받습니다.
          </li>
        </ul>
      </section>

      {/* 액션 버튼: 양식 다운로드 / 제출 바로가기 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          초록 제출 양식
        </SectionTitle>
        <div className="flex flex-wrap gap-2">
          {/* 양식 다운로드 (hwp) */}
          <a
            href={asset(TEMPLATE_DOC)}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-600/20 bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/50 active:scale-95"
          >
            <Download className="h-4 w-4" />
            초록 양식 다운로드
          </a>

          {/* 제출 페이지 이동 */}
          <a
            href={externalLinks.submission}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-600/20 bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-emerald-500 hover:to-emerald-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-500/50 active:scale-95"
          >
            초록 제출
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* 안내 박스 */}
        {/* <div className='mt-4 flex items-start gap-2 rounded-lg bg-indigo-50/70 p-3 text-[13px] text-indigo-900'>
          <Info className='mt-0.5 h-4 w-4 shrink-0' />
          <p>
            템플릿에 맞춰 작성 후 <strong>HWP</strong> 파일로 업로드하세요. 파일명 예:{' '}
            <code className='rounded bg-white/70 px-1'>KSAFM_2025_홍길동.hwp</code>
          </p>
        </div> */}
      </section>
    </main>
  );
}
