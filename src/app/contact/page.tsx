import LocationMap from "@/app/contact/LocationMap";
import SectionTitle from "@/components/SectionTitle";
import { ICON_IMAGE } from "@/data/source_path";

export default function Page() {
  // 문의 정보 (필요하면 바꿔 넣기)
  const ORG = {
    email: "ksafm1@gmail.com",
    phone: "070-4417-7125",
    address: "(08826) 서울특별시 관악구 관악로 1 서울대학교 36동 108호",
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <SectionTitle icon={ICON_IMAGE} as="h1" className="text-2xl">
        행사장소
      </SectionTitle>
      <section className="space-y-5">
        <div>
          <p className="text-lg">
            - 주소 : 전남 여수시 오동도로 61-13 여수베네치아호텔&스위트
          </p>
          <p className="text-lg">- 전화 : 061-664-0001</p>
        </div>

        {/* 지도 */}
        <LocationMap
          title="여수베네치아호텔&스위트"
          point={{ lat: 34.74577866287442, lng: 127.75189305228245 }}
          initLevel={4}
          bigView={{
            srcid: 1748504512,
            itemId: 1748504512,
            q: "여수베네치아호텔&스위트",
            urlX: 672126.0000000028,
            urlY: 347876.00000000326,
            mapType: "TYPE_MAP",
          }}
        />
      </section>

      {/* 오시는 길 (How to go there) */}
      <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h2" className="text-2xl">
          오시는 길
        </SectionTitle>
        <div className="grid gap-6 md:grid-cols-2">
          {/* 자가용 */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">자가용</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>내비게이션 검색어: “여수베네치아호텔&스위트”</li>
              <li>주차 위치/요금은 행사 공지에 따릅니다.</li>
            </ul>
          </div>
          {/* 대중교통 */}
          <div>
            <h3 className="mb-2 text-sm font-semibold">대중교통</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
              <li>카카오맵 길찾기에서 버스/택시 경로 확인</li>
              <li>배차·소요시간은 현지 여건에 따라 상이</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 문의 (Inquiry) */}
      <section className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <SectionTitle icon={ICON_IMAGE} as="h2" className="text-2xl">
          문의
        </SectionTitle>
        <div className="grid gap-2 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <span className="inline-block w-16 shrink-0 text-gray-600">
              이메일
            </span>
            <a
              href="mailto:ksafm1@gmail.com"
              className="underline underline-offset-2"
            >
              {ORG.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-16 shrink-0 text-gray-600">
              전화
            </span>
            <a href="tel:07044177125" className="underline underline-offset-2">
              {ORG.phone}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <span className="inline-block w-16 shrink-0 pt-0.5 text-gray-600">
              주소
            </span>
            <span>{ORG.address}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
