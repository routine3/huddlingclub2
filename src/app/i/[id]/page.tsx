"use client";

import { useState, type FormEvent } from "react";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import InvitationCover from "@/components/InvitationCover";
import RSVPCard from "@/components/RSVPCard";
import { mockInvitation, type AttendanceStatus } from "@/lib/mock";

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

export default function InvitationPage() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("yes");
  const [companionCount, setCompanionCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formattedDateTime = formatDateTime(mockInvitation.dateTime);

  function submitResponse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim()) {
      setIsSubmitted(true);
    }
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <InvitationCover
        date={formattedDateTime}
        location={mockInvitation.location}
        title={mockInvitation.title}
      />

      <section className="flex flex-col items-center gap-section px-page-horizontal py-cover-inset text-center">
        <Image alt="밋업 안내 깃발" type="flag" />
        <p className="whitespace-pre-wrap font-sans text-body-compact font-regular leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-1)] text-guide-text-preserved-1">
          {mockInvitation.body}
        </p>
      </section>

      <section className="px-page-horizontal pb-section-lg pt-stack-lg">
        <div className="flex flex-col gap-control-compact rounded-card bg-surface-subtle p-page-horizontal">
          <InfoRow label="일시" value={formattedDateTime} />
          <InfoRow label="장소" value={mockInvitation.location} />
        </div>
      </section>

      <section className="bg-background-subtle px-page-horizontal pb-section-xl pt-section-lg">
        <RSVPCard
          attendance={attendance}
          className="max-w-full"
          companionCount={companionCount}
          name={name}
          onAttendanceChange={setAttendance}
          onDecrease={() => setCompanionCount((count) => Math.max(0, count - 1))}
          onIncrease={() => setCompanionCount((count) => count + 1)}
          onNameChange={(event) => setName(event.target.value)}
          onSubmit={submitResponse}
          state={isSubmitted ? "done" : "form"}
        />
      </section>
    </main>
  );
}
