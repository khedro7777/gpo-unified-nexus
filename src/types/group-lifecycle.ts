
export interface GroupLifecycle {
  id: string;
  group_id: string;
  current_phase: 'pending_members' | 'negotiation' | 'contracting' | 'under_arbitration' | 'completed';
  status: 'awaiting_activation' | 'active' | 'paused' | 'completed';
  visibility: 'private' | 'public';
  associated_gateway?: string;
  target_country: string;
  current_round: number;
  round_ends_at?: string;
  settings: GroupSettings;
  created_at: string;
  updated_at: string;
}

export interface GroupSettings {
  min_members_to_activate: number;
  max_admins_per_round: number;
  round_duration_days: number;
  require_voting_for_admins: boolean;
}

export interface GroupRole {
  id: string;
  group_id: string;
  user_id: string;
  role: 'member' | 'admin' | 'creator';
  assigned_at: string;
  expires_at?: string;
  round_bound: boolean;
  round_number?: number;
  profiles?: {
    full_name?: string;
    email?: string;
  };
}

export interface GroupVote {
  id: string;
  group_id: string;
  title: string;
  description?: string;
  vote_type: 'admin_election' | 'proposal' | 'contract_approval';
  options: any;
  results?: any;
  status: 'active' | 'completed' | 'expired';
  created_at: string;
  expires_at: string;
  metadata?: any;
}

export interface VoteOption {
  id: string;
  text: string;
  votes_count: number;
}

export interface GroupPhaseTransition {
  id: string;
  group_id: string;
  from_phase: string;
  to_phase: string;
  triggered_by?: string;
  reason: string;
  created_at: string;
}
