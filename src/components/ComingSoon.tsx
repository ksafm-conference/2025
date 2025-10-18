// FILE: src/components/ComingSoon.tsx
import clsx from "clsx";

type Props = {
  /** 가운데 큰 제목 (기본: "페이지 준비중입니다.") */
  title?: string;
  /** 강조(진한 남색)로 보일 단어 (기본: "준비중") */
  highlight?: string;
  /** 안내문 1,2 줄 */
  subtitle1?: string;
  subtitle2?: string;
  /** 바깥 컨테이너 className (페이지 높이/여백 조절용) */
  className?: string;
};

export default function ComingSoon({
  title = "페이지 준비중입니다.",
  highlight = "준비중",
  subtitle1 = "보다 나은 서비스를 제공하기 위하여 페이지 준비중에 있습니다.",
  subtitle2 = "빠른 시일 내에 준비하여 찾아뵙겠습니다.",
  className,
}: Props) {
  // 제목에서 highlight에 해당하는 부분만 진한 남색으로 강조
  const parts = title.split(highlight);

  return (
    <section
      className={clsx(
        "flex w-full flex-col items-center justify-center text-center",
        "px-4 py-16 md:py-24",
        className
      )}
      aria-label="페이지 준비중 안내"
    >
      {/* 로딩 스피너 */}
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        {/* 심플 스피너 (회전 원) */}
        <span className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-500" />
      </div>

      {/* 제목 */}
      <h1 className="mb-3 text-2xl font-semibold leading-tight text-gray-800 md:text-3xl">
        {parts[0]}
        <span className="font-extrabold text-[#123D5B]">{highlight}</span>
        {parts[1] ?? ""}
      </h1>

      {/* 보조 문구 */}
      <p className="text-sm leading-relaxed text-gray-600 md:text-base">
        {subtitle1}
        <br />
        {subtitle2}
      </p>
    </section>
  );
}
