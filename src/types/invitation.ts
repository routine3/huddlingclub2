export type AttendanceStatus = "yes" | "no";

export type Invitation = {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  body: string;
};

export type Rsvp = {
  id: string;
  invitationId: string;
  name: string;
  status: AttendanceStatus;
  companionCount: number;
};
