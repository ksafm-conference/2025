import Link from "next/link";
import { asset } from "@/lib/paths";
import AutoSplitLetter from "@/components/AutoSplitLetter";

export default function Page() {
  const letter = `사랑하는 회원님!

학문과 낭만이 만나는 아름다운 도시, 여수에서 2025년 한국농림기상학회 동계학술대회를 개최하게 되어 진심으로 기쁘게 생각하며, 뜻깊은 자리에 함께 해주신 모든 분께 환영의 인사를 전합니다.
먼저, 우리 학회의 굳건한 기둥이 되어주신 명예 및 전임 회장님을 비롯한 모든 회원님께 깊이 감사드립니다. 아울러, 귀한 시간을 내어 초청 강연을 맡아 주실 전남대학교 박태원 교수님, 서울대학교 김광수 교수님, 국립생태원 서창완 연구실장님께 특별히 감사의 말씀을 드립니다. 세 분의 고견은 이번 학술대회의 학문적 깊이를 더해줄 것입니다.

지금 전 세계는 기후변화가 초래하는 홍수, 가뭄, 불볕더위 등 극한 기상 현상으로 고통받고 있습니다. 우리나라도 최근 극심한 더위와 기록적인 호우를 연달아 겪으며 그 영향을 실감하고 있습니다. 이처럼 극한 기상의 빈도와 강도가 날로 증폭되는 엄중한 시기에, 농업기상학과 산림기상학 전반에 걸친 이론과 기술의 연구, 그 응용과 보급을 다루는 우리 학회의 사회적 역할은 더욱 중차대해졌습니다.

이번 동계학술대회는 이러한 시대적 요구에 부응하여, 2개의 특별 세션을 포함해 총 80여 편의 구두 및 포스터 발표가 이틀 동안 펼쳐지는 풍성한 학술 토론의 장이 될 것입니다.
특히, 첫날 마련된 특별 초청 강연에서는 “한국 기후위기 평가보고서 2025”의 주요 집필진들을 모시고 한반도 기후 위기의 과학적 근거와 농업을 포함한 생태계 영향 분석, 그리고 실질적인 적응전략을 심도 있게 청취하는 소중한 시간을 갖습니다. 이 자리를 통해 한반도 기후 위기 연구와 적응전략 수립에 있어 우리 학회가 나아가야 할 핵심적인 역할과 미래 방향을 모색하는 뜻깊은 기회가 되기를 진심으로 바랍니다.

우리 학회는 26년의 역사 속에서 회원 수 150명 규모로 꾸준히 성장해 왔으며, 최근에는 농업, 산림, 기상 분야의 선도적인 연결과 융합을 통해 기후위기 대응을 이끌고 농림산업의 회복력 강화를 위한 전문성과 실천력을 더욱 키워가고 있습니다. 이러한 노력의 결실로, 올해는 이상기상 현상에 능동적으로 대응하고 농작물의 기상재해 피해를 줄이기 위한 ‘농업기상재해 조기경보서비스’를 울릉도를 제외한 전국 155개 시군으로 확대하는 괄목할 만한 성과를 이루었습니다. 이는 2016년 3개 시군 서비스 개시 후 10년 만에 일구어낸 쾌거이며, 우리 학회 회원들의 헌신적인 연구와 노력이 없었다면 불가능했을 것입니다. 관련된 다수의 혁신적인 연구 내용이 이번 학술대회에서 발표되는 것은 매우 자랑스러운 일입니다. 이처럼 우리 학회는 학문적 성과를 농산촌 현장에 보급하는 실천력에서 탁월한 모범을 보이고 있습니다.
이제 더 큰 시대적 책임과 도약을 위해 우리 모두가 함께 지혜를 모으고 힘차게 뛰어야 할 때입니다!

이번 학술대회가 성공적으로 개최될 수 있도록 밤낮없이 노고를 아끼지 않으신 학술이사님과 총무이사님, 그리고 학회 사무국에 진심으로 감사드립니다. 또한, 우리 학회의 활동에 물심양면으로 아낌없는 지원을 해주고 계시는 국가농림기상센터에도 깊은 감사를 표합니다.

본 학술대회가 회원님들의 우수한 연구 성과를 공유하고 열띤 학술적 토론을 꽃피우며, 동시에 허물없이 친교를 다지는 따뜻한 화합의 장이 되기를 간절히 기원합니다.

감사합니다.`;

  const signature = {
    organization: "(사) 한국농림기상학회 제14대 회장 ",
    name: "심 교 문    드 림 ",
  };

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
            <span className="text-gray-700">학술대회 안내</span>
          </li>
          <li className="text-gray-400">/</li>
          <li aria-current="page" className="font-medium text-indigo-500">
            초대의 말씀
          </li>
        </ol>
      </nav>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <AutoSplitLetter text={letter} imageSrc={asset("/files/sim.jpg")} />

        <div className="mt-8 space-y-3 text-right text-black text-lg">
          <p>{signature.organization}</p>
          <p className="whitespace-pre-wrap font-bold text-3xl text-gray-700">
            {signature.name}
          </p>
        </div>
      </section>
    </main>
  );
}
