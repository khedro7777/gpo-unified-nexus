
-- إنشاء جدول تأسيس الشركات
CREATE TABLE public.company_formations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  company_type TEXT NOT NULL, -- 'llc', 'corporation', 'partnership', 'sole'
  formation_type TEXT NOT NULL DEFAULT 'individual', -- 'individual', 'group'
  jurisdiction TEXT NOT NULL,
  business_activity TEXT NOT NULL,
  number_of_shareholders INTEGER NOT NULL DEFAULT 1,
  estimated_capital TEXT,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'completed'
  group_id UUID REFERENCES public.groups(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول محفظة النقاط
CREATE TABLE public.user_points (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  total_points INTEGER NOT NULL DEFAULT 0,
  available_points INTEGER NOT NULL DEFAULT 0,
  earned_points INTEGER NOT NULL DEFAULT 0,
  spent_points INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول معاملات النقاط
CREATE TABLE public.points_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_type TEXT NOT NULL, -- 'earn', 'spend', 'bonus', 'refund'
  points_amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  reference_id UUID, -- يمكن أن يشير لمجموعة أو عرض أو خدمة
  reference_type TEXT, -- 'group', 'offer', 'service', 'task'
  status TEXT NOT NULL DEFAULT 'completed', -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول خدمات المنصة
CREATE TABLE public.platform_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name TEXT NOT NULL,
  service_type TEXT NOT NULL, -- 'automation', 'governance', 'ai', 'blockchain'
  description TEXT,
  points_cost INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'inactive', 'maintenance'
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول طلبات الخدمات
CREATE TABLE public.service_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.platform_services(id) ON DELETE CASCADE NOT NULL,
  group_id UUID REFERENCES public.groups(id) ON DELETE SET NULL,
  request_details JSONB,
  points_paid INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- إنشاء جدول الاشتراكات
CREATE TABLE public.user_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subscription_type TEXT NOT NULL, -- 'basic', 'premium', 'enterprise'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
  points_balance INTEGER NOT NULL DEFAULT 0,
  monthly_points_allowance INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  paddle_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- تفعيل Row Level Security على الجداول الجديدة
ALTER TABLE public.company_formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان لجدول تأسيس الشركات
CREATE POLICY "Users can view their own formation requests" 
  ON public.company_formations 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create formation requests" 
  ON public.company_formations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own formation requests" 
  ON public.company_formations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- سياسات الأمان لجدول النقاط
CREATE POLICY "Users can view their own points" 
  ON public.user_points 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own points record" 
  ON public.user_points 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own points" 
  ON public.user_points 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- سياسات الأمان لجدول معاملات النقاط
CREATE POLICY "Users can view their own points transactions" 
  ON public.points_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create points transactions" 
  ON public.points_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- سياسات الأمان لجدول خدمات المنصة (قراءة عامة)
CREATE POLICY "Anyone can view active services" 
  ON public.platform_services 
  FOR SELECT 
  USING (status = 'active');

-- سياسات الأمان لجدول طلبات الخدمات
CREATE POLICY "Users can view their own service requests" 
  ON public.service_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create service requests" 
  ON public.service_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- سياسات الأمان لجدول الاشتراكات
CREATE POLICY "Users can view their own subscriptions" 
  ON public.user_subscriptions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions" 
  ON public.user_subscriptions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions" 
  ON public.user_subscriptions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- إدراج بيانات أولية لخدمات المنصة
INSERT INTO public.platform_services (service_name, service_type, description, points_cost, features) VALUES
('نظام التصويت المتقدم', 'governance', 'نظام التصويت والحوكمة للقرارات الجماعية', 50, '{"voting": true, "governance": true, "dao": true}'),
('نظام الفوترة الذكي', 'automation', 'خدمة معالجة الاشتراكات والمدفوعات', 100, '{"billing": true, "subscriptions": true, "payments": true}'),
('إدارة الموارد', 'automation', 'تخطيط وإدارة موارد المؤسسات والمالية', 75, '{"resource_planning": true, "financial_management": true}'),
('منصة المداولات', 'governance', 'منصة المناقشات وبناء التوافق الجماعي', 30, '{"discussions": true, "consensus": true}'),
('نظام حل النزاعات', 'governance', 'حل النزاعات والتحكيم الرقمي المتقدم', 150, '{"dispute_resolution": true, "arbitration": true}'),
('مركز العقود الذكية', 'blockchain', 'إدارة ونشر العقود والاتفاقيات الذكية', 200, '{"smart_contracts": true, "blockchain": true}');

-- إنشاء دالة لتحديث النقاط تلقائياً
CREATE OR REPLACE FUNCTION public.update_user_points()
RETURNS TRIGGER AS $$
BEGIN
  -- إنشاء سجل نقاط للمستخدم الجديد
  IF TG_OP = 'INSERT' AND TG_TABLE_NAME = 'profiles' THEN
    INSERT INTO public.user_points (user_id, total_points, available_points)
    VALUES (NEW.id, 100, 100); -- نقاط ترحيبية
    
    -- إضافة معاملة النقاط الترحيبية
    INSERT INTO public.points_transactions (user_id, transaction_type, points_amount, description, reference_type)
    VALUES (NEW.id, 'bonus', 100, 'نقاط ترحيبية للمستخدم الجديد', 'welcome');
    
    RETURN NEW;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ربط الدالة بالمشغل
CREATE TRIGGER on_user_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_user_points();
