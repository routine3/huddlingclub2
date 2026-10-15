"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";
import Toast from "@/components/Toast";

const initialForm = {
  title: "쉿, 우리끼리\n파자마 파티",
  dateTime: "2026년 11월 14일 (토) 09:00",
  location: "이불 요새 안쪽 (암호: 귤 까먹자)",
  body: `거창한 계획은 없어도 괜찮아.
편한 파자마를 입고 모여서 요즘 있었던 사소한 일들, 별것 아닌 고민, 그냥 떠오른 얘기들을 나눠보자.

우리끼리만 아는 작은 비밀 모임이야.
편한 마음으로 와서 수다 떨다 가면 돼.`,
};

export default function CreatePage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isPublished, setIsPublished] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const isComplete = Object.values(form).every((value) => value.trim());

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function publishInvitation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isComplete) {
      setIsPublished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function showCopyToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2000);
  }

  if (isPublished) {
    return (
      <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
        <NavBar title="발행 완료" />

        <div className="flex flex-col gap-section-lg px-page-horizontal pb-cover-inset">
          <section className="flex flex-col items-center gap-stack-sm py-stack-lg text-center">
            <SuccessIcon />
            <h2 className="typography-title-lg text-text-strong">초대장이 발행됐어요!</h2>
            <p className="typography-body-md text-text-secondary">아래 두 링크를 복사해 두세요.</p>
          </section>

          <CopyLinkField
            className="max-w-full"
            onCopy={() => showCopyToast("초대장 링크를 복사했어요.")}
            value="/i/demo"
          />
          <CopyLinkField
            className="max-w-full"
            description="호스트용이에요. 이 링크를 아는 사람은 응답 목록을 볼 수 있어요."
            onCopy={() => showCopyToast("응답 현황 링크를 복사했어요.")}
            title="응답 현황 링크"
            value="/i/demo/responses"
          />
          <Button className="w-full" onClick={() => router.push("/i/demo")} size="lg">
            내 초대장 보기
          </Button>
        </div>
        {toastMessage ? <Toast message={toastMessage} /> : null}
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh w-full max-w-[var(--size-invitation-cover)] bg-surface-default">
      <form onSubmit={publishInvitation}>
        <NavBar title="초대장 만들기" />

        <div className="flex flex-col gap-section-lg px-page-horizontal pb-guide-section">
          <section className="flex flex-col gap-stack-lg">
            <Textarea
              containerClassName="max-w-full"
              helper="엔터로 줄을 나눌 수 있어요 · 최대 2줄"
              label="제목"
              maxLength={50}
              name="title"
              onChange={(event) => updateField("title", event.target.value)}
              placeholder={"예) 허들링 클럽 2번째\n오프라인 밋업"}
              rows="2"
              showHelper
              value={form.title}
            />
            <Input
              containerClassName="max-w-full"
              label="일시"
              name="dateTime"
              onChange={(event) => updateField("dateTime", event.target.value)}
              placeholder="예) 2026년 11월 14일 (토) 09:00"
              value={form.dateTime}
            />
            <Input
              containerClassName="max-w-full"
              label="장소"
              name="location"
              onChange={(event) => updateField("location", event.target.value)}
              placeholder="예) 세종 남극 기지"
              value={form.location}
            />
            <Textarea
              containerClassName="max-w-full"
              label="본문"
              name="body"
              onChange={(event) => updateField("body", event.target.value)}
              placeholder="게스트에게 전할 초대 글을 적어주세요"
              rows="4"
              value={form.body}
            />
          </section>

          <section className="flex h-[var(--size-create-preview)] flex-col gap-inline-md">
            <Label as="span" required={false}>미리보기</Label>

            <div className="min-h-0 flex-1 overflow-y-auto rounded-control border border-border-subtle bg-surface-default">
              <InvitationCover
                date={form.dateTime}
                location={form.location}
                title={form.title}
              />

              <section className="flex flex-col items-center gap-section px-page-horizontal py-cover-inset text-center">
                <Image alt="밋업 안내 깃발" type="flag" />
                <p className="whitespace-pre-wrap font-sans text-body-compact font-regular leading-[var(--leading-140)] tracking-[var(--tracking-preserved-neg-1)] text-guide-text-preserved-1">
                  {form.body}
                </p>
              </section>

              <section className="px-page-horizontal pb-section-lg pt-stack-lg">
                <div className="flex flex-col gap-control-compact rounded-card bg-surface-subtle p-page-horizontal">
                  <InfoRow label="일시" value={form.dateTime} />
                  <InfoRow label="장소" value={form.location} />
                </div>
              </section>
            </div>

            <p className="typography-caption-md text-text-tertiary">입력하는 내용이 바로 미리보기에 반영돼요.</p>
          </section>
        </div>

        <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[var(--size-invitation-cover)] -translate-x-1/2 bg-surface-default p-page-horizontal">
          <Button className="w-full" disabled={!isComplete} size="lg" type="submit">발행하기</Button>
        </div>
      </form>
    </main>
  );
}
