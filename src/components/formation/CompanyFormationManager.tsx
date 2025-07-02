
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Calendar, User, Phone, Mail } from 'lucide-react';
import { useCompanyFormations } from '@/hooks/useCompanyFormation';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const CompanyFormationManager: React.FC = () => {
  const { data: formations, isLoading } = useCompanyFormations();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'في الانتظار';
      case 'approved':
        return 'موافق عليه';
      case 'completed':
        return 'مكتمل';
      case 'rejected':
        return 'مرفوض';
      default:
        return 'غير محدد';
    }
  };

  const getCompanyTypeLabel = (type: string) => {
    switch (type) {
      case 'llc':
        return 'شركة ذات مسؤولية محدودة';
      case 'corporation':
        return 'شركة مساهمة';
      case 'partnership':
        return 'شراكة';
      case 'sole':
        return 'مؤسسة فردية';
      default:
        return type;
    }
  };

  if (isLoading) {
    return <div className="text-center" dir="rtl">جاري التحميل...</div>;
  }

  if (!formations || formations.length === 0) {
    return (
      <div className="text-center py-12" dir="rtl">
        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طلبات تأسيس</h3>
        <p className="text-gray-600">لم تقم بإنشاء أي طلبات تأسيس شركات بعد</p>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">طلبات تأسيس الشركات</h2>
        <p className="text-gray-600">متابعة حالة طلبات تأسيس الشركات الخاصة بك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formations.map((formation) => (
          <Card key={formation.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {formation.company_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {getCompanyTypeLabel(formation.company_type)} - {formation.jurisdiction}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(formation.status)}>
                  {getStatusLabel(formation.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>{formation.number_of_shareholders} مساهم</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{format(new Date(formation.created_at), 'dd/MM/yyyy', { locale: ar })}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p><strong>النشاط التجاري:</strong> {formation.business_activity}</p>
                {formation.estimated_capital && (
                  <p><strong>رأس المال المتوقع:</strong> {formation.estimated_capital}</p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{formation.contact_email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{formation.contact_phone}</span>
                </div>
              </div>

              {formation.additional_notes && (
                <div className="border-t pt-4">
                  <p className="text-sm"><strong>ملاحظات إضافية:</strong></p>
                  <p className="text-sm text-gray-600 mt-1">{formation.additional_notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  تفاصيل أكثر
                </Button>
                {formation.status === 'pending' && (
                  <Button variant="destructive" size="sm">
                    إلغاء الطلب
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompanyFormationManager;
