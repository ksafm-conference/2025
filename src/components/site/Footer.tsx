// FILE: src/components/site/Footer.tsx
import Link from 'next/link';
import { nav, externalLinks } from '@/data/nav';

export default function Footer() {
  const about = nav.find((n) => !('href' in n) && n.label.includes('학술대회'));
  const program = nav.find((n) => !('href' in n) && n.label.includes('프로그램'));
  const submission = nav.find((n) => !('href' in n) && n.label.includes('초록'));
  const registration = nav.find((n) => !('href' in n) && n.label.includes('참가'));
  const venue = nav.find((n) => 'href' in n && n.label.includes('오시는 길'));

  // 줄바꿈 그대로 + 가운데 정렬
  const societyInfo = `(사단법인) 한국농림기상학회 | Korean Society of Agricultural and Forest Meteorology
대표자: 심교문 | 주소: (08826) 서울특별시 관악구 관악로 1 서울대학교 36동 108호
사업자번호 : 135-82-07829 | 전화 : 070-4417-7125 | 이메일 : ksafm1@gmail.com`;

  return (
    <footer className='mt-10 border-t bg-gray-50'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        {/* 학회 정보 (가운데 정렬, 여러 줄 허용) */}
        <div className='mb-8 text-center'>
          <p className='whitespace-pre-line text-[13px] leading-6 text-gray-800'>{societyInfo}</p>
        </div>

        {/* 빠른 메뉴: 전부 '가운데 정렬' */}
        <div
          className='
            grid gap-8
            grid-cols-2 sm:grid-cols-3 md:grid-cols-5
            justify-items-center          /* 컬럼 자체를 가운데 정렬 */
            text-center                   /* 내부 텍스트/링크 가운데 */
          '>
          {/* 학술대회 안내 */}
          <div className='w-full max-w-[220px]'>
            <h4 className='mb-2 text-[13px] font-semibold text-gray-900'>학술대회 안내</h4>
            <ul className='space-y-1 text-[13px] text-gray-700'>
              {about &&
                'items' in about &&
                about.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className='inline-block hover:underline'>
                      {i.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* 프로그램 */}
          <div className='w-full max-w-[220px]'>
            <h4 className='mb-2 text-[13px] font-semibold text-gray-900'>프로그램</h4>
            <ul className='space-y-1 text-[13px] text-gray-700'>
              {program &&
                'items' in program &&
                program.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className='inline-block hover:underline'>
                      {i.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* 초록제출/발표안내 */}
          <div className='w-full max-w-[220px]'>
            <h4 className='mb-2 text-[13px] font-semibold text-gray-900'>초록제출/발표안내</h4>
            <ul className='space-y-1 text-[13px] text-gray-700'>
              {submission &&
                'items' in submission &&
                submission.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className='inline-block hover:underline'>
                      {i.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* 참가 등록 */}
          <div className='w-full max-w-[220px]'>
            <h4 className='mb-2 text-[13px] font-semibold text-gray-900'>참가 등록</h4>
            <ul className='space-y-1 text-[13px] text-gray-700'>
              {registration &&
                'items' in registration &&
                registration.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className='inline-block hover:underline'>
                      {i.label}
                    </Link>
                  </li>
                ))}
              <li>
                <a
                  href={externalLinks.registration}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block hover:underline'>
                  온라인 등록 바로가기
                </a>
              </li>
            </ul>
          </div>

          {/* 오시는 길 */}
          <div className='w-full max-w-[220px]'>
            <h4 className='mb-2 text-[13px] font-semibold text-gray-900'>오시는 길</h4>
            <ul className='space-y-1 text-[13px] text-gray-700'>
              {venue && 'href' in venue && (
                <li>
                  <Link href={venue.href} className='inline-block hover:underline'>
                    {venue.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 최하단 카피라이트 */}
      <div className='border-t bg-white'>
        <div className='mx-auto flex max-w-6xl items-center justify-center px-4 py-6 text-[12px] text-gray-600'>
          <p className='text-center uppercase tracking-tight'>
            COPYRIGHT KOREAN SOCIETY OF AGRICULTURAL AND FOREST METEOROLOGY ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
