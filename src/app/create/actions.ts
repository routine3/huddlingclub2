"use server";

import { createClient } from "@/lib/supabase/server";

export type CreateInvitationInput = {
  title: string;
  dateTime: string;
  location: string;
  body: string;
};

export type CreateInvitationResult =
  | { success: true; id: string }
  | { success: false; message: string };

function parseDateTime(value: string) {
  const trimmedValue = value.trim();
  const koreanDatePattern =
    /^(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일(?:\s*\([^)]*\))?\s*(\d{1,2}):(\d{2})$/;
  const match = trimmedValue.match(koreanDatePattern);

  if (match) {
    const [, year, month, day, hour, minute] = match;
    const isoDateTime = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hour.padStart(2, "0")}:${minute}:00+09:00`;
    const parsedDate = new Date(isoDateTime);

    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
  }

  const parsedDate = new Date(trimmedValue);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
}

export async function createInvitation(
  input: CreateInvitationInput,
): Promise<CreateInvitationResult> {
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const location =
    typeof input.location === "string" ? input.location.trim() : "";
  const body = typeof input.body === "string" ? input.body.trim() : "";
  const dateTime =
    typeof input.dateTime === "string" ? parseDateTime(input.dateTime) : null;

  if (!title || title.length > 50) {
    return { success: false, message: "제목은 1자 이상 50자 이하로 입력해 주세요." };
  }

  if (!dateTime) {
    return { success: false, message: "일시를 예시와 같은 형식으로 입력해 주세요." };
  }

  if (!location || location.length > 200) {
    return { success: false, message: "장소는 1자 이상 200자 이하로 입력해 주세요." };
  }

  if (!body || body.length > 5000) {
    return { success: false, message: "본문은 1자 이상 5,000자 이하로 입력해 주세요." };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("invitations")
      .insert({
        title,
        date_time: dateTime,
        location,
        body,
      })
      .select("id")
      .single();

    if (error) {
      console.error("초대장 발행 실패", error);
      return { success: false, message: "초대장을 발행하지 못했어요. 잠시 후 다시 시도해 주세요." };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error("초대장 발행 중 서버 오류", error);
    return { success: false, message: "초대장을 발행하지 못했어요. 잠시 후 다시 시도해 주세요." };
  }
}
