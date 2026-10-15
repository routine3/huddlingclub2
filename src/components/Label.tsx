import type { HTMLAttributes, ReactNode } from "react";

export type LabelProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
  required?: boolean;
  as?: "label" | "span";
  htmlFor?: string;
};

export default function Label({ as: Component = "label", children = "Label", className, required = false, ...props }: LabelProps) {
  return (
    <Component
      {...props}
      className={[
        "inline-flex items-center gap-inline-sm font-sans text-label-lg font-semibold leading-none tracking-[var(--tracking-preserved-neg-0-16)] text-text-strong",
        className,
      ].filter(Boolean).join(" ")}
    >
      <span>{children}</span>
      {required ? (
        <span className="text-caption-md font-regular leading-none tracking-[var(--tracking-preserved-neg-0-12)] text-feedback-error" aria-hidden="true">
          필수
        </span>
      ) : null}
    </Component>
  );
}
