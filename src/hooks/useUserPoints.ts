
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserPoints {
  id: string;
  user_id: string;
  total_points: number;
  available_points: number;
  earned_points: number;
  spent_points: number;
  updated_at: string;
}

export interface PointsTransaction {
  id: string;
  user_id: string;
  transaction_type: 'earn' | 'spend' | 'bonus' | 'refund';
  points_amount: number;
  description: string;
  reference_id?: string;
  reference_type?: string;
  status: string;
  created_at: string;
}

export const useUserPoints = () => {
  return useQuery({
    queryKey: ['user-points'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_points')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as UserPoints;
    },
  });
};

export const usePointsTransactions = () => {
  return useQuery({
    queryKey: ['points-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('points_transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PointsTransaction[];
    },
  });
};

export const useSpendPoints = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ 
      points, 
      description, 
      referenceId, 
      referenceType 
    }: { 
      points: number; 
      description: string; 
      referenceId?: string; 
      referenceType?: string; 
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data: userPoints } = await supabase
        .from('user_points')
        .select('available_points, spent_points')
        .eq('user_id', user.id)
        .single();

      if (!userPoints || userPoints.available_points < points) {
        throw new Error('نقاط غير كافية');
      }

      const { error: transactionError } = await supabase
        .from('points_transactions')
        .insert({
          user_id: user.id,
          transaction_type: 'spend',
          points_amount: -points,
          description,
          reference_id: referenceId,
          reference_type: referenceType,
        });

      if (transactionError) throw transactionError;

      const { error: updateError } = await supabase
        .from('user_points')
        .update({
          available_points: userPoints.available_points - points,
          spent_points: userPoints.spent_points + points,
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-points'] });
      queryClient.invalidateQueries({ queryKey: ['points-transactions'] });
      toast({
        title: "تم الدفع بنجاح",
        description: "تم خصم النقاط من محفظتك",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في الدفع",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
