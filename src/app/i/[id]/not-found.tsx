import NavBar from "@/components/NavBar";

export default function InvitationNotFound() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <NavBar title="초대장" />
      <section className="px-page-horizontal py-cover-inset text-center">
        <h1 className="typography-title-lg text-text-strong">초대장을 찾을 수 없어요</h1>
        <p className="mt-stack-sm typography-body-md text-text-secondary">
          링크가 정확한지 다시 확인해 주세요.
        </p>
      </section>
    </main>
  );
}
