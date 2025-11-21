// FILE: src/app/speakers/page.tsx
import Link from "next/link";
import { Mail, Building2 } from "lucide-react";
import { SPEAKERS, type Speaker } from "@/data/program";
import SectionTitle from "@/components/SectionTitle";
import { ICON_IMAGE } from "@/data/source_path";
import ComingSoon from "@/components/ComingSoon";
import { asset } from "@/lib/paths";
type AnySpeaker = (typeof SPEAKERS)[number];

// 연사 배열 -> { 분야명: 연사[] } 로 그룹핑 (field | fields 둘 다 지원)
function groupByField(list: AnySpeaker[]) {
  const groups: Record<string, AnySpeaker[]> = {};
  const FALLBACK = "초청연사";

  for (const sp of list) {
    const fields: string[] = Array.isArray((sp as any).fields)
      ? ((sp as any).fields as string[])
      : typeof (sp as any).field === "string" && (sp as any).field.trim().length
      ? [(sp as any).field as string]
      : [];

    const buckets = fields.length ? fields : [FALLBACK];
    for (const f of buckets) {
      const key = f.trim();
      if (!groups[key]) groups[key] = [];
      groups[key].push(sp);
    }
  }

  // 각 그룹 내부 정렬(이름 기준)
  // for (const k of Object.keys(groups)) {
  //   groups[k].sort((a, b) => (a.name || "").localeCompare(b.name || "", "ko"));
  // }
  return groups;
}

export default function Page() {
  const hasData = SPEAKERS.length > 0;
  const groups = hasData ? groupByField(SPEAKERS) : {};
  const groupNames = Object.keys(groups);
  // const groupNames = Object.keys(groups).sort((a, b) =>
  //   a.localeCompare(b, "ko")
  // );

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
            초청 연사
          </li>
        </ol>
      </nav>
      {/* 
      <h1 className="mb-8 text-2xl font-bold md:text-3xl">
        초청 연사 (Speakers)
      </h1> */}

      {false ? (
        <ComingSoon />
      ) : (
        <>
          {/* 분야별 섹션 */}
          {groupNames.map((g) => (
            <section
              key={g}
              id={`field-${encodeURIComponent(g)}`}
              className="mb-10"
            >
              <SectionTitle icon={ICON_IMAGE} as="h1" className="text-xl">
                {g}
              </SectionTitle>
              <div className="grid gap-6">
                {groups[g].map((sp: Speaker) => (
                  <article
                    key={sp.name}
                    className="rounded-2xl border bg-white p-4 shadow-sm"
                  >
                    <div className="m-1 flex items-center gap-3">
                      {"photo" in sp && sp.photo ? (
                        <img
                          src={asset(sp.photo) as string}
                          alt={sp.name}
                          className="h-20 w-20 md:h-36 md:w-32 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-base font-semibold text-gray-700">
                          {sp.name.slice(0, 1)}
                        </div>
                      )}
                      <div className="space-y-3 md:space-y-5">
                        <h3 className="text-base md:text-xl font-semibold text-gray-900">
                          - {sp.affiliation}
                          <span> </span>
                          {sp.name}
                          <span> </span>
                          {sp.title}
                        </h3>

                        <h3 className="text-base md:text-xl font-semibold text-gray-900">
                          - {sp.presentation_title}
                        </h3>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </main>
  );
}
