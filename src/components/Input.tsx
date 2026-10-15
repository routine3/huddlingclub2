import type { InputHTMLAttributes } from "react";
import InputField from "./InputField";
import Label from "./Label";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  helper?: string;
  showHelper?: boolean;
  required?: boolean;
  state?: "default" | "focus" | "active";
  containerClassName?: string;
};

export default function Input({ label = "Label", helper = "안내 문구", showHelper = false, required = true, state = "default", id, className, containerClassName, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className={["flex w-full max-w-[var(--size-input)] flex-col", containerClassName].filter(Boolean).join(" ")}>
      <div className="flex flex-col">
        <Label htmlFor={inputId} required={required}>{label}</Label>
        <div style={{ paddingTop: "var(--spacing-16)" }}>
          <InputField
            {...props}
            className={className}
            id={inputId}
            required={required}
            state={state}
          />
        </div>
      </div>
      {showHelper ? <p className="mt-field-label typography-caption-md text-text-tertiary">{helper}</p> : null}
    </div>
  );
}
