export type SuccessIconProps = { className?: string };

export default function SuccessIcon({ className }: SuccessIconProps) {
  return (
    <span className={[
      "inline-flex size-[var(--size-success-icon)] items-center justify-center rounded-pill bg-info-subtle",
      className,
    ].filter(Boolean).join(" ")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" aria-hidden="true" className="size-[var(--size-icon-lg)]" src="/icons/success-check.svg" />
    </span>
  );
}
