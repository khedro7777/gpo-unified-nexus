export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      arbitration_requests: {
        Row: {
          created_at: string | null
          description: string
          dispute_type: string | null
          evidence_files: Json | null
          group_id: string | null
          id: string
          requested_action: string | null
          requester_id: string | null
          status: string | null
          ticket_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          dispute_type?: string | null
          evidence_files?: Json | null
          group_id?: string | null
          id?: string
          requested_action?: string | null
          requester_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          dispute_type?: string | null
          evidence_files?: Json | null
          group_id?: string | null
          id?: string
          requested_action?: string | null
          requester_id?: string | null
          status?: string | null
          ticket_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "arbitration_requests_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      company_formations: {
        Row: {
          additional_notes: string | null
          business_activity: string
          company_name: string
          company_type: string
          contact_email: string
          contact_phone: string
          created_at: string
          estimated_capital: string | null
          formation_type: string
          group_id: string | null
          id: string
          jurisdiction: string
          number_of_shareholders: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          business_activity: string
          company_name: string
          company_type: string
          contact_email: string
          contact_phone: string
          created_at?: string
          estimated_capital?: string | null
          formation_type?: string
          group_id?: string | null
          id?: string
          jurisdiction: string
          number_of_shareholders?: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          business_activity?: string
          company_name?: string
          company_type?: string
          contact_email?: string
          contact_phone?: string
          created_at?: string
          estimated_capital?: string | null
          formation_type?: string
          group_id?: string | null
          id?: string
          jurisdiction?: string
          number_of_shareholders?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_formations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancer_offers: {
        Row: {
          additional_notes: string | null
          created_at: string | null
          delivery_time: string | null
          description: string | null
          freelancer_id: string | null
          group_id: string | null
          id: string
          offer_description: string
          price: number | null
          status: string | null
          timeline_days: number | null
          title: string | null
        }
        Insert: {
          additional_notes?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          offer_description: string
          price?: number | null
          status?: string | null
          timeline_days?: number | null
          title?: string | null
        }
        Update: {
          additional_notes?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          freelancer_id?: string | null
          group_id?: string | null
          id?: string
          offer_description?: string
          price?: number | null
          status?: string | null
          timeline_days?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "freelancer_offers_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_lifecycle: {
        Row: {
          associated_gateway: string | null
          created_at: string
          current_phase: string
          current_round: number
          group_id: string
          id: string
          round_ends_at: string | null
          settings: Json
          status: string
          target_country: string
          updated_at: string
          visibility: string
        }
        Insert: {
          associated_gateway?: string | null
          created_at?: string
          current_phase?: string
          current_round?: number
          group_id: string
          id?: string
          round_ends_at?: string | null
          settings?: Json
          status?: string
          target_country: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          associated_gateway?: string | null
          created_at?: string
          current_phase?: string
          current_round?: number
          group_id?: string
          id?: string
          round_ends_at?: string | null
          settings?: Json
          status?: string
          target_country?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_lifecycle_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string | null
          role: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string | null
          role?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_phase_transitions: {
        Row: {
          created_at: string
          from_phase: string
          group_id: string
          id: string
          reason: string
          to_phase: string
          triggered_by: string | null
        }
        Insert: {
          created_at?: string
          from_phase: string
          group_id: string
          id?: string
          reason: string
          to_phase: string
          triggered_by?: string | null
        }
        Update: {
          created_at?: string
          from_phase?: string
          group_id?: string
          id?: string
          reason?: string
          to_phase?: string
          triggered_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_phase_transitions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_roles: {
        Row: {
          assigned_at: string
          expires_at: string | null
          group_id: string
          id: string
          role: string
          round_bound: boolean
          round_number: number | null
          user_id: string
        }
        Insert: {
          assigned_at?: string
          expires_at?: string | null
          group_id: string
          id?: string
          role?: string
          round_bound?: boolean
          round_number?: number | null
          user_id: string
        }
        Update: {
          assigned_at?: string
          expires_at?: string | null
          group_id?: string
          id?: string
          role?: string
          round_bound?: boolean
          round_number?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_roles_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_votes: {
        Row: {
          created_at: string
          description: string | null
          expires_at: string
          group_id: string
          id: string
          metadata: Json | null
          options: Json
          results: Json | null
          status: string
          title: string
          vote_type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          expires_at: string
          group_id: string
          id?: string
          metadata?: Json | null
          options?: Json
          results?: Json | null
          status?: string
          title: string
          vote_type?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          expires_at?: string
          group_id?: string
          id?: string
          metadata?: Json | null
          options?: Json
          results?: Json | null
          status?: string
          title?: string
          vote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_votes_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          contract_type: string | null
          country: string | null
          created_at: string | null
          creator_id: string
          current_members: number | null
          description: string | null
          group_type: string | null
          id: string
          max_members: number | null
          min_entry_amount: number | null
          name: string
          negotiation_rounds: number | null
          requires_suppliers: boolean | null
          sector: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          creator_id: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          max_members?: number | null
          min_entry_amount?: number | null
          name: string
          negotiation_rounds?: number | null
          requires_suppliers?: boolean | null
          sector?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          contract_type?: string | null
          country?: string | null
          created_at?: string | null
          creator_id?: string
          current_members?: number | null
          description?: string | null
          group_type?: string | null
          id?: string
          max_members?: number | null
          min_entry_amount?: number | null
          name?: string
          negotiation_rounds?: number | null
          requires_suppliers?: boolean | null
          sector?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      platform_services: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: string
          points_cost: number
          service_name: string
          service_type: string
          status: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          points_cost?: number
          service_name: string
          service_type: string
          status?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          points_cost?: number
          service_name?: string
          service_type?: string
          status?: string
        }
        Relationships: []
      }
      points_transactions: {
        Row: {
          created_at: string
          description: string
          id: string
          points_amount: number
          reference_id: string | null
          reference_type: string | null
          status: string
          transaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          points_amount: number
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          transaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          points_amount?: number
          reference_id?: string | null
          reference_type?: string | null
          status?: string
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          bio: string | null
          company: string | null
          country: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          full_name: string
          id: string
          phone: string | null
          skills: string | null
          updated_at: string | null
          user_role: string | null
        }
        Insert: {
          address?: string | null
          bio?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name: string
          id: string
          phone?: string | null
          skills?: string | null
          updated_at?: string | null
          user_role?: string | null
        }
        Update: {
          address?: string | null
          bio?: string | null
          company?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string
          id?: string
          phone?: string | null
          skills?: string | null
          updated_at?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          completed_at: string | null
          created_at: string
          group_id: string | null
          id: string
          points_paid: number
          request_details: Json | null
          service_id: string
          status: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
          points_paid?: number
          request_details?: Json | null
          service_id: string
          status?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          group_id?: string | null
          id?: string
          points_paid?: number
          request_details?: Json | null
          service_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "service_requests_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "platform_services"
            referencedColumns: ["id"]
          },
        ]
      }
      supplier_offers: {
        Row: {
          company_name: string | null
          created_at: string | null
          delivery_terms: string | null
          delivery_time: string | null
          description: string | null
          group_id: string | null
          id: string
          offer_description: string
          payment_terms: string | null
          price: number | null
          price_details: Json | null
          status: string | null
          supplier_id: string | null
          terms: string | null
          title: string | null
          valid_until: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          delivery_terms?: string | null
          delivery_time?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          offer_description: string
          payment_terms?: string | null
          price?: number | null
          price_details?: Json | null
          status?: string | null
          supplier_id?: string | null
          terms?: string | null
          title?: string | null
          valid_until?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          delivery_terms?: string | null
          delivery_time?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          offer_description?: string
          payment_terms?: string | null
          price?: number | null
          price_details?: Json | null
          status?: string | null
          supplier_id?: string | null
          terms?: string | null
          title?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_offers_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          available_points: number
          earned_points: number
          id: string
          spent_points: number
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_points?: number
          earned_points?: number
          id?: string
          spent_points?: number
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_points?: number
          earned_points?: number
          id?: string
          spent_points?: number
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          monthly_points_allowance: number
          paddle_subscription_id: string | null
          points_balance: number
          started_at: string
          status: string
          subscription_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          monthly_points_allowance?: number
          paddle_subscription_id?: string | null
          points_balance?: number
          started_at?: string
          status?: string
          subscription_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          monthly_points_allowance?: number
          paddle_subscription_id?: string | null
          points_balance?: number
          started_at?: string
          status?: string
          subscription_type?: string
          user_id?: string
        }
        Relationships: []
      }
      votes: {
        Row: {
          id: string
          option_selected: string
          user_id: string | null
          voted_at: string | null
          voting_session_id: string | null
        }
        Insert: {
          id?: string
          option_selected: string
          user_id?: string | null
          voted_at?: string | null
          voting_session_id?: string | null
        }
        Update: {
          id?: string
          option_selected?: string
          user_id?: string | null
          voted_at?: string | null
          voting_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "votes_voting_session_id_fkey"
            columns: ["voting_session_id"]
            isOneToOne: false
            referencedRelation: "voting_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_sessions: {
        Row: {
          created_at: string | null
          created_by: string | null
          deadline: string | null
          description: string | null
          group_id: string | null
          id: string
          options: Json
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options: Json
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          deadline?: string | null
          description?: string | null
          group_id?: string | null
          id?: string
          options?: Json
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "voting_sessions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
