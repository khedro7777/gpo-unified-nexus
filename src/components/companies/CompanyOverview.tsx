
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Calendar, FileText } from 'lucide-react';

const CompanyOverview = () => {
  const companyData = {
    name: 'شركة التقنية المتقدمة المحدودة',
    type: 'LLC',
    registrationNumber: 'LLC-2024-001234',
    incorporationDate: '2024-03-15',
    registeredAddress: '123 شارع التقنية، مدينة الابتكار، كاليفورنيا 90210',
    businessPurpose: 'تطوير وتسويق الحلول التقنية المتقدمة في مجال الذكاء الاصطناعي والتطبيقات الذكية',
    status: 'active',
    employees: 25,
    branches: 2
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            معلومات الشركة الأساسية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">اسم الشركة</label>
              <p className="text-sm font-medium">{companyData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">نوع الشركة</label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{companyData.type}</p>
                <Badge variant="outline">شركة ذات مسؤولية محدودة</Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">رقم التسجيل</label>
              <p className="text-sm font-mono">{companyData.registrationNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">تاريخ التأسيس</label>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{companyData.incorporationDate}</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">العنوان المسجل</label>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <p className="text-sm">{companyData.registeredAddress}</p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground">نشاط الشركة</label>
            <p className="text-sm">{companyData.businessPurpose}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">حالة الشركة</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="mb-2">نشطة</Badge>
            <p className="text-xs text-muted-foreground">جميع التقارير محدثة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الموظفون</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyData.employees}</div>
            <p className="text-xs text-green-600">+3 هذا الربع</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">الفروع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyData.branches}</div>
            <p className="text-xs text-muted-foreground">كاليفورنيا ونيويورك</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            الوثائق والملفات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium text-sm">عقد التأسيس</p>
                <p className="text-xs text-muted-foreground">آخر تحديث: 15 مارس 2024</p>
              </div>
              <Button size="sm" variant="outline">تحميل</Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium text-sm">اللوائح الداخلية</p>
                <p className="text-xs text-muted-foreground">آخر تحديث: 20 مارس 2024</p>
              </div>
              <Button size="sm" variant="outline">تحميل</Button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <p className="font-medium text-sm">شهادة التأسيس</p>
                <p className="text-xs text-muted-foreground">صادرة في: 15 مارس 2024</p>
              </div>
              <Button size="sm" variant="outline">تحميل</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyOverview;
