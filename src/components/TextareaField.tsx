import type { TextareaHTMLAttributes } from "react";

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  state?: "default" | "focus" | "active";
};

export default function TextareaField({ className, state = "default", ...props }: TextareaFieldProps) {
  return (
    <textarea
      {...props}
      className={[
        "w-full resize-none rounded-control border bg-surface-default px-stack-md py-control-x font-sans text-body-lg font-regular leading-[var(--leading-150)] tracking-[var(--tracking-preserved-neg-0-16)] text-text-strong outline-none placeholder:text-text-disabled focus:border-action-primary",
        state === "focus" ? "border-action-primary" : "border-border-subtle",
        className,
      ].filter(Boolean).join(" ")}
      data-state={state}
    />
  );
}
