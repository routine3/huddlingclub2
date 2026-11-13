export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      invitations: {
        Row: {
          id: string;
          title: string;
          date_time: string;
          location: string;
          body: string;
        };
        Insert: {
          id?: string;
          title: string;
          date_time: string;
          location: string;
          body: string;
        };
        Update: {
          id?: string;
          title?: string;
          date_time?: string;
          location?: string;
          body?: string;
        };
        Relationships: [];
      };
      rsvps: {
        Row: {
          id: string;
          invitation_id: string;
          name: string;
          status: "yes" | "no";
          companion_count: number;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          name: string;
          status: "yes" | "no";
          companion_count?: number;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          name?: string;
          status?: "yes" | "no";
          companion_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "rsvps_invitation_id_fkey";
            columns: ["invitation_id"];
            isOneToOne: false;
            referencedRelation: "invitations";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
