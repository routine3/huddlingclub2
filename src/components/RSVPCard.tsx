"use client";

import type { ChangeEventHandler, FormEventHandler } from "react";
import Button from "./Button";
import InfoRow from "./InfoRow";
import Input from "./Input";
import Label from "./Label";
import RadioOption from "./RadioOption";
import Stepper from "./Stepper";
import SuccessIcon from "./SuccessIcon";

export type RSVPCardProps = {
  state?: "form" | "done";
  name?: string;
  attendance?: "yes" | "no";
  companionCount?: number;
  onNameChange?: ChangeEventHandler<HTMLInputElement>;
  onAttendanceChange?: (attendance: "yes" | "no") => void;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  className?: string;
};

export default function RSVPCard({ state = "form", name = "", attendance = "yes", companionCount = 0, onNameChange, onAttendanceChange, onDecrease, onIncrease, onSubmit, className }: RSVPCardProps) {
  const classes = [
    "w-full max-w-[var(--size-section-header)] rounded-card bg-surface-default px-page-horizontal py-stack-lg",
    className,
  ].filter(Boolean).join(" ");

  if (state === "done") {
    return (
      <section className={classes}>
        <div className="flex flex-col items-center gap-stack-sm py-section-lg text-center">
          <SuccessIcon />
          <h2 className="typography-title-lg text-text-strong">참석 여부를 보냈어요</h2>
          <p className="typography-body-md text-text-secondary">호스트에게 응답이 전달됐어요.</p>
        </div>
        <div className="flex flex-col gap-inline-md rounded-card bg-surface-subtle p-stack-md">
          <InfoRow label="이름" type="spread" value={name || "홍길동"} />
          <InfoRow label="참석 여부" type="spread" value={attendance === "yes" ? "참석" : "불참"} />
          <InfoRow label="동반 인원" type="spread" value={`${companionCount}명`} />
        </div>
      </section>
    );
  }

  return (
    <form className={[classes, "flex flex-col gap-stack-lg"].join(" ")} onSubmit={onSubmit}>
      <header className="flex flex-col gap-inline-compact text-center">
        <h2 className="typography-heading-lg text-text-strong">참석 여부 알려주기</h2>
        <p className="typography-body-md text-text-secondary">이름과 참석 여부를 남겨주세요.</p>
      </header>

      <Input
        containerClassName="max-w-none"
        label="이름"
        name="guest-name"
        onChange={onNameChange}
        placeholder="이름을 입력해 주세요"
        readOnly={!onNameChange}
        required
        value={name}
      />

      <fieldset>
        <Label as="span" required>참석 여부</Label>
        <div className="mt-inline-compact flex gap-stack-md">
          <RadioOption
            checked={attendance === "yes"}
            label="참석"
            name="attendance"
            onChange={() => onAttendanceChange?.("yes")}
            readOnly={!onAttendanceChange}
            value="yes"
          />
          <RadioOption
            checked={attendance === "no"}
            label="불참"
            name="attendance"
            onChange={() => onAttendanceChange?.("no")}
            readOnly={!onAttendanceChange}
            value="no"
          />
        </div>
      </fieldset>

      <div>
        <Label as="span">동반 인원</Label>
        <Stepper className="mt-inline-compact" onDecrease={onDecrease} onIncrease={onIncrease} value={companionCount} />
        <p className="mt-inline-sm typography-caption-md text-text-tertiary">본인을 제외하고 함께 오는 인원이에요.</p>
      </div>

      <Button className="w-full" size="lg" type="submit">참석 여부 보내기</Button>
    </form>
  );
}
