import Link from 'next/link';

export default function Page() {
  // 여기에 공식 문안을 그대로 붙여넣어 사용하세요.
  // 여러 줄 문장을 그대로 붙여넣어도 줄바꿈이 유지되도록 whitespace-pre-line 을 사용합니다.
  const letter = `존경하는 우리 학회 회원 및 학회 참석자 여러분!

  “농업과 산림 및 기상인 모두가 함께 하는 학술축제...
  2025년 한국농림기상학회 하계학술발표대회에 참석해주신 모든 분들께 진심으로 감사드립니다”.
  
  기상학적으로 여름이 시작하는 실록의 계절을 맞이하여 ‘2025년 한국농림기상학회 하계학술발표대회’를 2025년 6월 24일(화)～25일(수) 2일간 ‘미래 농수산인을 양성하는 국내 유일의 농어업 특성화 국립대학, 한국농수산대학교’에서 개최하게 됨을 매우 기쁘게 생각합니다.
  
  먼저, 이번 학술대회를 위해 힘써주신 한국농수산대학교 이주명 총장님을 비롯한 관계자 여러분과 주요 연사님들께 다시 한번 감사드립니다.
  
  이번 하계학술대회는 ‘극한기상에 따른 농림분야 피해와 대책’이라는 주제로 열리며, 이는 이상기상에 의해 현재 농림분야가 직면한 중요한 문제들을 논의하고 해결 방안을 모색하는 데 중요한 역할을 할 것입니다. 이와 더불어 국립농업과학원, 국립기상과학원, 국립산림과학원에서 농업과 산림 및 기상 관련 연구결과를 각각 혹은 공동으로 발표하는 특별세션 4개가 계획되어 있어, 최근 연구동향 및 학문정보를 파악하고 심도 있는 토론과 협업이 이루어지는 뜻깊은 자리가 될 것입니다.
  
  또한 경지미기후, 국지기후, 기상재해, 산림기상, 식물병해충, 생태모형, 영농활용, 탄소저감 등 농림기상 분야의 다양한 연구논문이 구두 및 포스터로 발표될 계획이므로 참석자 여러분의 열띤 토론과 다양한 의견 교환을 통해 새로운 지식과 지혜를 얻고, 학문 발전에 기여할 수 있기를 바랍니다.
  
  그 외에도 학회가 개최되는 한국농수산대학교에서 첨단 기후변화연구시설 탐방 프로그램을 준비하여 기쁜 마음으로 여러분을 초대하오니 많이 참석하시어 유익한 자리가 되시길 바랍니다.
  
  이번 하계학술대회를 통하여 우리 학회가 농업과 산림 및 기상의 협력과 화합의 구심점으로서 농림분야의 극한기상 대책과 농산물 수급안정 등에 기여하기를 기대하며, 특히 ‘학술 축제의 장’이 되도록 최선의 노력을 다하겠습니다.
  
  오늘 학술대회가 성공적으로 마무리될 수 있도록 지혜와 열정을 모아주시고, 앞으로도 우리 모두의 학문적 성장을 위핸 노력해 주시기 부탁드립니다. 다시 한번 학술대회에 참여해주신 모든 분들게 감사드리며, 오늘 학술대회를 통해 얻은 지혜와 경험이 여러분의 삶에 큰 도움이 되기를 기원합니다.`;

  const signature = {
    date: '2025년 6월', // 필요 시 날짜 수정
    organization: '사단법인 한국농림기상학회',
    name: '회 장     심 교 문', // 필요 시 직함/성명 수정
  };

  return (
    <main className='mx-auto max-w-6xl px-4 py-10'>
      {/* breadcrumb */}
      <nav className='mb-6 text-sm text-gray-600' aria-label='breadcrumb'>
        <ol className='flex flex-wrap items-center gap-2'>
          <li>
            <Link href='/' className='hover:underline'>
              홈
            </Link>
          </li>
          <li className='text-gray-400'>/</li>
          <li>
            <span className='text-gray-700'>학술대회 안내</span>
          </li>
          <li className='text-gray-400'>/</li>
          <li aria-current='page' className='font-medium text-indigo-500'>
            초대의 말씀
          </li>
        </ol>
      </nav>

      <section className='rounded-2xl border bg-white p-6 shadow-sm'>
        <article className='prose prose-zinc max-w-none'>
          <p className='whitespace-pre-line leading-7 text-black'>{letter}</p>
        </article>
        <div className='mt-8 space-y-3 text-right text-black text-lg'>
          <p className=''>{signature.date}</p>
          <p className=''>{signature.organization}</p>
          <p className='whitespace-pre-wrap'>{signature.name}</p>
        </div>
      </section>
    </main>
  );
}
