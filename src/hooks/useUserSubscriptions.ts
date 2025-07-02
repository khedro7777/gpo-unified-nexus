
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserSubscription {
  id: string;
  user_id: string;
  subscription_type: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  points_balance: number;
  monthly_points_allowance: number;
  started_at: string;
  expires_at?: string;
  paddle_subscription_id?: string;
  created_at: string;
}

export const useUserSubscription = () => {
  return useQuery({
    queryKey: ['user-subscription'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('status', 'active')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as UserSubscription | null;
    },
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      subscriptionType,
      pointsAllowance,
      paddleSubscriptionId,
    }: {
      subscriptionType: 'basic' | 'premium' | 'enterprise';
      pointsAllowance: number;
      paddleSubscriptionId?: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data, error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          subscription_type: subscriptionType,
          points_balance: pointsAllowance,
          monthly_points_allowance: pointsAllowance,
          paddle_subscription_id: paddleSubscriptionId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
      toast({
        title: "تم تفعيل الاشتراك",
        description: "مرحباً بك في خطة الاشتراك الجديدة",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في تفعيل الاشتراك",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
