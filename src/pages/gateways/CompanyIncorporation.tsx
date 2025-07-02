
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, FileText, History } from 'lucide-react';
import CompanyIncorporationGateway from '@/components/gateways/CompanyIncorporationGateway';
import CompanyFormationManager from '@/components/formation/CompanyFormationManager';

const CompanyIncorporation = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6" dir="rtl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Building className="h-8 w-8 text-primary" />
            تأسيس الشركات
          </h1>
          <p className="text-gray-600 mt-1">
            تأسيس شركتك في أفضل الولايات القضائية مع دعم قانوني شامل
          </p>
        </div>

        <Tabs defaultValue="new-formation" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="new-formation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              طلب تأسيس جديد
            </TabsTrigger>
            <TabsTrigger value="my-formations" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              طلباتي السابقة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-formation">
            <CompanyIncorporationGateway />
          </TabsContent>

          <TabsContent value="my-formations">
            <CompanyFormationManager />
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default CompanyIncorporation;
