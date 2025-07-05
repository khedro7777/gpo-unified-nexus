
-- Create group lifecycle table
CREATE TABLE public.group_lifecycle (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  current_phase TEXT NOT NULL DEFAULT 'pending_members',
  status TEXT NOT NULL DEFAULT 'awaiting_activation',
  visibility TEXT NOT NULL DEFAULT 'private',
  associated_gateway TEXT,
  target_country TEXT NOT NULL,
  current_round INTEGER NOT NULL DEFAULT 1,
  round_ends_at TIMESTAMP WITH TIME ZONE,
  settings JSONB NOT NULL DEFAULT '{"min_members_to_activate": 5, "max_admins_per_round": 3, "round_duration_days": 30, "require_voting_for_admins": true}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group roles table
CREATE TABLE public.group_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  assigned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  round_bound BOOLEAN NOT NULL DEFAULT false,
  round_number INTEGER
);

-- Create group votes table
CREATE TABLE public.group_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  vote_type TEXT NOT NULL DEFAULT 'proposal',
  options JSONB NOT NULL DEFAULT '[]',
  results JSONB,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  metadata JSONB
);

-- Create group phase transitions table
CREATE TABLE public.group_phase_transitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE NOT NULL,
  from_phase TEXT NOT NULL,
  to_phase TEXT NOT NULL,
  triggered_by UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.group_lifecycle ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_phase_transitions ENABLE ROW LEVEL SECURITY;

-- RLS policies for group_lifecycle
CREATE POLICY "Users can view group lifecycle" ON public.group_lifecycle
  FOR SELECT USING (
    group_id IN (
      SELECT id FROM public.groups 
      WHERE creator_id = auth.uid() OR status = 'active'
    ) OR 
    group_id IN (
      SELECT group_id FROM public.group_members 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Group creators can manage lifecycle" ON public.group_lifecycle
  FOR ALL USING (
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

-- RLS policies for group_roles
CREATE POLICY "Members can view group roles" ON public.group_roles
  FOR SELECT USING (
    group_id IN (
      SELECT group_id FROM public.group_members 
      WHERE user_id = auth.uid()
    ) OR 
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage roles" ON public.group_roles
  FOR ALL USING (
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

-- RLS policies for group_votes
CREATE POLICY "Members can view group votes" ON public.group_votes
  FOR SELECT USING (
    group_id IN (
      SELECT group_id FROM public.group_members 
      WHERE user_id = auth.uid()
    ) OR 
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage votes" ON public.group_votes
  FOR ALL USING (
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

-- RLS policies for group_phase_transitions
CREATE POLICY "Members can view transitions" ON public.group_phase_transitions
  FOR SELECT USING (
    group_id IN (
      SELECT group_id FROM public.group_members 
      WHERE user_id = auth.uid()
    ) OR 
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );

CREATE POLICY "Admins can create transitions" ON public.group_phase_transitions
  FOR INSERT WITH CHECK (
    group_id IN (
      SELECT id FROM public.groups WHERE creator_id = auth.uid()
    )
  );
