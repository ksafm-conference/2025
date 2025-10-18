import Link from "next/link";
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
          <li aria-current="page" className="font-medium text-indigo-500">
            발표/포스터 안내
          </li>
        </ol>
      </nav>

      {/* <h1 className='mb-6 text-2xl font-bold md:text-3xl'>발표/포스터 안내 (Guideline)</h1> */}

      {/* 구두 발표 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          발표 시간
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            기조 연설: 40분
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            특별세션: 각 특별세션 진행 상황에 따름
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            일반구두: 15분 (구술발표 12분, 질의응답 3분)
          </li>
        </ul>
        <ul className="mt-10 list-none pl-0 space-y-2 text-lg text-gray-900">
          <li className="relative pl-6 before:absolute before:left-0 before:content-['※']">
            구두 발표를 위해 수락된 논문의 저자들은 회의 전에 이메일을 통해
            PowerPoint 슬라이드를 보내주시기 바랍니다.{" "}
            <a
              href="mailto:ksafm2@gmail.com"
              className="underline underline-offset-2 text-blue-600 hover:text-blue-700"
            >
              (ksafm2@gmail.com)
            </a>
          </li>
          <li className="relative pl-6 before:absolute before:left-0 before:content-['※']">
            학술대회 행사장에는 프레젠테이션용 노트북 및 USB가 준비되어
            있습니다.
          </li>
          <li className="relative pl-6 before:absolute before:left-0 before:content-['※']">
            발표자는 세션 시작 10분 전에 발표장소에 대기 부탁드립니다.
          </li>
        </ul>
      </section>

      {/* 포스터 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          포스터
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            포스터 발표자는 행사장의 지정된 장소에 포스터를 부착합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            포스터 크기: A0 (가로 841mm * 세로 1189mm, 가로 900mm 이하가 되도록
            권장)
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            장소 및 시간 : 추후 공지
          </li>
          {/* <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            포스터 세션: 한국농수산대학교 융합교육관
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            포스터 부착: 12월 04일 12:00 ~
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            포스터 철거: 12월 05일 12:00 ~
          </li> */}
        </ul>
      </section>
    </main>
  );
}
