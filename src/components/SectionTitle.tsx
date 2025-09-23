// FILE: src/components/SectionTitle.tsx
import clsx from 'clsx';
import { asset } from "@/lib/paths";

type Props = {
  icon: string; // "/icon/png/xxx.png"
  children: React.ReactNode; // 제목 텍스트
  as?: 'h1' | 'h2' | 'h3'; // 기본 h2
  size?: number; // 아이콘 px 크기 (기본 20)
  className?: string; // 추가 클래스
  alt?: string; // 아이콘 대체텍스트 (장식용이면 빈 문자열)
};

export default function SectionTitle({
  icon,
  children,
  as = 'h2',
  size = 22,
  className,
  alt = '',
}: Props) {
  const Tag = as;
  return (
    <Tag className={clsx('mb-3 flex items-center gap-1 align-middle font-semibold', className)}>
      <img
        src={asset(icon)}               // ← 여기! 절대경로를 안전하게 변환
        alt={alt}
        width={size}
        height={size}
        className='inline-block align-[-0.125em]'
        aria-hidden={alt === '' ? true : undefined}
        loading='lazy'
      />
      {children}
    </Tag>
  );
}
