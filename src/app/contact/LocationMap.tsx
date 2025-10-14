// FILE: src/components/LocationMap.tsx
"use client";

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useMemo, useRef, useState } from "react";
import AddMapCustomControlStyle from "./AddMapCustomControl.style";

type LatLng = { lat: number; lng: number };
type BigViewParams = {
  srcid: number | string;
  itemId: number | string;
  q: string; // 검색어 (예: "여수베네치아호텔&리조트")
  urlX: number | string; // 예: 672126.0
  urlY: number | string; // 예: 347876.0
  mapType?: "TYPE_MAP" | "TYPE_SKYVIEW";
};

interface Props {
  title?: string;
  point: LatLng;
  initLevel?: number;
  bigView?: BigViewParams;
}

export default function LocationMap({
  title = "목적지",
  point,
  initLevel = 4,
  bigView,
}: Props) {
  useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY ?? "",
    libraries: ["services"],
  });

  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const initCenterRef = useRef<kakao.maps.LatLng | null>(null);
  const initLevelRef = useRef<number>(initLevel);

  // 길찾기(좌표 기반)
  const directionsUrl = useMemo(
    () =>
      `https://map.kakao.com/link/to/${encodeURIComponent(title)},${
        point.lat
      },${point.lng}`,
    [title, point.lat, point.lng]
  );

  // 지도 크게 보기
  const bigViewUrl = useMemo(() => {
    if (!bigView) return directionsUrl;
    const mt = bigView.mapType ?? "TYPE_MAP";
    const q = encodeURIComponent(bigView.q);
    return (
      `https://map.kakao.com/?map_type=${mt}&from=roughmap` +
      `&srcid=${bigView.srcid}&itemId=${bigView.itemId}` +
      `&q=${q}&urlX=${bigView.urlX}&urlY=${bigView.urlY}`
    );
  }, [bigView, directionsUrl]);

  const resetView = () => {
    if (!map || !initCenterRef.current) return;
    map.setLevel(initLevelRef.current);
    map.setCenter(initCenterRef.current);
  };

  return (
    // ✅ 래퍼: 스크롤 시 컨트롤이 밖으로 안 튀게 클리핑 컨텍스트 생성
    <div className="map_wrap relative isolate h-[350px] overflow-hidden lg:h-[550px]">
      <AddMapCustomControlStyle />

      {/* 지도 본체 */}
      <Map
        id="map"
        center={point}
        level={initLevel}
        onCreate={(m) => {
          setMap(m);
          initCenterRef.current = new kakao.maps.LatLng(point.lat, point.lng);
          initLevelRef.current = initLevel;
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <MapMarker
          position={point}
          onClick={() => window.open(directionsUrl, "_blank")}
        >
          <div
            onClick={() => window.open(directionsUrl, "_blank")}
            className="relative -inset-0.5 w-[110%] cursor-pointer rounded bg-blue-500 p-2 text-center text-white hover:bg-blue-600"
          >
            {title}
          </div>
        </MapMarker>
      </Map>

      {/* ✅ 확대/축소 컨트롤 (래퍼 기준 절대배치) */}
      <div className="custom_zoomcontrol radius_border absolute right-2 top-[50px] z-[2] bg-[#f5f5f5]">
        {/* + */}
        <span
          onClick={() => {
            if (!map) return;
            const lv = map.getLevel();
            if (lv > 1) map.setLevel(lv - 1);
          }}
          role="button"
          aria-label="확대"
          title="확대"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>

        {/* - */}
        <span
          onClick={() => {
            if (!map) return;
            map.setLevel(map.getLevel() + 1);
          }}
          role="button"
          aria-label="축소"
          title="축소"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>

      {/* ✅ 초기화 버튼 (줌 컨트롤 아래 정렬) */}
      <div
        className="radius_border absolute right-2 top-[135px] z-[2] bg-[#f5f5f5]"
        style={{ width: 36, height: 40, overflow: "hidden" }}
      >
        <span
          onClick={resetView}
          role="button"
          aria-label="초기화"
          title="초기화"
          style={{
            display: "block",
            width: 36,
            height: 40,
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {/* refresh icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="#333"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: 15,
              height: 15,
              margin: "12px 0",
              display: "inline-block",
            }}
            aria-hidden="true"
          >
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
            <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </span>
      </div>

      {/* ✅ 하단 바 (로고/길찾기/크게보기) */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] flex justify-between overflow-hidden rounded-b border border-gray-200 bg-gray-100 px-1.5 py-1 text-xs">
        <button
          onClick={() => window.open("https://map.kakao.com/", "_blank")}
          type="button"
        >
          <img
            src="https://t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
            className="h-[16px] w-[72px]"
            alt="KakaoMap"
          />
        </button>
        <div className="flex items-center">
          <button
            onClick={() => window.open(directionsUrl, "_blank")}
            type="button"
            className="hover:underline"
          >
            길찾기
          </button>
          <span className="relative top-0.5 mx-2 my-0 h-2.5 w-px border-l border-l-gray-300" />
          <button
            onClick={() => window.open(bigViewUrl, "_blank")}
            type="button"
            className="hover:underline"
          >
            지도 크게 보기
          </button>
        </div>
      </div>
    </div>
  );
}
