
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, CheckCircle } from 'lucide-react';
import { usePlatformServices, useRequestService } from '@/hooks/usePlatformServices';
import { useSpendPoints, useUserPoints } from '@/hooks/useUserPoints';

const ServicePurchase: React.FC = () => {
  const { data: services, isLoading } = usePlatformServices();
  const { data: userPoints } = useUserPoints();
  const requestService = useRequestService();
  const spendPoints = useSpendPoints();

  const handlePurchaseService = async (serviceId: string, pointsCost: number, serviceName: string) => {
    if (!userPoints || userPoints.available_points < pointsCost) {
      return;
    }

    try {
      await spendPoints.mutateAsync({
        points: pointsCost,
        description: `شراء خدمة: ${serviceName}`,
        referenceId: serviceId,
        referenceType: 'service',
      });

      await requestService.mutateAsync({
        serviceId,
        pointsCost,
      });
    } catch (error) {
      console.error('Error purchasing service:', error);
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'automation':
        return 'bg-blue-100 text-blue-800';
      case 'governance':
        return 'bg-green-100 text-green-800';
      case 'ai':
        return 'bg-purple-100 text-purple-800';
      case 'blockchain':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'automation':
        return 'أتمتة';
      case 'governance':
        return 'حوكمة';
      case 'ai':
        return 'ذكاء اصطناعي';
      case 'blockchain':
        return 'بلوك تشين';
      default:
        return 'عام';
    }
  };

  if (isLoading) {
    return <div className="text-center">جاري التحميل...</div>;
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">متجر الخدمات</h2>
        <p className="text-gray-600">اشتر الخدمات باستخدام النقاط من محفظتك</p>
        {userPoints && (
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">{userPoints.available_points} نقطة متاحة</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services?.map((service) => {
          const canAfford = userPoints && userPoints.available_points >= service.points_cost;
          
          return (
            <Card key={service.id} className={`${!canAfford ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.service_name}</CardTitle>
                    <CardDescription className="mt-1">{service.description}</CardDescription>
                  </div>
                  <Badge className={getServiceTypeColor(service.service_type)}>
                    {getServiceTypeLabel(service.service_type)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold text-lg">{service.points_cost} نقطة</span>
                  </div>
                  {service.status === 'active' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>

                {service.features && (
                  <div className="text-sm text-gray-600">
                    <p>المميزات المتضمنة:</p>
                    <ul className="list-disc list-inside mt-1">
                      {Object.entries(service.features).map(([key, value]) => (
                        value && <li key={key}>{key.replace('_', ' ')}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={!canAfford || requestService.isPending || spendPoints.isPending}
                  onClick={() => handlePurchaseService(service.id, service.points_cost, service.service_name)}
                >
                  {requestService.isPending || spendPoints.isPending ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full ml-2" />
                      جاري الشراء...
                    </>
                  ) : !canAfford ? (
                    'نقاط غير كافية'
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 ml-2" />
                      شراء الخدمة
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServicePurchase;
