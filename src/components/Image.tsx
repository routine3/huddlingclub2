import NextImage from "next/image";

export type ImageProps = {
  type?: "character" | "flag";
  className?: string;
  alt?: string;
};

const images = {
  character: {
    src: "/images/character.png",
    width: 201,
    height: 201,
    className: "size-[var(--size-image-character)] object-contain",
    alt: "초대장을 든 캐릭터",
  },
  flag: {
    src: "/images/flag.png",
    width: 48,
    height: 48,
    className: "size-[calc(var(--spacing-40)+var(--spacing-8))] rounded-[var(--radius-scaled-media-16-799999237060547)] object-cover",
    alt: "깃발 그림",
  },
} as const;

export default function Image({ type = "character", className, alt }: ImageProps) {
  const image = images[type];

  return (
    <NextImage
      alt={alt ?? image.alt}
      className={[image.className, className].filter(Boolean).join(" ")}
      height={image.height}
      src={image.src}
      width={image.width}
    />
  );
}
