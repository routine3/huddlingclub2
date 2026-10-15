import type { HTMLAttributes } from "react";

export default function IconNone({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={["block size-[var(--size-icon-md)] shrink-0", className]
        .filter(Boolean)
        .join(" ")}
      data-figma-name="icon/none"
    />
  );
}
