# AGENTS.md

이 문서는 `docs/prd.md`를 기준으로 이 프로젝트에서 작업하는 AI 에이전트가 따라야 할 지침이다. PRD와 이 문서가 충돌하면 임의로 결정하지 말고 사용자에게 질문한다.

## 사용자

- 이 서비스는 코딩 초보자가 만드는 프로젝트다.
- 답변과 설명은 기본적으로 한국어로 작성한다.
- 코드 변경 후에는 무엇을 바꿨는지, 왜 바꿨는지, 어떻게 실행하고 확인하는지를 쉬운 표현으로 설명한다.
- 전문 용어가 필요하면 처음 등장할 때 짧게 뜻을 설명한다.
- 사용자가 요청하지 않은 복잡한 추상화, 과도한 최적화, 대규모 리팩터링을 피한다.
- 한 번에 이해하고 수정하기 쉬운 작고 명확한 코드와 폴더 구조를 우선한다.
- 요구사항이 없거나 여러 해석이 가능한 부분은 임의로 정하지 말고 구현 전에 사용자에게 질문한다.
- 사용자가 코드 파일 경로를 주며 코드 설명이나 한국어 주석을 요청하면 `skills/korean-code-comments/SKILL.md`를 읽고 해당 스킬을 자동 적용한다.

## 기술 스택 (변경 금지)

아래 기술 스택은 사용자의 명시적인 승인 없이 교체하거나 주요 버전을 변경하지 않는다.

- 프레임워크: Next.js 16 App Router
- 언어: TypeScript 5 (`strict` 유지)
- UI: React 19
- 스타일: Tailwind CSS v4
- 데이터베이스 및 백엔드: Supabase
- 배포: Vercel
- 패키지 관리자: npm
- 소스 디렉터리: `src/`
- 경로 별칭: `@/*` → `src/*`

기본 명령어는 다음과 같다.

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Turbopack을 사용할 수 없는 실행 환경에서는 다음 명령으로 검증할 수 있다.

```bash
npm run dev -- --webpack
npm run build -- --webpack
```

- 새 라이브러리는 현재 기술 스택만으로 해결하기 어려운 경우에만 추가한다.
- 새 라이브러리나 기술을 도입하기 전에 사용자에게 필요성과 영향을 쉽게 설명하고 확인받는다.
- TypeScript에서 특별한 이유 없이 `any`를 사용하지 않는다.
- 기본적으로 Server Component를 사용하고, 상태·이벤트·브라우저 API가 필요한 경우에만 `"use client"`를 추가한다.
- Supabase 연동에 필요한 구체적인 SDK 구성, 스키마 또는 배포 환경이 정해지지 않았다면 사용자에게 먼저 질문한다.

## 디자인 규칙

- 최종 디자인은 추후 사용자가 제공하는 Figma 디자인을 Figma MCP로 확인한 뒤 구현한다.
- Figma 디자인이 제공되기 전에는 임의의 브랜드 색상, 폰트, 이미지, 장식적인 UI 또는 완성형 디자인 시스템을 확정하지 않는다.
- 디자인이 없는 상태에서는 기능 확인에 필요한 최소한의 레이아웃과 Tailwind CSS v4 유틸리티만 사용한다.
- Figma 구현 시 프레임 크기, 여백, 색상, 타이포그래피, 컴포넌트 상태와 반응형 동작을 가능한 한 정확히 따른다.
- 디자인과 PRD가 충돌하거나 Figma에 없는 상태가 필요하면 추측하지 말고 사용자에게 질문한다.
- 모바일 웹 초대장 서비스이므로 모바일 화면을 우선 구현하되, 데스크톱에서도 내용이 깨지지 않게 한다.
- 시맨틱 HTML을 사용하고 키보드 조작, 명확한 레이블, 충분한 색상 대비 등 기본 접근성을 지킨다.
- 전역 스타일과 디자인 토큰은 `src/app/globals.css`에서 관리한다.
- Tailwind CSS v4의 CSS 기반 설정을 우선하며, 필요하지 않다면 `tailwind.config.*`를 추가하지 않는다.

## 서비스 구조

이 서비스는 정보를 입력하면 5분 안에 모바일 웹 초대장을 만들고, 링크로 공유하고, 참석 여부를 받을 수 있는 서비스다. 호스트와 게스트 모두 로그인 없이 링크로 사용한다.

### 핵심 화면과 경로

- `/create`: 호스트가 제목, 일시, 장소, 본문을 입력하고 실시간 미리보기를 확인한 뒤 초대장을 발행한다.
- 발행 완료 상태: 초대장 링크와 응답 현황 링크를 보여주고 각각 복사할 수 있게 한다.
- `/i/[id]`: 게스트가 초대장을 보고 이름, 참석 여부, 동반 인원을 제출한다.
- `/i/[id]/responses`: 응답 목록, 참석·불참 수, 참석 인원 합계를 보여준다.
- 응답 현황 페이지는 별도 로그인이나 비밀 토큰 없이 누구나 접근할 수 있다. 이는 사용자가 명시적으로 결정한 공개 정책이다.

### 데이터와 기능

- 초대장과 참석 응답 데이터는 Supabase에 저장한다.
- 초대장 발행 시 순차 번호 대신 추측하기 어려운 고유 ID를 생성한다.
- 장소는 MVP에서 지도 연동 없이 주소를 텍스트로 표시한다.
- 응답 제출 후에는 중복 제출을 유도하지 않는 명확한 완료 화면을 보여준다.
- 참석 인원 합계의 계산 방식은 `참석 응답자 본인 + 동반 인원`을 기본으로 한다. 요구사항이 달라질 수 있다면 구현 전에 사용자에게 확인한다.

### 권장 코드 구조

- 페이지와 레이아웃: `src/app/`
- 재사용 UI 컴포넌트: `src/components/`
- Supabase 클라이언트와 공통 로직: `src/lib/`
- 공통 타입: `src/types/`
- 정적 파일: `public/`
- 서버 전용 코드는 클라이언트 컴포넌트에서 가져올 수 없는 위치와 이름으로 명확히 구분한다.

### MVP 제외 범위

다음 기능은 사용자가 별도로 요청하지 않는 한 만들지 않는다.

- 로그인과 회원가입
- 결제
- 네이티브 앱
- 드래그 기반 편집
- 축의금 송금
- AI 콘텐츠 생성
- 다국어 지원

## 안전 규칙

- 사용자의 기존 코드와 데이터를 보존하고, 관련 없는 파일을 수정하거나 삭제하지 않는다.
- `.env*`, Supabase 키, 비밀번호와 같은 비밀값을 코드나 저장소에 기록하지 않는다.
- Supabase의 `service_role` 키는 절대 브라우저에 노출하지 않는다. 클라이언트에는 공개용 anon 키만 사용한다.
- Supabase URL과 공개용 anon 키는 Vercel 환경 변수로 관리하며 저장소에 커밋하지 않는다.
- Vercel의 Production 환경 변수와 Preview/Development 환경 변수를 구분하고, 실제 운영 데이터베이스 자격 증명을 미리보기 배포에 불필요하게 노출하지 않는다.
- 공개용 anon 키를 사용하더라도 Supabase Row Level Security(RLS)를 활성화하고 필요한 작업만 허용하는 정책을 작성한다.
- 응답 현황 페이지가 공개되어 있으므로 주민등록번호, 전화번호, 이메일, 주소 등 불필요한 개인정보를 수집하지 않는다. MVP에서는 PRD에 명시된 이름, 참석 여부, 동반 인원만 저장한다.
- 응답 현황이 누구나 볼 수 있다는 사실을 화면에서 사용자와 게스트가 이해할 수 있게 안내한다.
- 모든 폼 입력은 서버에서 다시 검증하고 길이, 자료형, 허용 범위를 제한한다.
- 데이터베이스 오류나 내부 식별자, 환경 변수, 스택 트레이스를 사용자 화면에 그대로 노출하지 않는다.
- 초대장 ID는 암호학적으로 안전하고 추측하기 어려운 값으로 생성한다.
- 공개 쓰기 기능에는 과도한 요청과 스팸을 줄이기 위한 기본적인 요청 제한 또는 동등한 보호를 고려한다. 구체적인 방식이나 외부 서비스 도입이 필요하면 사용자에게 질문한다.
- 데이터 삭제, 스키마 파괴, 대량 수정처럼 되돌리기 어려운 작업은 실행 전에 대상과 영향을 확인하고 사용자 승인을 받는다.
- 기능 변경 후 최소한 `npm run lint`와 `npm run build -- --webpack`을 실행한다. 실행 환경 때문에 검증할 수 없으면 그 이유를 명확히 보고한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
