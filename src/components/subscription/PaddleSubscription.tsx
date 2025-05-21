
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard, Shield, AlertCircle, Calendar } from 'lucide-react';
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
  features: PlanFeature[];
  recommended?: boolean;
  paddleProductId: string;
}

interface PaddleSubscriptionProps {
  currentPlanId?: string;
  onSubscribe?: (planId: string, interval: 'monthly' | 'yearly') => void;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'الأساسية',
    description: 'للمستخدمين الفرديين والمجموعات الصغيرة',
    price: { monthly: 29, yearly: 290 },
    paddleProductId: 'prod_123',
    features: [
      { title: 'إنشاء حتى 3 مجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'دمج نظام التصويت الأساسي', included: true },
      { title: 'دعم عبر البريد الإلكتروني', included: true },
      { title: 'تكامل Web3', included: false },
      { title: 'DAO وتحكم لامركزي', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'الاحترافية',
    description: 'للشركات والمجموعات المتوسطة الحجم',
    price: { monthly: 79, yearly: 790 },
    paddleProductId: 'prod_456',
    recommended: true,
    features: [
      { title: 'إنشاء حتى 10 مجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'دمج نظام التصويت الشامل', included: true },
      { title: 'دعم عبر البريد الإلكتروني والهاتف', included: true },
      { title: 'تكامل Web3', included: true },
      { title: 'DAO وتحكم لامركزي', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'المؤسسات',
    description: 'للمؤسسات والشركات الكبرى',
    price: { monthly: 199, yearly: 1990 },
    paddleProductId: 'prod_789',
    features: [
      { title: 'عدد غير محدود من المجموعات', included: true },
      { title: 'عدد غير محدود من العروض', included: true },
      { title: 'نظام تصويت متقدم مع API مخصص', included: true },
      { title: 'دعم متميز على مدار الساعة', included: true },
      { title: 'تكامل Web3', included: true },
      { title: 'DAO وتحكم لامركزي', included: true },
    ],
  },
];

const PaddleSubscription: React.FC<PaddleSubscriptionProps> = ({ currentPlanId, onSubscribe }) => {
  const { toast } = useToast();
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  
  const handleSubscribe = (planId: string) => {
    if (onSubscribe) {
      onSubscribe(planId, billingInterval);
    }
    
    toast({
      title: "بدء الاشتراك",
      description: `جاري تحويلك إلى بوابة الدفع لإتمام الاشتراك في الخطة ${plans.find(p => p.id === planId)?.name}`,
    });
    
    // In a real implementation, you would redirect to Paddle checkout
    // window.open(`https://your-paddle-checkout.com/${planId}/${billingInterval}`, '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">اختر خطة الاشتراك</h2>
        <p className="text-muted-foreground mt-2">اختر الخطة التي تناسب احتياجاتك</p>
        
        <div className="flex justify-center mt-6">
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const price = typeof plan.price === 'number' 
            ? plan.price 
            : (billingInterval === 'monthly' ? plan.price.monthly : plan.price.yearly);
          
          const isCurrentPlan = currentPlanId === plan.id;
          
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
                <div className="mb-6">
                  <div className="text-3xl font-bold">
                    {price} ريال
                    <span className="text-sm font-normal text-muted-foreground">
                      /{billingInterval === 'monthly' ? 'شهر' : 'سنة'}
                    </span>
                  </div>
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
                  disabled={isCurrentPlan}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {isCurrentPlan ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      الخطة الحالية
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
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
          <span>جميع المدفوعات مؤمنة بواسطة Paddle</span>
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
