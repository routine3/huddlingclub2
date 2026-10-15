import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonState = "default" | "hover" | "disabled";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  size?: ButtonSize;
  state?: ButtonState;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "gap-control-compact py-inline-sm typography-label-md",
  md: "h-[calc(var(--spacing-40)+var(--spacing-8))] gap-inline-compact py-control-x typography-label-md",
  lg: "h-[calc(var(--spacing-40)+var(--spacing-12))] gap-control-compact py-inline-sm typography-label-lg",
};

const defaultBackgroundClasses: Record<ButtonSize, string> = {
  sm: "bg-action-primary",
  md: "bg-text-secondary",
  lg: "bg-action-primary",
};

export default function Button({
  children = "Button",
  className,
  disabled = false,
  size = "sm",
  state = "default",
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || state === "disabled";
  const backgroundClass = isDisabled
    ? "bg-border-subtle"
    : state === "hover"
      ? "bg-action-hover-overlay"
      : defaultBackgroundClasses[size];
  const hoverClass =
    !isDisabled && state === "default"
      ? "hover:bg-action-hover-overlay"
      : "";

  const classes = [
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-control px-control-y font-sans text-center text-text-inverse focus-visible:[outline-style:solid] focus-visible:[outline-width:var(--spacing-2)] focus-visible:outline-offset-[var(--spacing-2)] focus-visible:outline-border-accent disabled:cursor-not-allowed",
    sizeClasses[size],
    backgroundClass,
    hoverClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      className={classes}
      data-size={size}
      data-state={isDisabled ? "disabled" : state}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </button>
  );
}
