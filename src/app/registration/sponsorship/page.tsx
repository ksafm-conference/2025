// =====================================
// FILE: src/app/exhibition/page.tsx
// 전시/협찬 안내 (root: /exhibition)
// =====================================
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

// 운영/문의: 학회 공식 연락처 (사용자가 제공한 정보)
const CONTACT = {
  email: "ksafm1@gmail.com",
  phone: "070-4417-7125",
};

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
          <li aria-current="page" className="font-medium text-gray-900">
            전시/협찬
          </li>
        </ol>
      </nav>

      <h1 className="mb-6 text-2xl font-bold md:text-3xl">전시/협찬 안내</h1>

      {/* <section className='rounded-2xl border bg-white p-6 shadow-sm'>
        <h2 className='mb-3 text-lg font-semibold'>안내</h2>
        <ul className='list-disc space-y-2 pl-5 text-sm text-gray-800'>
          <li>부스(테이블) 규모/제공 물품/전력 사용 등은 협의 후 확정</li>
          <li>협찬(스폰서십) 등급/혜택은 사무국과 조율</li>
          <li>프로그램북/웹사이트 로고 노출 가능</li>
        </ul>
      </section> */}

      <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-2xl font-semibold">문의</h2>
        <div className="space-y-2 text-xl text-gray-800">
          <p className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" /> {CONTACT.email}
          </p>
          <br />

          <p className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4" /> {CONTACT.phone}
          </p>
        </div>
      </section>
    </main>
  );
}
