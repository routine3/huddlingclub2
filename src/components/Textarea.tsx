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

export default function Textarea({ label = "Label", helper = "엔터로 줄을 나눌 수 있어요", showHelper = false, required = true, rows = "4", state = "default", id, className, containerClassName, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;

  return (
    <div className={["flex w-full max-w-[var(--size-content-card)] flex-col", containerClassName].filter(Boolean).join(" ")}>
      <div className="flex flex-col">
        <Label htmlFor={textareaId} required={required}>{label}</Label>
        <div style={{ paddingTop: "var(--spacing-16)" }}>
          <TextareaField
            {...props}
            className={[
              rows === "2" ? "h-[var(--size-textarea-short)]" : "h-[var(--size-textarea-tall)]",
              className,
            ].filter(Boolean).join(" ")}
            id={textareaId}
            required={required}
            rows={Number(rows)}
            state={state}
          />
        </div>
      </div>
      {showHelper ? <p aria-atomic="true" aria-live="polite" className="mt-field-label typography-caption-md text-text-tertiary" role="status">{helper}</p> : null}
    </div>
  );
}
