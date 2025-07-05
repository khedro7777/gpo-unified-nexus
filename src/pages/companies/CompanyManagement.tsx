
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Users, FileText, TrendingUp, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const CompanyManagement = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const managementAreas = [
    {
      title: 'تأسيس شركة جديدة',
      description: 'إنشاء كيان قانوني جديد للأعمال',
      icon: Plus,
      action: () => navigate('/company-formation'),
      color: 'text-green-600'
    },
    {
      title: 'إدارة الشركات الحالية',
      description: 'عرض وإدارة الشركات التي تملكها أو تديرها',
      icon: Building,
      action: () => navigate('/companies'),
      color: 'text-blue-600'
    },
    {
      title: 'إدارة المساهمين',
      description: 'إدارة المساهمين وحصصهم في الشركات',
      icon: Users,
      action: () => navigate('/shareholders'),
      color: 'text-purple-600'
    },
    {
      title: 'الوثائق القانونية',
      description: 'عرض وإدارة جميع الوثائق القانونية للشركات',
      icon: FileText,
      action: () => navigate('/documents'),
      color: 'text-orange-600'
    },
    {
      title: 'التقارير المالية',
      description: 'عرض التقارير المالية وحالة الشركات',
      icon: TrendingUp,
      action: () => navigate('/financial-reports'),
      color: 'text-emerald-600'
    },
    {
      title: 'إعدادات الشركة',
      description: 'تحديث معلومات وإعدادات الشركات',
      icon: Settings,
      action: () => navigate('/company-settings'),
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">إدارة الشركات</h1>
        <p className="text-muted-foreground">
          إدارة شاملة لجميع الشركات والكيانات القانونية
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementAreas.map((area, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={area.action}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${area.color}`}>
                  <area.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{area.description}</CardDescription>
              <Button variant="outline" className="w-full">
                الانتقال إلى {area.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {role === 'founder' && (
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">أدوات المؤسسين المتقدمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={() => navigate('/company-incorporation')} className="h-auto p-4 justify-start">
              <Building className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">بوابة التأسيس المتقدم</div>
                <div className="text-sm opacity-70">أدوات متقدمة لتأسيس الشركات</div>
              </div>
            </Button>
            <Button onClick={() => navigate('/investment')} variant="outline" className="h-auto p-4 justify-start">
              <TrendingUp className="mr-2 h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">إدارة الاستثمارات</div>
                <div className="text-sm opacity-70">تتبع وإدارة الاستثمارات</div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;
