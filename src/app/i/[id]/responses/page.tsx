"use client";

import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import NavBar from "@/components/NavBar";
import ResponseRowTrue from "@/components/ResponseRowTrue";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import { mockInvitations } from "@/lib/mock";
import { useParams } from "next/navigation";

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  const weekday = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    weekday: "short",
  }).format(date);
  const [datePart, timePart] = dateTime.split("T");
  const [year, month, day] = datePart.split("-");

  return `${year}년 ${Number(month)}월 ${Number(day)}일 (${weekday}) ${timePart.slice(0, 5)}`;
}

export default function ResponsesPage() {
  const { id } = useParams<{ id: string }>();
  const invitation = mockInvitations[id] ?? mockInvitations.demo;
  const responses = invitation.responses;
  const attendingResponses = responses.filter((response) => response.status === "yes");
  const notAttendingResponses = responses.filter((response) => response.status === "no");
  const attendeeTotal = attendingResponses.reduce(
    (total, response) => total + 1 + response.companionCount,
    0,
  );
  const formattedDateTime = formatDateTime(invitation.dateTime);

  async function copyInvitationLink() {
    const invitationUrl = `${window.location.origin}/i/${invitation.id}`;
    await navigator.clipboard.writeText(invitationUrl);
  }

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
                key={response.name}
                meta={response.status === "yes" && response.companionCount > 0 ? `동반 ${response.companionCount}명` : ""}
                name={response.name}
                status={response.status}
              />
            ))
          )}
        </section>

        <Button className="w-full" onClick={copyInvitationLink} size="lg">
          초대장 링크 복사하기
        </Button>
      </div>
    </main>
  );
}
