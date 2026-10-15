import type { HTMLAttributes } from "react";

export type RadioProps = HTMLAttributes<HTMLSpanElement> & {
  state?: "default" | "selected" | "disabled";
};

export default function Radio({ className, state = "default", ...props }: RadioProps) {
  const isSelected = state === "selected";
  const isDisabled = state === "disabled";

  return (
    <span
      {...props}
      aria-hidden="true"
      className={[
        "inline-flex size-[calc(var(--spacing-40)+var(--spacing-8))] shrink-0 items-center justify-center",
        className,
      ].filter(Boolean).join(" ")}
      data-state={state}
    >
      <span className={[
        "flex size-[var(--size-radio-outer)] items-center justify-center rounded-pill",
        isDisabled ? "bg-text-disabled" : isSelected ? "bg-action-primary" : "bg-text-tertiary",
      ].join(" ")}>
        <span className={[
          "rounded-pill bg-surface-default",
          isSelected ? "size-[var(--size-radio-dot)]" : "size-[var(--size-radio-inner)]",
        ].join(" ")} />
      </span>
    </span>
  );
}
