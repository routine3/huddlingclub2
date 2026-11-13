import { createClient } from "@/lib/supabase/server";
import type { Invitation, Rsvp } from "@/types/invitation";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidInvitationId(id: string) {
  return uuidPattern.test(id);
}

export async function getInvitation(id: string): Promise<Invitation | null> {
  if (!isValidInvitationId(id)) {
    return null;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("invitations")
    .select("id, title, date_time, location, body")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("초대장 조회 실패", error);
    throw new Error("초대장을 불러오지 못했습니다.");
  }

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    dateTime: data.date_time,
    location: data.location,
    body: data.body,
  };
}

export async function getRsvps(invitationId: string): Promise<Rsvp[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("rsvps")
    .select("id, invitation_id, name, status, companion_count")
    .eq("invitation_id", invitationId)
    .order("id", { ascending: true });

  if (error) {
    console.error("응답 목록 조회 실패", error);
    throw new Error("응답 목록을 불러오지 못했습니다.");
  }

  return data.map((rsvp) => ({
    id: rsvp.id,
    invitationId: rsvp.invitation_id,
    name: rsvp.name,
    status: rsvp.status,
    companionCount: rsvp.companion_count,
  }));
}
