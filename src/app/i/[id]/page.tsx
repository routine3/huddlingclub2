import { notFound } from "next/navigation";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";
import { formatDateTime } from "@/lib/format-date-time";
import { getInvitation } from "@/lib/invitations";
import RsvpSection from "./RsvpSection";

export const dynamic = "force-dynamic";

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  if (!invitation) {
    notFound();
  }

  const formattedDateTime = formatDateTime(invitation.dateTime);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <InvitationCover
        date={formattedDateTime}
        location={invitation.location}
        title={invitation.title}
      />

      <section className="flex flex-col items-center gap-section px-page-horizontal py-cover-inset text-center">
        <Image alt="밋업 안내 깃발" type="flag" />
        <p className="whitespace-pre-wrap font-sans text-body-compact font-regular leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-1)] text-guide-text-preserved-1">
          {invitation.body}
        </p>
      </section>

      <section className="px-page-horizontal pb-section-lg pt-stack-lg">
        <div className="flex flex-col gap-control-compact rounded-card bg-surface-subtle p-page-horizontal">
          <InfoRow label="일시" value={formattedDateTime} />
          <InfoRow label="장소" value={invitation.location} />
        </div>
      </section>

      <RsvpSection invitationId={invitation.id} />
    </main>
  );
}
