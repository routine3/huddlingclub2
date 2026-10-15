export type MockInvitation = {
  title: string;
  dateTime: string;
  location: string;
  body: string;
};

export type AttendanceStatus = "yes" | "no";

export type MockResponse = {
  name: string;
  status: AttendanceStatus;
  companionCount: number;
};

export const mockInvitation: MockInvitation = {
  title: "쉿, 우리끼리 파자마 파티",
  dateTime: "2026-11-14T09:00:00+09:00",
  location: "이불 요새 안쪽 (암호: 귤 까먹자)",
  body: "거창한 계획은 없어도 괜찮아. 편한 파자마를 입고 모여서 요즘 있었던 사소한 일들, 별것 아닌 고민, 그냥 떠오른 얘기들을 나눠보자.\n\n우리끼리만 아는 작은 비밀 모임이야. 편한 마음으로 와서 수다 떨다 가면 돼.",
};

export const mockResponses: MockResponse[] = [
  {
    name: "김허들",
    status: "yes",
    companionCount: 1,
  },
  {
    name: "이초대",
    status: "no",
    companionCount: 0,
  },
  {
    name: "박모임",
    status: "yes",
    companionCount: 2,
  },
];

export type MockInvitationRecord = MockInvitation & {
  id: string;
  responses: MockResponse[];
};

export const mockInvitations: Record<string, MockInvitationRecord> = {
  demo: {
    id: "demo",
    ...mockInvitation,
    responses: mockResponses,
  },
  empty: {
    id: "empty",
    ...mockInvitation,
    responses: [],
  },
};
