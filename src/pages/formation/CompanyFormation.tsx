
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

const CompanyFormation = () => {
  const [formationType, setFormationType] = useState<'individual' | 'group'>('individual');
  const [companyType, setCompanyType] = useState<'llc' | 'corporation'>('llc');

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">تأسيس الشركات</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          تأسيس شركات المسؤولية المحدودة والشركات المساهمة وفقاً للمعايير العالمية
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card 
            className={`cursor-pointer transition-all ${formationType === 'individual' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFormationType('individual')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="h-5 w-5" />
                تأسيس فردي
              </CardTitle>
              <CardDescription>تأسيس شركة بشكل فردي مع إمكانية إضافة شركاء لاحقاً</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className={`cursor-pointer transition-all ${formationType === 'group' ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setFormationType('group')}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                تأسيس جماعي
              </CardTitle>
              <CardDescription>تأسيس شركة بمشاركة عدة أعضاء مع نظام تصويت</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={companyType} onValueChange={(value) => setCompanyType(value as 'llc' | 'corporation')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="llc">شركة ذات مسؤولية محدودة (LLC)</TabsTrigger>
            <TabsTrigger value="corporation">شركة مساهمة (Corporation)</TabsTrigger>
          </TabsList>

          <TabsContent value="llc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات شركة المسؤولية المحدودة</CardTitle>
                <CardDescription>
                  أدخل المعلومات المطلوبة لتأسيس شركة ذات مسؤولية محدودة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LLCFormationForm formationType={formationType} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="corporation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الشركة المساهمة</CardTitle>
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

        {formationType === 'group' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                حالة التصويت والموافقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormationProgress />
            </CardContent>
          </Card>
        )}
      </div>
    </NewMainLayout>
  );
};

export default CompanyFormation;
