// `import type`은 실행 코드에는 포함되지 않고, 설정 객체의 타입을 검사할 때만 사용됩니다.
import type { NextConfig } from "next";

// 보안 업데이트가 필요할 때 Next.js가 업그레이드 안내를 표시합니다.
const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
};

// Next.js가 개발 서버나 빌드를 시작할 때 이 설정 객체를 읽을 수 있도록 내보냅니다.
export default nextConfig;
