
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CompanyFormation {
  id: string;
  user_id: string;
  company_name: string;
  company_type: 'llc' | 'corporation' | 'partnership' | 'sole';
  formation_type: 'individual' | 'group';
  jurisdiction: string;
  business_activity: string;
  number_of_shareholders: number;
  estimated_capital?: string;
  contact_email: string;
  contact_phone: string;
  additional_notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  group_id?: string;
  created_at: string;
  updated_at: string;
}

export const useCompanyFormations = () => {
  return useQuery({
    queryKey: ['company-formations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_formations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CompanyFormation[];
    },
  });
};

export const useCreateCompanyFormation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (formationData: Omit<CompanyFormation, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'status'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data, error } = await supabase
        .from('company_formations')
        .insert({
          ...formationData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-formations'] });
      toast({
        title: "تم إرسال طلب التأسيس",
        description: "سيتم مراجعة طلبك والرد عليك قريباً",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في إرسال الطلب",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
