
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Users, BarChart3, Store, Building, FileCheck, Gavel, CodeSquare } from 'lucide-react';

const portals = [
  {
    id: 'cooperative-purchasing',
    title: 'الشراء التعاوني',
    description: 'تجميع المشتريات للحصول على أفضل الأسعار والشروط',
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: true
  },
  {
    id: 'group-marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية موحدة مع مشاركة التكلفة والفوائد',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false
  },
  {
    id: 'freelancers',
    title: 'بوابة المستقلين',
    description: 'فرص عمل للمستقلين مع إدارة العقود والمدفوعات',
    icon: <Users className="h-10 w-10 text-primary" />,
    link: '/dao',
    hasCollective: true
  },
  {
    id: 'suppliers',
    title: 'بوابة الموردين',
    description: 'تقديم المنتجات والخدمات للشركات والتعاونيات',
    icon: <Store className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false
  },
  {
    id: 'company-formation',
    title: 'تأسيس الشركات والجمعيات',
    description: 'إنشاء الكيانات القانونية والتعاونية بسهولة',
    icon: <Building className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false
  },
  {
    id: 'verification',
    title: 'الاستعلام والتوثيق',
    description: 'خدمات التحقق من المعلومات وتوثيق المستندات',
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false
  },
  {
    id: 'arbitration',
    title: 'التحكيم وفض المنازعات',
    description: 'حل النزاعات بطرق عادلة وفعالة',
    icon: <Gavel className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false
  },
  {
    id: 'smart-contracts',
    title: 'مكتبة العقود الذكية',
    description: 'نماذج عقود ذكية جاهزة للاستخدام',
    icon: <CodeSquare className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false
  }
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">منصة GPO MCP الذكية</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            البوابة الموحدة للخدمات التعاونية والإدارة الجماعية
          </p>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <h3 className="font-medium">فلترة الخدمات</h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 px-3">
                  WEB2
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3">
                  WEB3
                </Button>
                <Button size="sm" variant="outline" className="h-8 px-3">
                  جميع الخدمات
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {portals.map((portal) => (
            <Card key={portal.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {portal.icon}
                  {portal.hasCollective && (
                    <Tabs defaultValue="individual" className="w-auto">
                      <TabsList className="h-7">
                        <TabsTrigger className="text-xs h-6 px-2" value="individual">فردي</TabsTrigger>
                        <TabsTrigger className="text-xs h-6 px-2" value="collective">جماعي</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  )}
                </div>
                <CardTitle className="mt-4 text-right">{portal.title}</CardTitle>
                <CardDescription className="text-right">{portal.description}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex justify-center pt-0 pb-4">
                <Button asChild>
                  <Link to={portal.link}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
