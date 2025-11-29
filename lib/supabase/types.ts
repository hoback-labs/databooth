export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          clerk_id: string;
          email: string;
          credits: number;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_id: string;
          email: string;
          credits?: number;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_id?: string;
          email?: string;
          credits?: number;
          is_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          price_cents: number;
          stripe_session_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          price_cents: number;
          stripe_session_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          price_cents?: number;
          stripe_session_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      generations: {
        Row: {
          id: string;
          user_id: string;
          rows_processed: number;
          charts_generated: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          rows_processed: number;
          charts_generated: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          rows_processed?: number;
          charts_generated?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "generations_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_credits: {
        Args: {
          user_id: string;
          amount: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type User = Database["public"]["Tables"]["users"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Generation = Database["public"]["Tables"]["generations"]["Row"];
