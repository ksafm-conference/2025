import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import { ICON_IMAGE } from "@/data/source_path";

export default function Page() {
  const rows = [
    { type: "학술대회 참가비 (필수)", amount: "(KRW) 150,000 원", note: "-" },
    {
      type: "초록제출 (1편 당)",
      amount: "(KRW) 20,000 원",
      note: "-",
    },
    {
      type: "국립여수해양기상과학관 투어",
      amount: "무료",
      note: "점심 제공",
    },
  ];

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
            참가 등록
          </li>
        </ol>
      </nav>

      {/* <h1 className='mb-2 text-2xl font-bold md:text-3xl'>참가 등록</h1> */}

      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          등록비
        </SectionTitle>
        <div className="overflow-hidden rounded-xl border">
          <table className="w-full text-center text-sm ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">구분</th>
                <th className="px-4 py-2">금액</th>
                <th className="px-4 py-2">비고</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    표 데이터를 채워주세요.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.type} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2">{r.type}</td>
                    <td className="px-4 py-2">{r.amount}</td>
                    <td className="px-4 py-2">{r.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 결제방법 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          결제 방법{" "}
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            온라인 결제는 12월 03일까지 가능합니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            학술대회 당일 오프라인 현장결제 가능합니다.
          </li>
        </ul>
      </section>

      {/* 취소 및 환불정책 */}
      <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
          취소 및 환불정책
        </SectionTitle>
        <ul className="list-none pl-0 space-y-2 text-lg text-gray-900">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            등록 취소 및 환불은 이메일
            <a
              href="mailto:ksafm2@gmail.com"
              className="underline underline-offset-2 text-blue-600 hover:text-blue-700"
            >
              (ksafm1@gmail.com)
            </a>
            으로 문의주시기 바랍니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            환불은 행사 종료 후에 처리됩니다.
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['-']">
            등록 취소 및 환불기간은 아래의 내용 참고 부탁드립니다.
          </li>
          <li className="relative pl-10">2025년 12월 03일 이전: 전액 환불</li>
          <li className="relative pl-10">2025년 12월 03일 이후: 문의 요망</li>
        </ul>
      </section>
    </main>
  );
}
