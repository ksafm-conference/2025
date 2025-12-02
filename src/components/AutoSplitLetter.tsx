"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  imageSrc: string;
}

export default function AutoSplitLetter({ text, imageSrc }: Props) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const [imgHeight, setImgHeight] = useState(0);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const splitText = () => {
    const img = imgRef.current;
    const rightCol = rightColRef.current;
    const measure = measureRef.current;

    if (!img || !rightCol || !measure) return;

    const h = img.getBoundingClientRect().height;
    const rightColWidth = rightCol.getBoundingClientRect().width;

    console.log("이미지 높이:", h, "오른쪽 컬럼 너비:", rightColWidth);

    if (h <= 0 || rightColWidth <= 0) return;

    setImgHeight(h);

    // 측정용 div 스타일 설정
    measure.style.width = `${rightColWidth}px`;
    measure.style.whiteSpace = "pre-wrap";
    measure.style.wordBreak = "break-word";
    // measure.style.lineHeight = "1.8"; // 줄 간격 동일하게 적용
    measure.innerText = "";

    let bestSplit = 0;

    // 한 글자씩 추가하면서 높이 체크
    for (let i = 0; i < text.length; i++) {
      measure.innerText = text.slice(0, i + 1);

      const currentHeight = measure.scrollHeight;

      // 이미지 높이를 넘어서는 순간
      if (currentHeight > h) {
        // 이전 위치가 최적의 분리점
        break;
      }

      bestSplit = i + 1;
    }

    console.log("분리 위치:", bestSplit, "전체 길이:", text.length);

    if (bestSplit > 0) {
      const top = text.slice(0, bestSplit).trim();
      const bottom = text.slice(bestSplit).trim();

      console.log("상단 텍스트 길이:", top.length);
      console.log("하단 텍스트 길이:", bottom.length);

      setTopText(top);
      setBottomText(bottom);
    } else {
      // 한 글자도 못 들어가는 경우
      setTopText("");
      setBottomText(text);
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      // 레이아웃이 안정화될 때까지 대기
      setTimeout(() => {
        splitText();
      }, 100);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }

    const handleResize = () => {
      splitText();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [text]);

  return (
    <div className="w-full">
      {/* 1행: 이미지 + topText */}
      <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start w-full">
        {/* LEFT: IMAGE */}
        <div className="lg:w-1/3 w-full flex-shrink-0">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="President"
            className="w-full object-contain"
            style={{ maxHeight: 500 }}
          />
        </div>

        {/* RIGHT: topText */}
        <div
          ref={rightColRef}
          className="lg:w-2/3 w-full mt-4 lg:mt-0 text-lg lg:text-xl whitespace-pre-wrap"
          style={{
            minHeight: imgHeight > 0 ? imgHeight : "auto",
          }}
        >
          {topText}
        </div>
      </div>

      {/* 측정용 hidden box */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="fixed pointer-events-none text-lg lg:text-xl"
        style={{
          visibility: "hidden",
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      />

      {/* 2행: bottomText (전체 폭) */}
      {bottomText && (
        <div className="w-full text-lg lg:text-xl whitespace-pre-wrap mt-2">
          {bottomText}
        </div>
      )}
    </div>
  );
}
