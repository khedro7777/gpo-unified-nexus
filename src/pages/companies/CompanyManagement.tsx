
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Users, Gavel, TrendingUp, FileText, Vote } from 'lucide-react';
import CompanyOverview from '@/components/companies/CompanyOverview';
import ShareholderManagement from '@/components/companies/ShareholderManagement';
import BoardVoting from '@/components/companies/BoardVoting';
import CompanyFinancials from '@/components/companies/CompanyFinancials';

const CompanyManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إدارة الشركة</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              إدارة شركة التقنية المتقدمة المحدودة
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="default">نشطة</Badge>
            <Badge variant="outline">LLC</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المساهمين</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-green-600">+2 هذا الشهر</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">رأس المال</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$250K</div>
              <p className="text-xs text-muted-foreground">مدفوع بالكامل</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">اقتراحات نشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-yellow-600">2 تحتاج تصويت</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">الإيرادات الشهرية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45K</div>
              <p className="text-xs text-green-600">+15% من الشهر الماضي</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs md:text-sm">
              <Building className="h-4 w-4 mr-1 md:mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="shareholders" className="text-xs md:text-sm">
              <Users className="h-4 w-4 mr-1 md:mr-2" />
              المساهمون
            </TabsTrigger>
            <TabsTrigger value="voting" className="text-xs md:text-sm">
              <Vote className="h-4 w-4 mr-1 md:mr-2" />
              التصويت
            </TabsTrigger>
            <TabsTrigger value="financials" className="text-xs md:text-sm">
              <TrendingUp className="h-4 w-4 mr-1 md:mr-2" />
              الماليات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <CompanyOverview />
          </TabsContent>

          <TabsContent value="shareholders" className="space-y-6">
            <ShareholderManagement />
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <BoardVoting />
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <CompanyFinancials />
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default CompanyManagement;
