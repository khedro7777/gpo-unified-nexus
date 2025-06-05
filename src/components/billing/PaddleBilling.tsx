
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaddleBillingProps {
  userId?: string;
}

const PaddleBilling: React.FC<PaddleBillingProps> = ({ userId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: isRTL ? 'الأساسية' : 'Basic',
      price: '$9.99',
      features: [
        isRTL ? 'حتى 5 مجموعات' : 'Up to 5 groups',
        isRTL ? 'دعم أساسي' : 'Basic support',
        isRTL ? 'تصويت أساسي' : 'Basic voting'
      ]
    },
    {
      id: 'pro',
      name: isRTL ? 'الاحترافية' : 'Pro',
      price: '$29.99',
      features: [
        isRTL ? 'مجموعات غير محدودة' : 'Unlimited groups',
        isRTL ? 'دعم الأولوية' : 'Priority support',
        isRTL ? 'تصويت متقدم' : 'Advanced voting',
        isRTL ? 'تحليلات متقدمة' : 'Advanced analytics'
      ]
    },
    {
      id: 'enterprise',
      name: isRTL ? 'المؤسسية' : 'Enterprise',
      price: '$99.99',
      features: [
        isRTL ? 'جميع مزايا Pro' : 'All Pro features',
        isRTL ? 'دعم مخصص' : 'Custom support',
        isRTL ? 'تكامل API' : 'API integration',
        isRTL ? 'العقود الذكية' : 'Smart contracts'
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    try {
      // Paddle checkout integration would go here
      console.log(`Subscribing to plan: ${planId}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update subscriptions state
      setSubscriptions(prev => [...prev, { planId, status: 'active' }]);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isSubscribed = (planId: string) => {
    return subscriptions.some(sub => sub.planId === planId && sub.status === 'active');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          {isRTL ? 'خطط الاشتراك' : 'Subscription Plans'}
        </h2>
        <p className="text-muted-foreground">
          {isRTL ? 'اختر الخطة المناسبة لاحتياجاتك' : 'Choose the plan that fits your needs'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative">
            {isSubscribed(plan.id) && (
              <Badge className="absolute top-4 right-4 bg-green-500">
                <Check className="h-3 w-3 mr-1" />
                {isRTL ? 'نشط' : 'Active'}
              </Badge>
            )}
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {plan.name}
              </CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">
                  {isRTL ? '/شهر' : '/month'}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading || isSubscribed(plan.id)}
              >
                {loading ? (
                  isRTL ? 'جاري المعالجة...' : 'Processing...'
                ) : isSubscribed(plan.id) ? (
                  isRTL ? 'مشترك' : 'Subscribed'
                ) : (
                  isRTL ? 'اشترك الآن' : 'Subscribe Now'
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaddleBilling;
