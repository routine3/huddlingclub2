export type StatCardProps = {
  label?: string;
  value?: string | number;
  highlight?: boolean;
  className?: string;
};

export default function StatCard({ label = "참석", value = 0, highlight = false, className }: StatCardProps) {
  return (
    <article className={[
      "flex min-w-[var(--size-stat-card)] flex-col items-center gap-inline-sm rounded-card px-control-x py-stack-md",
      highlight ? "bg-info-subtle" : "bg-surface-subtle",
      className,
    ].filter(Boolean).join(" ")}>
      <span className="typography-caption-md text-text-secondary">{label}</span>
      <strong className={["typography-title-lg", highlight ? "text-info-strong" : "text-text-strong"].join(" ")}>{value}</strong>
    </article>
  );
}
