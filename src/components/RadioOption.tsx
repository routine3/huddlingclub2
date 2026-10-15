import type { InputHTMLAttributes } from "react";
import Label from "./Label";
import Radio from "./Radio";

export type RadioOptionProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export default function RadioOption({ label = "Option", checked, disabled, required, className, ...props }: RadioOptionProps) {
  return (
    <label className={["inline-flex cursor-pointer items-center", disabled ? "cursor-not-allowed opacity-[var(--opacity-muted)]" : "", className].filter(Boolean).join(" ")}>
      <input {...props} checked={checked} className="sr-only" disabled={disabled} required={required} type="radio" />
      <Radio state={disabled ? "disabled" : checked ? "selected" : "default"} />
      <Label as="span" required={required}>{label}</Label>
    </label>
  );
}
