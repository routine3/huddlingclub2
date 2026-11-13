"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

export type CopyInvitationButtonProps = {
  invitationId: string;
};

export default function CopyInvitationButton({
  invitationId,
}: CopyInvitationButtonProps) {
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    setToastMessage(message);

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimerRef.current = null;
    }, 2000);
  }

  async function copyInvitationLink() {
    const invitationUrl = `${window.location.origin}/i/${invitationId}`;

    try {
      await navigator.clipboard.writeText(invitationUrl);
      showToast("초대장 링크를 복사했어요.");
    } catch {
      showToast("링크 복사에 실패했어요. 주소를 직접 복사해 주세요.");
    }
  }

  return (
    <>
      <Button className="w-full" onClick={copyInvitationLink} size="lg">
        초대장 링크 복사하기
      </Button>
      {toastMessage ? <Toast message={toastMessage} /> : null}
    </>
  );
}
