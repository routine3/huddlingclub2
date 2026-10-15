import type { InputHTMLAttributes } from "react";

export type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  state?: "default" | "focus" | "active";
};

export default function InputField({ className, state = "default", ...props }: InputFieldProps) {
  return (
    <input
      {...props}
      className={[
        "h-[var(--size-input-field)] w-full rounded-control border bg-surface-default px-stack-md py-control-x font-sans text-body-lg font-regular leading-none tracking-[var(--tracking-preserved-neg-0-16)] text-text-strong outline-none placeholder:text-text-disabled focus:border-action-primary",
        state === "focus" ? "border-action-primary" : "border-border-subtle",
        className,
      ].filter(Boolean).join(" ")}
      data-state={state}
    />
  );
}
