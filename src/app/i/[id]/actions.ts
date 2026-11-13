"use server";

import { revalidatePath } from "next/cache";
import { isValidInvitationId } from "@/lib/invitations";
import { createClient } from "@/lib/supabase/server";
import type { AttendanceStatus } from "@/types/invitation";

export type SubmitRsvpInput = {
  name: string;
  status: AttendanceStatus;
  companionCount: number;
};

export type SubmitRsvpResult =
  | { success: true }
  | { success: false; message: string };

export async function submitRsvp(
  invitationId: string,
  input: SubmitRsvpInput,
): Promise<SubmitRsvpResult> {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const status = input.status;
  const companionCount = input.companionCount;

  if (!isValidInvitationId(invitationId)) {
    return { success: false, message: "유효하지 않은 초대장이에요." };
  }

  if (!name || name.length > 50) {
    return { success: false, message: "이름은 1자 이상 50자 이하로 입력해 주세요." };
  }

  if (status !== "yes" && status !== "no") {
    return { success: false, message: "참석 여부를 선택해 주세요." };
  }

  if (
    !Number.isInteger(companionCount) ||
    companionCount < 0 ||
    companionCount > 20
  ) {
    return { success: false, message: "동반 인원은 0명에서 20명 사이로 입력해 주세요." };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("rsvps").insert({
      invitation_id: invitationId,
      name,
      status,
      companion_count: companionCount,
    });

    if (error) {
      console.error("참석 응답 저장 실패", error);
      return { success: false, message: "응답을 보내지 못했어요. 잠시 후 다시 시도해 주세요." };
    }

    revalidatePath(`/i/${invitationId}/responses`);
    return { success: true };
  } catch (error) {
    console.error("참석 응답 저장 중 서버 오류", error);
    return { success: false, message: "응답을 보내지 못했어요. 잠시 후 다시 시도해 주세요." };
  }
}
