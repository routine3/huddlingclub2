import IconPlus from "./IconPlus";
import StepButton from "./StepButton";

export type StepperProps = {
  value?: number;
  min?: number;
  max?: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  className?: string;
};

export default function Stepper({ value = 0, min = 0, max, onDecrease, onIncrease, className }: StepperProps) {
  return (
    <div className={["inline-flex items-center gap-control-x", className].filter(Boolean).join(" ")}>
      <StepButton aria-label="동반 인원 줄이기" disabled={value <= min} onClick={onDecrease} />
      <output className="min-w-[var(--size-step-button)] text-center typography-heading-md text-text-strong" aria-live="polite">
        {value}명
      </output>
      <StepButton
        aria-label="동반 인원 늘리기"
        disabled={max !== undefined && value >= max}
        icon={<IconPlus className="size-[var(--size-icon-sm)]" />}
        onClick={onIncrease}
      />
    </div>
  );
}
