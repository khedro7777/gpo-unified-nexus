
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GroupLifecycle, GroupRole, GroupVote } from '@/types/group-lifecycle';

export const useGroupLifecycle = (groupId: string) => {
  const [lifecycle, setLifecycle] = useState<GroupLifecycle | null>(null);
  const [roles, setRoles] = useState<GroupRole[]>([]);
  const [activeVotes, setActiveVotes] = useState<GroupVote[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (groupId) {
      fetchGroupLifecycle();
      fetchGroupRoles();
      fetchActiveVotes();
    }
  }, [groupId]);

  const fetchGroupLifecycle = async () => {
    try {
      const { data, error } = await supabase
        .from('group_lifecycle')
        .select('*')
        .eq('group_id', groupId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setLifecycle(data);
    } catch (error) {
      console.error('Error fetching group lifecycle:', error);
    }
  };

  const fetchGroupRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('group_roles')
        .select(`
          *,
          profiles(full_name, email)
        `)
        .eq('group_id', groupId)
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      setRoles(data || []);
    } catch (error) {
      console.error('Error fetching group roles:', error);
    }
  };

  const fetchActiveVotes = async () => {
    try {
      const { data, error } = await supabase
        .from('group_votes')
        .select('*')
        .eq('group_id', groupId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setActiveVotes(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching active votes:', error);
      setLoading(false);
    }
  };

  const initializeGroupLifecycle = async (creatorId: string, gateway: string, country: string) => {
    try {
      // Create lifecycle record
      const { data: lifecycleData, error: lifecycleError } = await supabase
        .from('group_lifecycle')
        .insert({
          group_id: groupId,
          current_phase: 'pending_members',
          status: 'awaiting_activation',
          visibility: 'private',
          associated_gateway: gateway,
          target_country: country,
          current_round: 1,
          settings: {
            min_members_to_activate: 5,
            max_admins_per_round: 3,
            round_duration_days: 30,
            require_voting_for_admins: true
          }
        })
        .select()
        .single();

      if (lifecycleError) throw lifecycleError;

      // Set creator as member (not admin initially)
      const { error: roleError } = await supabase
        .from('group_roles')
        .insert({
          group_id: groupId,
          user_id: creatorId,
          role: 'member',
          round_bound: false
        });

      if (roleError) throw roleError;

      setLifecycle(lifecycleData);
      await fetchGroupRoles();

      toast({
        title: "تم إنشاء المجموعة",
        description: "تم تهيئة دورة حياة المجموعة بنجاح",
      });

    } catch (error) {
      console.error('Error initializing group lifecycle:', error);
      toast({
        title: "خطأ",
        description: "فشل في تهيئة دورة حياة المجموعة",
        variant: "destructive",
      });
    }
  };

  const checkActivationThreshold = async () => {
    if (!lifecycle) return;

    try {
      const { data: memberCount, error } = await supabase
        .from('group_members')
        .select('id', { count: 'exact' })
        .eq('group_id', groupId)
        .eq('status', 'active');

      if (error) throw error;

      const currentMembers = memberCount?.length || 0;
      
      if (currentMembers >= lifecycle.settings.min_members_to_activate && 
          lifecycle.status === 'awaiting_activation') {
        await activateGroup();
      }
    } catch (error) {
      console.error('Error checking activation threshold:', error);
    }
  };

  const activateGroup = async () => {
    try {
      // Update group status
      const { error: updateError } = await supabase
        .from('group_lifecycle')
        .update({
          status: 'active',
          current_phase: 'negotiation',
          visibility: 'public',
          updated_at: new Date().toISOString()
        })
        .eq('group_id', groupId);

      if (updateError) throw updateError;

      // Create admin election vote
      await createAdminElectionVote();

      toast({
        title: "تم تفعيل المجموعة",
        description: "بدأت مرحلة التفاوض. يرجى انتخاب المديرين",
      });

      await fetchGroupLifecycle();
    } catch (error) {
      console.error('Error activating group:', error);
    }
  };

  const createAdminElectionVote = async () => {
    try {
      const { data: members, error: membersError } = await supabase
        .from('group_members')
        .select(`
          user_id,
          profiles(full_name)
        `)
        .eq('group_id', groupId)
        .eq('status', 'active');

      if (membersError) throw membersError;

      const options = members?.map((member, index) => ({
        id: `option_${index}`,
        text: member.profiles?.full_name || `عضو ${index + 1}`,
        votes_count: 0
      })) || [];

      const roundEndDate = new Date();
      roundEndDate.setDate(roundEndDate.getDate() + (lifecycle?.settings.round_duration_days || 30));

      const { error: voteError } = await supabase
        .from('group_votes')
        .insert({
          group_id: groupId,
          title: 'انتخاب مديري الجولة',
          description: 'اختر 3 أعضاء ليكونوا مديري المجموعة المؤقتين لهذه الجولة',
          vote_type: 'admin_election',
          options: options,
          status: 'active',
          expires_at: roundEndDate.toISOString(),
          metadata: {
            round_bound: true,
            max_selection: 3,
            round_number: lifecycle?.current_round || 1
          }
        });

      if (voteError) throw voteError;
      await fetchActiveVotes();
    } catch (error) {
      console.error('Error creating admin election vote:', error);
    }
  };

  const transitionPhase = async (newPhase: GroupLifecycle['current_phase'], reason: string) => {
    if (!lifecycle) return;

    try {
      const { error: transitionError } = await supabase
        .from('group_phase_transitions')
        .insert({
          group_id: groupId,
          from_phase: lifecycle.current_phase,
          to_phase: newPhase,
          triggered_by: (await supabase.auth.getUser()).data.user?.id,
          reason: reason
        });

      if (transitionError) throw transitionError;

      const { error: updateError } = await supabase
        .from('group_lifecycle')
        .update({
          current_phase: newPhase,
          updated_at: new Date().toISOString()
        })
        .eq('group_id', groupId);

      if (updateError) throw updateError;

      await fetchGroupLifecycle();

      toast({
        title: "تم تغيير المرحلة",
        description: `تم الانتقال إلى مرحلة: ${newPhase}`,
      });
    } catch (error) {
      console.error('Error transitioning phase:', error);
    }
  };

  const startNewRound = async () => {
    if (!lifecycle) return;

    try {
      const newRoundNumber = lifecycle.current_round + 1;
      const roundEndDate = new Date();
      roundEndDate.setDate(roundEndDate.getDate() + lifecycle.settings.round_duration_days);

      // Clear previous round admins
      const { error: clearRolesError } = await supabase
        .from('group_roles')
        .update({ expires_at: new Date().toISOString() })
        .eq('group_id', groupId)
        .eq('role', 'admin')
        .eq('round_bound', true);

      if (clearRolesError) throw clearRolesError;

      // Update lifecycle
      const { error: updateError } = await supabase
        .from('group_lifecycle')
        .update({
          current_round: newRoundNumber,
          round_ends_at: roundEndDate.toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('group_id', groupId);

      if (updateError) throw updateError;

      // Create new admin election
      await createAdminElectionVote();

      toast({
        title: "بدأت جولة جديدة",
        description: `الجولة رقم ${newRoundNumber} - يرجى انتخاب مديرين جدد`,
      });

      await fetchGroupLifecycle();
      await fetchGroupRoles();
    } catch (error) {
      console.error('Error starting new round:', error);
    }
  };

  return {
    lifecycle,
    roles,
    activeVotes,
    loading,
    initializeGroupLifecycle,
    checkActivationThreshold,
    transitionPhase,
    startNewRound,
    refreshData: () => {
      fetchGroupLifecycle();
      fetchGroupRoles();
      fetchActiveVotes();
    }
  };
};
