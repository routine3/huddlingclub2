// `import type`은 실행 코드에는 포함되지 않고, 설정 객체의 타입을 검사할 때만 사용됩니다.
import type { NextConfig } from "next";

// 현재는 빈 객체이므로 Next.js의 기본 설정을 그대로 사용합니다.
const nextConfig: NextConfig = {};

// Next.js가 개발 서버나 빌드를 시작할 때 이 설정 객체를 읽을 수 있도록 내보냅니다.
export default nextConfig;
