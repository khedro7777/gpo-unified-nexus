
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Shield, AlertCircle, Calendar, Star, Coins } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PlanFeature {
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number | { monthly: number; yearly: number };
  points: number | { monthly: number; yearly: number };
  features: PlanFeature[];
  recommended?: boolean;
  paddleProductId: string;
}

interface PaddleSubscriptionProps {
  currentPlanId?: string;
  userPoints?: number;
  onSubscribe?: (planId: string, interval: 'monthly' | 'yearly', paymentMethod: 'money' | 'points') => void;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'الأساسية',
    description: 'للمستخدمين الفرديين والمجموعات الصغيرة',
    price: { monthly: 29, yearly: 290 },
    points: { monthly: 300, yearly: 2900 },
    paddleProductId: 'prod_123',
    features: [
      { title: 'إنشاء حتى 3 مجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'دمج نظام التصويت الأساسي', included: true },
      { title: 'دعم عبر المراسلة', included: true },
      { title: 'تكامل الأنظمة المتقدمة', included: false },
      { title: 'إدارة لامركزية متقدمة', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'الاحترافية',
    description: 'للشركات والمجموعات المتوسطة الحجم',
    price: { monthly: 79, yearly: 790 },
    points: { monthly: 800, yearly: 7900 },
    paddleProductId: 'prod_456',
    recommended: true,
    features: [
      { title: 'إنشاء حتى 10 مجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'دمج نظام التصويت الشامل', included: true },
      { title: 'دعم عبر المراسلة والهاتف', included: true },
      { title: 'تكامل الأنظمة المتقدمة', included: true },
      { title: 'إدارة لامركزية متقدمة', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'المؤسسات',
    description: 'للمؤسسات والشركات الكبرى',
    price: { monthly: 199, yearly: 1990 },
    points: { monthly: 2000, yearly: 19900 },
    paddleProductId: 'prod_789',
    features: [
      { title: 'عدد غير محدود من المجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'نظام تصويت متقدم مع واجهة مخصصة', included: true },
      { title: 'دعم متميز على مدار الساعة', included: true },
      { title: 'تكامل الأنظمة المتقدمة', included: true },
      { title: 'إدارة لامركزية متقدمة', included: true },
    ],
  },
];

const PaddleSubscription: React.FC<PaddleSubscriptionProps> = ({ 
  currentPlanId, 
  userPoints = 2500, 
  onSubscribe 
}) => {
  const { toast } = useToast();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<'money' | 'points'>('money');
  
  const handleSubscribe = (planId: string, method: 'money' | 'points') => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;

    const requiredPoints = typeof plan.points === 'number' 
      ? plan.points 
      : (billingInterval === 'monthly' ? plan.points.monthly : plan.points.yearly);

    if (method === 'points' && userPoints < requiredPoints) {
      toast({
        title: "نقاط غير كافية",
        description: `تحتاج إلى ${requiredPoints - userPoints} نقطة إضافية`,
        variant: "destructive"
      });
      return;
    }
    
    if (onSubscribe) {
      onSubscribe(planId, billingInterval, method);
    }
    
    const paymentText = method === 'points' ? `${requiredPoints} نقطة` : 'بوابة الدفع';
    toast({
      title: "بدء الاشتراك",
      description: `جاري تحويلك إلى ${paymentText} لإتمام الاشتراك في الخطة ${plan.name}`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">اختر خطة الاشتراك</h2>
        <p className="text-muted-foreground mt-2">اختر الخطة التي تناسب احتياجاتك</p>
        
        <div className="flex justify-center mt-6 space-y-4">
          <div className="space-y-4">
            <Tabs
              value={billingInterval}
              onValueChange={(v) => setBillingInterval(v as 'monthly' | 'yearly')}
              className="w-full max-w-xs"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="monthly">شهري</TabsTrigger>
                <TabsTrigger value="yearly">
                  سنوي
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 text-xs">خصم 15%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as 'money' | 'points')}
              className="w-full max-w-xs"
            >
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="money" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  نقدي
                </TabsTrigger>
                <TabsTrigger value="points" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  نقاط
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {paymentMethod === 'points' && (
              <div className="flex items-center justify-center gap-2 text-sm bg-blue-50 p-2 rounded-lg">
                <Coins className="h-4 w-4 text-blue-600" />
                <span>رصيدك: {userPoints.toLocaleString()} نقطة</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = typeof plan.price === 'number' 
            ? plan.price 
            : (billingInterval === 'monthly' ? plan.price.monthly : plan.price.yearly);

          const points = typeof plan.points === 'number' 
            ? plan.points 
            : (billingInterval === 'monthly' ? plan.points.monthly : plan.points.yearly);
          
          const isCurrentPlan = currentPlanId === plan.id;
          const hasEnoughPoints = userPoints >= points;
          
          return (
            <Card 
              key={plan.id} 
              className={`flex flex-col ${plan.recommended ? 'border-primary shadow-md' : ''}`}
            >
              <CardHeader className={`${plan.recommended ? 'bg-primary/5' : ''}`}>
                {plan.recommended && (
                  <Badge className="w-fit mb-2">الأكثر شعبية</Badge>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6 space-y-2">
                  {paymentMethod === 'money' ? (
                    <div className="text-3xl font-bold">
                      {price} ريال
                      <span className="text-sm font-normal text-muted-foreground">
                        /{billingInterval === 'monthly' ? 'شهر' : 'سنة'}
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold flex items-center gap-2">
                      <Star className="h-8 w-8 text-yellow-500" />
                      {points.toLocaleString()} نقطة
                      <span className="text-sm font-normal text-muted-foreground">
                        /{billingInterval === 'monthly' ? 'شهر' : 'سنة'}
                      </span>
                    </div>
                  )}
                  
                  {paymentMethod === 'points' && !hasEnoughPoints && (
                    <p className="text-sm text-red-600">
                      تحتاج إلى {(points - userPoints).toLocaleString()} نقطة إضافية
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-muted-foreground/30"></div>
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.recommended ? "default" : "outline"}
                  disabled={isCurrentPlan || (paymentMethod === 'points' && !hasEnoughPoints)}
                  onClick={() => handleSubscribe(plan.id, paymentMethod)}
                >
                  {isCurrentPlan ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      الخطة الحالية
                    </>
                  ) : paymentMethod === 'points' && !hasEnoughPoints ? (
                    'نقاط غير كافية'
                  ) : (
                    <>
                      {paymentMethod === 'money' ? (
                        <CreditCard className="mr-2 h-4 w-4" />
                      ) : (
                        <Star className="mr-2 h-4 w-4" />
                      )}
                      اختيار هذه الخطة
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      <div className="flex flex-col items-center justify-center mt-6 text-center max-w-xl mx-auto space-y-4">
        <div className="flex items-center text-sm">
          <Shield className="h-4 w-4 mr-2 text-green-600" />
          <span>جميع المدفوعات مؤمنة ومحمية</span>
        </div>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-green-600" />
          <span>يمكنك إلغاء اشتراكك في أي وقت</span>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 p-3 rounded-md">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="text-xs">الأسعار لا تشمل ضريبة القيمة المضافة. سيتم إضافة الضريبة وفقًا للقوانين المحلية في بلدك.</p>
        </div>
      </div>
    </div>
  );
};

export default PaddleSubscription;
