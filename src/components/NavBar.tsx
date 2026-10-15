import type { ReactNode } from "react";
import IconNone from "./IconNone";

export type NavBarProps = {
  title?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export default function NavBar({ title = "초대장 만들기", leftSlot, rightSlot, className }: NavBarProps) {
  return (
    <nav className={[
      "grid h-[var(--size-navbar)] w-full grid-cols-[var(--size-icon-md)_1fr_var(--size-icon-md)] items-center gap-section px-page-horizontal bg-surface-default",
      className,
    ].filter(Boolean).join(" ")} aria-label={title}>
      {leftSlot ?? <IconNone />}
      <h1 className="truncate text-center font-sans text-heading-md font-semibold leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-1)] text-text-strong">
        {title}
      </h1>
      {rightSlot ?? <IconNone />}
    </nav>
  );
}
