"use client";

import { useState, type FormEvent } from "react";
import RSVPCard from "@/components/RSVPCard";
import type { AttendanceStatus } from "@/types/invitation";
import { submitRsvp } from "./actions";

export type RsvpSectionProps = {
  invitationId: string;
};

export default function RsvpSection({ invitationId }: RsvpSectionProps) {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceStatus>("yes");
  const [companionCount, setCompanionCount] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const result = await submitRsvp(invitationId, {
      name,
      status: attendance,
      companionCount,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    setIsSubmitted(true);
  }

  return (
    <section className="bg-background-subtle px-page-horizontal pb-section-xl pt-section-lg">
      <RSVPCard
        attendance={attendance}
        className="max-w-full"
        companionCount={companionCount}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
        name={name}
        onAttendanceChange={setAttendance}
        onDecrease={() => setCompanionCount((count) => Math.max(0, count - 1))}
        onIncrease={() => setCompanionCount((count) => Math.min(20, count + 1))}
        onNameChange={(event) => setName(event.target.value)}
        onSubmit={handleSubmit}
        state={isSubmitted ? "done" : "form"}
      />
    </section>
  );
}
