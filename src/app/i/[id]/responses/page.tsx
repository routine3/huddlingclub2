import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import ResponseRowTrue from "@/components/ResponseRowTrue";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { formatDateTime } from "@/lib/format-date-time";
import { getInvitation, getRsvps } from "@/lib/invitations";
import CopyInvitationButton from "./CopyInvitationButton";

export const dynamic = "force-dynamic";

export default async function ResponsesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invitation = await getInvitation(id);

  if (!invitation) {
    notFound();
  }

  const responses = await getRsvps(invitation.id);
  const attendingResponses = responses.filter((response) => response.status === "yes");
  const notAttendingResponses = responses.filter((response) => response.status === "no");
  const attendeeTotal = attendingResponses.reduce(
    (total, response) => total + 1 + response.companionCount,
    0,
  );
  const formattedDateTime = formatDateTime(invitation.dateTime);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <NavBar title="응답 현황" />

      <div className="flex flex-col gap-section-lg px-page-horizontal pb-cover-inset">
        <SectionHeader
          className="max-w-full"
          description={`${formattedDateTime} · ${invitation.location}`}
          subtitle="Responses"
          title={invitation.title}
        />

        <section className="flex gap-inline-md" aria-label="응답 요약">
          <StatCard className="min-w-0 flex-1" label="참석" value={`${attendingResponses.length}명`} />
          <StatCard className="min-w-0 flex-1" label="불참" value={`${notAttendingResponses.length}명`} />
          <StatCard className="min-w-0 flex-1" highlight label="참석 인원 합계" value={`${attendeeTotal}명`} />
        </section>

        <p className="typography-caption-md text-text-tertiary">
          참석 인원 합계 = 참석한 사람 + 동반 인원
        </p>

        <section className="flex flex-col gap-inline-md">
          <h2 className="typography-heading-md text-text-strong">응답 목록</h2>
          {responses.length === 0 ? (
            <EmptyState className="max-w-full" />
          ) : (
            responses.map((response) => (
              <ResponseRowTrue
                className="max-w-full"
                key={response.id}
                meta={response.status === "yes" && response.companionCount > 0 ? `동반 ${response.companionCount}명` : ""}
                name={response.name}
                status={response.status}
              />
            ))
          )}
        </section>

        <CopyInvitationButton invitationId={invitation.id} />
      </div>
    </main>
  );
}
