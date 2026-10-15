import type { TextareaHTMLAttributes } from "react";
import Label from "./Label";
import TextareaField from "./TextareaField";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> & {
  label?: string;
  helper?: string;
  showHelper?: boolean;
  required?: boolean;
  rows?: "2" | "4";
  state?: "default" | "focus" | "active";
  containerClassName?: string;
};

export default function Textarea({ label = "Label", helper = "엔터로 줄을 나눌 수 있어요", showHelper = false, required = true, rows = "4", state = "default", id, containerClassName, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className={["flex w-full max-w-[var(--size-content-card)] flex-col gap-inline-compact", containerClassName].filter(Boolean).join(" ")}>
      <Label htmlFor={textareaId} required={required}>{label}</Label>
      <TextareaField
        {...props}
        className={rows === "2" ? "h-[var(--size-textarea-short)]" : "h-[var(--size-textarea-tall)]"}
        id={textareaId}
        required={required}
        rows={Number(rows)}
        state={state}
      />
      {showHelper ? <p className="typography-caption-md text-text-tertiary">{helper}</p> : null}
    </div>
  );
}
