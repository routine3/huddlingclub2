"use client";

import Button from "./Button";

export type CopyLinkFieldProps = {
  title?: string;
  value?: string;
  description?: string;
  onCopy?: (value: string) => void;
  className?: string;
};

export default function CopyLinkField({ title = "초대장 링크", value = "…/i/k3f9x2a7", description = "게스트에게 공유하는 링크예요.", onCopy, className }: CopyLinkFieldProps) {
  async function copyValue() {
    await navigator.clipboard.writeText(value);
    onCopy?.(value);
  }

  return (
    <section className={[
      "flex w-full max-w-[var(--size-content-card)] flex-col gap-inline-md rounded-card bg-surface-subtle p-stack-md",
      className,
    ].filter(Boolean).join(" ")}>
      <h2 className="typography-label-lg text-text-strong">{title}</h2>
      <div className="flex items-center gap-inline-md">
        <input className="h-[var(--size-input-field)] min-w-0 flex-1 rounded-control border border-border-subtle bg-surface-default px-stack-md py-control-x font-sans text-body-lg font-regular leading-none tracking-[var(--tracking-preserved-neg-0-16)] text-guide-text-preserved-1 outline-none" readOnly value={value} />
        <Button onClick={copyValue} size="sm">복사</Button>
      </div>
      <p className="typography-caption-md text-text-tertiary">{description}</p>
    </section>
  );
}
