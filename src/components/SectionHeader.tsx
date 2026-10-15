export type SectionHeaderProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  showSubtitle?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  inverse?: boolean;
  className?: string;
};

export default function SectionHeader({ subtitle = "Subtitle", title = "title", description = "Description", showSubtitle = true, showTitle = true, showDescription = true, inverse = false, className }: SectionHeaderProps) {
  return (
    <header className={[
      "flex w-full max-w-[var(--size-section-header)] flex-col items-center gap-stack-md text-center",
      className,
    ].filter(Boolean).join(" ")}>
      {showSubtitle ? (
        <p className={[
          "font-sans text-body-md font-medium leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-0-42)]",
          inverse ? "text-text-inverse opacity-[var(--opacity-muted)]" : "text-action-secondary",
        ].join(" ")}>
          {subtitle}
        </p>
      ) : null}
      {showTitle ? <h2 className={[
        "font-sans text-title-lg font-semibold leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-0-5)]",
        inverse ? "text-text-inverse" : "text-text-strong",
      ].join(" ")}>
        {title}
      </h2> : null}
      {showDescription ? (
        <p className={[
          "font-sans text-body-md font-regular leading-[var(--leading-150)] tracking-[var(--tracking-preserved-neg-1)]",
          inverse ? "text-text-inverse" : "text-text-secondary",
        ].join(" ")}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
