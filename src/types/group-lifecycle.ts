
export interface GroupLifecycle {
  id: string;
  group_id: string;
  current_phase: 'pending_members' | 'negotiation' | 'contracting' | 'under_arbitration' | 'completed';
  status: 'awaiting_activation' | 'active' | 'paused' | 'completed';
  visibility: 'private' | 'public';
  associated_gateway?: string;
  target_country: string;
  current_round: number;
  round_ends_at?: Date;
  settings: GroupSettings;
  created_at: Date;
  updated_at: Date;
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
  assigned_at: Date;
  expires_at?: Date;
  round_bound: boolean;
  round_number?: number;
}

export interface GroupVote {
  id: string;
  group_id: string;
  title: string;
  description: string;
  vote_type: 'admin_election' | 'proposal' | 'contract_approval';
  options: VoteOption[];
  results?: any;
  status: 'active' | 'completed' | 'expired';
  created_at: Date;
  expires_at: Date;
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
  triggered_by: string;
  reason: string;
  created_at: Date;
}
