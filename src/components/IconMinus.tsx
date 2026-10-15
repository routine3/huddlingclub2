import type { ImgHTMLAttributes } from "react";

export default function IconMinus({ className, alt = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      className={["size-[var(--size-icon-md)] shrink-0", className]
        .filter(Boolean)
        .join(" ")}
      src="/icons/minus.svg"
    />
  );
}
