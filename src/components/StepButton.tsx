import type { ButtonHTMLAttributes, ReactNode } from "react";
import IconMinus from "./IconMinus";

export type StepButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  state?: "default" | "disabled";
};

export default function StepButton({ className, disabled, icon, state = "default", type = "button", ...props }: StepButtonProps) {
  const isDisabled = disabled || state === "disabled";

  return (
    <button
      {...props}
      className={[
        "inline-flex size-[var(--size-step-button)] items-center justify-center rounded-control border border-border-default bg-surface-default focus-visible:[outline-style:solid] focus-visible:[outline-width:var(--spacing-2)] focus-visible:outline-offset-[var(--spacing-2)] focus-visible:outline-border-accent disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]",
        className,
      ].filter(Boolean).join(" ")}
      disabled={isDisabled}
      type={type}
    >
      {icon ?? <IconMinus className="size-[var(--size-icon-sm)]" />}
    </button>
  );
}
