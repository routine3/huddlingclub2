import Image from "./Image";
import SectionHeader from "./SectionHeader";

export type InvitationCoverProps = {
  subtitle?: string;
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  className?: string;
};

export default function InvitationCover({ subtitle = "Huddling Club 2nd Meetup", title = "허들링 클럽 2번째\n오프라인 밋업", description, date = "2026년 11월 14일 (토) 09:00", location = "세종 남극 기지", className }: InvitationCoverProps) {
  return (
    <section className={[
      "flex w-full max-w-[var(--size-invitation-cover)] flex-col items-center justify-center gap-page-horizontal overflow-hidden bg-[linear-gradient(180deg,var(--color-cover-gradient-preserved-3),var(--color-cover-gradient-preserved-4))] p-cover-inset text-center",
      className,
    ].filter(Boolean).join(" ")}>
      <SectionHeader className="shrink-0 whitespace-pre-line" description={description} inverse showDescription={Boolean(description)} subtitle={subtitle} title={title} />
      <Image alt="초대장을 든 캐릭터" type="character" />
      <div className="flex min-w-[calc(var(--size-input)-var(--spacing-8))] flex-col items-center gap-inline-md">
        <span className="rounded-control bg-info-subtle px-inline-compact py-inline-xs font-sans text-caption-md font-semibold leading-[var(--leading-150)] tracking-[var(--tracking-preserved-neg-0-12)] text-info-strong">일시</span>
        <p className="font-sans text-body-md font-medium leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-0-28)] text-text-inverse">{date}</p>
      </div>
      <div className="flex min-w-[calc(var(--size-input)-var(--spacing-8))] flex-col items-center gap-inline-md">
        <span className="rounded-control bg-info-subtle px-inline-compact py-inline-xs font-sans text-caption-md font-semibold leading-[var(--leading-150)] tracking-[var(--tracking-preserved-neg-0-12)] text-info-strong">장소</span>
        <p className="font-sans text-body-md font-medium leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-0-28)] text-text-inverse">{location}</p>
      </div>
    </section>
  );
}
