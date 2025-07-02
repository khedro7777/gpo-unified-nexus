
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupSystem from '@/components/groups/GroupSystem';
import ActiveGroups from '@/components/groups/ActiveGroups';
import ServiceRequests from '@/components/services/ServiceRequests';
import ServicePurchase from '@/components/services/ServicePurchase';
import ServiceRequestsList from '@/components/services/ServiceRequestsList';
import { ShoppingCart, List, Settings } from 'lucide-react';

const ServicesContent = () => {
  const [serviceType, setServiceType] = useState<'all' | 'automation' | 'advanced'>('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">خدمات المنصة</h1>
        <Tabs value={serviceType} onValueChange={(value) => setServiceType(value as any)} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="automation">الأتمتة</TabsTrigger>
            <TabsTrigger value="advanced">المتقدمة</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <p className="text-muted-foreground">
        استعرض وأدر الخدمات المتكاملة لمنصة التعاون الذكي.
      </p>
      
      <Tabs defaultValue="purchase" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="purchase" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            متجر الخدمات
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <List className="h-4 w-4" />
            طلباتي
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            إدارة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="purchase">
          <ServicePurchase />
        </TabsContent>

        <TabsContent value="requests">
          <ServiceRequestsList />
        </TabsContent>

        <TabsContent value="management">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">نظام التصويت المتقدم</h3>
              <p className="text-sm text-muted-foreground mb-4">
                نظام التصويت والحوكمة للقرارات الجماعية.
              </p>
              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
                نشط
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">نظام الفوترة الذكي</h3>
              <p className="text-sm text-muted-foreground mb-4">
                خدمة معالجة الاشتراكات والمدفوعات.
              </p>
              <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full inline-block">
                يتطلب تكوين
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">إدارة الموارد</h3>
              <p className="text-sm text-muted-foreground mb-4">
                تخطيط وإدارة موارد المؤسسات والمالية.
              </p>
              <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
                متصل
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">منصة المداولات</h3>
              <p className="text-sm text-muted-foreground mb-4">
                منصة المناقشات وبناء التوافق الجماعي.
              </p>
              <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
                متاح
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">نظام حل النزاعات</h3>
              <p className="text-sm text-muted-foreground mb-4">
                حل النزاعات والتحكيم الرقمي المتقدم.
              </p>
              <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
                متاح
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">مركز العقود الذكية</h3>
              <p className="text-sm text-muted-foreground mb-4">
                إدارة ونشر العقود والاتفاقيات الذكية.
              </p>
              <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
                متاح
              </div>
            </Card>
          </div>
          
          <div className="mt-10">
            <ServiceRequests />
          </div>
          
          <div className="mt-10">
            <GroupSystem />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Services = () => {
  const tabs = [
    {
      id: 'services',
      title: 'خدمات المنصة',
      content: <ServicesContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default Services;
