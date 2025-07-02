
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Play } from 'lucide-react';
import { useServiceRequests } from '@/hooks/usePlatformServices';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const ServiceRequestsList: React.FC = () => {
  const { data: serviceRequests, isLoading } = useServiceRequests();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'in_progress':
        return 'قيد التنفيذ';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'غير محدد';
    }
  };

  if (isLoading) {
    return <div className="text-center" dir="rtl">جاري التحميل...</div>;
  }

  if (!serviceRequests || serviceRequests.length === 0) {
    return (
      <div className="text-center py-12" dir="rtl">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات خدمات</h3>
        <p className="text-gray-600">لم تطلب أي خدمات بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">طلبات الخدمات</h2>
        <p className="text-gray-600">متابعة حالة طلبات الخدمات المرسلة</p>
      </div>

      <div className="space-y-4">
        {serviceRequests.map((request: any) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    {request.platform_services?.service_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {request.platform_services?.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {getStatusLabel(request.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">تاريخ الطلب:</span>
                  <p>{format(new Date(request.created_at), 'dd/MM/yyyy HH:mm', { locale: ar })}</p>
                </div>
                <div>
                  <span className="text-gray-500">النقاط المدفوعة:</span>
                  <p className="font-semibold">{request.points_paid} نقطة</p>
                </div>
              </div>

              {request.completed_at && (
                <div className="text-sm">
                  <span className="text-gray-500">تاريخ الإكمال:</span>
                  <p>{format(new Date(request.completed_at), 'dd/MM/yyyy HH:mm', { locale: ar })}</p>
                </div>
              )}

              {request.request_details && (
                <div className="border-t pt-4">
                  <span className="text-sm text-gray-500">تفاصيل الطلب:</span>
                  <p className="text-sm mt-1">{JSON.stringify(request.request_details, null, 2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequestsList;
