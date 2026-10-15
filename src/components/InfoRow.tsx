export type InfoRowProps = {
  label?: string;
  value?: string;
  type?: "inline" | "spread";
  className?: string;
};

export default function InfoRow({ label = "Label", value = "Value", type = "inline", className }: InfoRowProps) {
  if (type === "spread") {
    return (
      <div className={["flex w-full items-center justify-between gap-control-compact", className].filter(Boolean).join(" ")}>
        <span className="typography-body-md text-text-secondary">{label}</span>
        <span className="typography-label-md text-right text-text-strong">{value}</span>
      </div>
    );
  }

  return (
    <div className={["inline-flex items-center gap-control-compact", className].filter(Boolean).join(" ")}>
      <span className="typography-label-lg text-text-secondary">{label}</span>
      <span className="h-[calc(var(--spacing-12)+var(--spacing-2))] w-[var(--spacing-1)] bg-border-default" aria-hidden="true" />
      <span className="typography-label-lg text-text-strong">{value}</span>
    </div>
  );
}
