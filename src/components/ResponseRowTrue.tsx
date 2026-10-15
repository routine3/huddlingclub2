import AttendanceBadge from "./AttendanceBadge";

export type ResponseRowTrueProps = {
  name?: string;
  meta?: string;
  className?: string;
};

export default function ResponseRowTrue({ name = "김허들", meta = "010-****-1234 · 굿즈 M", className }: ResponseRowTrueProps) {
  return (
    <article className={[
      "flex h-[var(--size-response-row)] w-full max-w-[var(--size-content-card)] items-center justify-between gap-stack-sm rounded-card border border-border-subtle bg-surface-default p-stack-md",
      className,
    ].filter(Boolean).join(" ")} data-figma-name="ResponseRow/true">
      <div className="min-w-0">
        <h3 className="truncate typography-label-lg text-text-strong">{name}</h3>
        <p className="mt-inline-sm typography-caption-md text-text-secondary">
          {meta}
        </p>
      </div>
      <AttendanceBadge status="yes" />
    </article>
  );
}
