
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GroupSystem from '@/components/groups/GroupSystem';
import ActiveGroups from '@/components/groups/ActiveGroups';
import ServiceRequests from '@/components/services/ServiceRequests';

const ServicesContent = () => {
  const [serviceType, setServiceType] = useState<'all' | 'web2' | 'web3'>('all');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">خدمات المنصة</h1>
        <Tabs value={serviceType} onValueChange={(value) => setServiceType(value as any)} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="web2">WEB2</TabsTrigger>
            <TabsTrigger value="web3">WEB3</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <p className="text-muted-foreground">
        استعرض وأدر الخدمات المتكاملة لمنصة GPO.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">تكامل SnapDAO</h3>
          <p className="text-sm text-muted-foreground mb-4">
            الاتصال بـ SnapDAO للحوكمة ووظائف التصويت.
          </p>
          <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
            نشط
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">فوترة Paddle</h3>
          <p className="text-sm text-muted-foreground mb-4">
            خدمة معالجة الاشتراك والدفع.
          </p>
          <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full inline-block">
            يتطلب تكوين
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">ERPNext</h3>
          <p className="text-sm text-muted-foreground mb-4">
            تخطيط موارد المؤسسات للإدارة المالية.
          </p>
          <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
            متصل
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">Loomio</h3>
          <p className="text-sm text-muted-foreground mb-4">
            منصة المداولات وبناء التوافق.
          </p>
          <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
            متاح
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">نظام ODR</h3>
          <p className="text-sm text-muted-foreground mb-4">
            حل النزاعات عبر الإنترنت للتحكيم.
          </p>
          <div className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full inline-block">
            متاح
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-2">مركز العقود الذكية</h3>
          <p className="text-sm text-muted-foreground mb-4">
            إدارة ونشر عقود DAO الذكية.
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
