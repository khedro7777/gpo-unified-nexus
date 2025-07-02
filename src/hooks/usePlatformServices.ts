
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PlatformService {
  id: string;
  service_name: string;
  service_type: 'automation' | 'governance' | 'ai' | 'blockchain';
  description?: string;
  points_cost: number;
  status: 'active' | 'inactive' | 'maintenance';
  features?: any;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  user_id: string;
  service_id: string;
  group_id?: string;
  request_details?: any;
  points_paid: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  completed_at?: string;
}

export const usePlatformServices = () => {
  return useQuery({
    queryKey: ['platform-services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('platform_services')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PlatformService[];
    },
  });
};

export const useServiceRequests = () => {
  return useQuery({
    queryKey: ['service-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_requests')
        .select(`
          *,
          platform_services (
            service_name,
            service_type,
            description
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useRequestService = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      serviceId,
      groupId,
      requestDetails,
      pointsCost,
    }: {
      serviceId: string;
      groupId?: string;
      requestDetails?: any;
      pointsCost: number;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('المستخدم غير مسجل الدخول');

      const { data, error } = await supabase
        .from('service_requests')
        .insert({
          user_id: user.id,
          service_id: serviceId,
          group_id: groupId,
          request_details: requestDetails,
          points_paid: pointsCost,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['service-requests'] });
      toast({
        title: "تم طلب الخدمة بنجاح",
        description: "سيتم معالجة طلبك قريباً",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "خطأ في طلب الخدمة",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
