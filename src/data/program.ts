export type Speaker = {
  name: string;
  title?: string; // 직함
  affiliation?: string; // 소속
  email?: string;
  photo?: string;
};

// 👉 이미지는 /public/speakers 폴더에 넣고, photo 경로에 파일명을 지정하세요.
export const SPEAKERS = [
  {
    name: '홍길동',
    title: '교수',
    affiliation: '한국농수산대학교',
    // email: 'hong@af.ac.kr',
    // photo: '/speakers/hong.jpg',
    field: '농업분야', // 단일 분야
  },
  {
    name: '홍길동',
    title: '교수',
    affiliation: '한국농수산대학교',
    // email: 'hong@af.ac.kr',
    // photo: '/speakers/hong.jpg',
    field: '산림분야', // 단일 분야
  },
  {
    name: '김길동',
    title: '선임연구원',
    affiliation: 'A연구원',
    // photo: '/speakers/kim.jpg',
    fields: ['농업분야', '기상분야'],
  },
  {
    name: '이길동',
    title: '선임연구원',
    affiliation: 'A연구원',
    // photo: '/speakers/kim.jpg',
    fields: ['수문기상', '기후변화'], // 여러 분야
  },
];
