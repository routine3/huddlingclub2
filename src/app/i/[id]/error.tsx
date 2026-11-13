"use client";

import Button from "@/components/Button";
import NavBar from "@/components/NavBar";

export default function InvitationError({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <NavBar title="초대장" />
      <section className="px-page-horizontal py-cover-inset text-center">
        <h1 className="typography-title-lg text-text-strong">정보를 불러오지 못했어요</h1>
        <p className="mt-stack-sm typography-body-md text-text-secondary">
          잠시 후 다시 시도해 주세요.
        </p>
        <Button className="mt-stack-lg w-full" onClick={reset} size="lg">
          다시 시도하기
        </Button>
      </section>
    </main>
  );
}
