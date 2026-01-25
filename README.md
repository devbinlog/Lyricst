# Lyricst

음악을 듣는 경험에서 확장하여 가사 감정/스토리에 몰입하는 스트리밍 UX를 제안한 웹 프로토타입입니다.  
공모전(3인 팀)에서 팀장/기획/프론트엔드로 참여해, 가사 크롤링과 번역 파이프라인을 연결해 구현했습니다.

- 형태: Contest Project (Team of 3)
- 기간: 2023.11(약 한 달)
- 결과 2023 디지털 창의인재 경진대회 우수상(총장상) - 전주대학교
  
## 주요 기능

- 아티스트 검색: 가수 이름으로 검색하여 아티스트 정보 및 앨범 목록 확인
- 가사 조회: 멜론에서 곡의 가사 정보를 가져와 표시
- 이미지 기반 디자인: 앨범 이미지의 색상을 추출하여 동적 UI 생성
- AI 곡 추천: 가사를 기반으로 AI가 유사한 곡을 추천
 
## 구현 포인트

- 가사 크롤링/번역 파이프라인을 연결해 “검색 → 가사 → 번역” 흐름을 완성
- 사용 API 조건에 따라 차이는 있으나, 최신곡도 1~3개월 내 검색 가능한 수준까지 동작하도록 구성
- 앨범 이미지 색상 추출 기반의 동적 UI(시각적 몰입 강화)

## 기술 스택

- Frontend: Next.js 14, React 18, TypeScript
- Backend: Next.js API Routes
- 스타일링: CSS Modules
- 외부 API: 
  - PaLM API (AI 추천)
  - ManiaDB API (아티스트 정보)
  - Melon (가사 정보)

## 설치 방법

```bash
npm install
```

## 실행 방법

```bash
npm run dev
```

## 프로젝트 구조

```
src/
├── pages/
│   ├── api/          # API 라우트 (백엔드)
│   │   ├── ai.ts     # AI 곡 추천 API
│   │   ├── artist.ts # 아티스트 정보 API
│   │   └── lyrics.ts # 가사 정보 API
│   ├── modules/      # 재사용 가능한 컴포넌트
│   │   └── Nav.tsx   # 네비게이션 바
│   ├── types/        # TypeScript 타입 정의
│   │   └── type.ts
│   ├── index.tsx     # 홈 페이지
│   ├── search.tsx    # 검색 결과 페이지
│   └── view.tsx      # 가사 상세 페이지
└── styles/           # CSS 모듈 파일들
```

## 사용된 라이브러리

- `next`: Next.js 프레임워크
- `react`: React 라이브러리
- `typescript`: TypeScript 지원
- `palm-api`: PaLM AI API 클라이언트
- `cheerio`: HTML 파싱 및 스크래핑
- `node-fetch`: 서버 사이드 HTTP 요청
- `xml-js`: XML to JSON 변환
- `colorthief`: 이미지에서 색상 추출
- `framer-motion`: 애니메이션 라이브러리

## 개발자

김태빈(팀리더/기획/프론트엔드), 성민우(기획/백엔드), 이우진(기획/프론트엔드)
