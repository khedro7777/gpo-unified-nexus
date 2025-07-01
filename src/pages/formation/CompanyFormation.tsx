
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, FileText, Gavel } from 'lucide-react';
import LLCFormationForm from '@/components/formation/LLCFormationForm';
import CorporationFormationForm from '@/components/formation/CorporationFormationForm';
import FormationProgress from '@/components/formation/FormationProgress';

/**
 * Company Formation Page - صفحة تأسيس الشركات
 * Handles both individual and group company formation
 * Supports LLC and Corporation formation types
 */
const CompanyFormation = () => {
  const [formationType, setFormationType] = useState<'individual' | 'group'>('individual');
  const [companyType, setCompanyType] = useState<'llc' | 'corporation'>('llc');

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="text-center md:text-right">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            تأسيس الشركات
          </h1>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            تأسيس شركات المسؤولية المحدودة والشركات المساهمة وفقاً للمعايير العالمية
          </p>
        </div>

        {/* Formation Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              formationType === 'individual' ? 'ring-2 ring-primary shadow-md' : ''
            }`}
            onClick={() => setFormationType('individual')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5 text-blue-600" />
                تأسيس فردي
              </CardTitle>
              <CardDescription>
                تأسيس شركة بشكل فردي مع إمكانية إضافة شركاء لاحقاً
              </CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${
              formationType === 'group' ? 'ring-2 ring-primary shadow-md' : ''
            }`}
            onClick={() => setFormationType('group')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-green-600" />
                تأسيس جماعي
              </CardTitle>
              <CardDescription>
                تأسيس شركة بمشاركة عدة أعضاء مع نظام تصويت
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Company Type Tabs */}
        <Tabs value={companyType} onValueChange={(value) => setCompanyType(value as 'llc' | 'corporation')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="llc" className="text-sm">
              شركة ذات مسؤولية محدودة (LLC)
            </TabsTrigger>
            <TabsTrigger value="corporation" className="text-sm">
              شركة مساهمة (Corporation)
            </TabsTrigger>
          </TabsList>

          {/* LLC Formation Tab */}
          <TabsContent value="llc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  معلومات شركة المسؤولية المحدودة
                </CardTitle>
                <CardDescription>
                  أدخل المعلومات المطلوبة لتأسيس شركة ذات مسؤولية محدودة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LLCFormationForm formationType={formationType} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Corporation Formation Tab */}
          <TabsContent value="corporation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  معلومات الشركة المساهمة
                </CardTitle>
                <CardDescription>
                  أدخل المعلومات المطلوبة لتأسيس شركة مساهمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CorporationFormationForm formationType={formationType} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Group Formation Progress */}
        {formationType === 'group' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                حالة التصويت والموافقة
              </CardTitle>
              <CardDescription>
                تتبع حالة التصويت على تأسيس الشركة من قبل الأعضاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormationProgress />
            </CardContent>
          </Card>
        )}

        {/* Formation Benefits */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">مزايا التأسيس عبر المنصة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-800">توثيق قانوني</h4>
                <p className="text-sm text-blue-600">جميع الوثائق معتمدة قانونياً</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-800">تأسيس جماعي</h4>
                <p className="text-sm text-green-600">إمكانية التأسيس مع شركاء</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gavel className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-800">تحكيم ORDA</h4>
                <p className="text-sm text-purple-600">حل النزاعات بين الشركاء</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default CompanyFormation;
