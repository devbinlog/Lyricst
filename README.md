# Lyricst

가사와 이미지를 활용한 음악 서비스 웹 애플리케이션입니다.

## 주요 기능

- 🎵 **아티스트 검색**: 가수 이름으로 검색하여 아티스트 정보 및 앨범 목록 확인
- 📝 **가사 조회**: 멜론에서 곡의 가사 정보를 가져와 표시
- 🎨 **이미지 기반 디자인**: 앨범 이미지의 색상을 추출하여 동적 UI 생성
- 🤖 **AI 곡 추천**: 가사를 기반으로 AI가 유사한 곡을 추천

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **스타일링**: CSS Modules
- **외부 API**: 
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

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

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

김태빈, 성민우, 이우진
