export type EmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function EmptyState({ title = "아직 응답이 없어요", description = "초대장 링크를 공유하면 응답이 여기에 쌓여요.", className }: EmptyStateProps) {
  return (
    <section className={[
      "flex w-full max-w-[var(--size-content-card)] flex-col items-center gap-inline-md rounded-card bg-surface-subtle px-page-horizontal py-section-lg text-center",
      className,
    ].filter(Boolean).join(" ")}>
      <h2 className="typography-heading-md text-text-strong">{title}</h2>
      <p className="typography-body-md text-text-tertiary">{description}</p>
    </section>
  );
}
