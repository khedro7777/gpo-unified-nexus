
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  PieChart, 
  DollarSign, 
  BarChart3,
  Target,
  Shield
} from 'lucide-react';
import InvestmentForm from './InvestmentForm';
import PortfolioManagement from './PortfolioManagement';

/**
 * Investment Gateway Component - مكون بوابة الاستثمار
 * Handles investment opportunities, portfolio management, and company governance
 */
const InvestmentGateway = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Investment Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600">إجمالي الاستثمارات</p>
                <p className="text-lg font-bold text-blue-800">$2.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-green-600">الشركات النشطة</p>
                <p className="text-lg font-bold text-green-800">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600">المستثمرون</p>
                <p className="text-lg font-bold text-purple-800">247</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-orange-600">العائد المتوقع</p>
                <p className="text-lg font-bold text-orange-800">+18.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Investment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="opportunities">فرص الاستثمار</TabsTrigger>
          <TabsTrigger value="portfolio">محفظتي</TabsTrigger>
          <TabsTrigger value="governance">الحوكمة</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  إجراءات سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="h-4 w-4 mr-2" />
                  إنشاء استثمار جديد
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PieChart className="h-4 w-4 mr-2" />
                  عرض محفظتي
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  انضمام لاستثمار جماعي
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">استثمار في شركة التقنية المتقدمة</p>
                      <p className="text-xs text-muted-foreground">منذ ساعتين</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">توزيع أرباح من الشركة الصناعية</p>
                      <p className="text-xs text-muted-foreground">أمس</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">تصويت على قرار مجلس الإدارة</p>
                      <p className="text-xs text-muted-foreground">منذ 3 أيام</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investment Opportunities */}
        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>فرص الاستثمار المتاحة</CardTitle>
              <CardDescription>
                استثمارات جماعية وفردية متنوعة في قطاعات مختلفة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Management */}
        <TabsContent value="portfolio" className="space-y-6">
          <PortfolioManagement />
        </TabsContent>

        {/* Governance */}
        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                نظام الحوكمة والتصويت
              </CardTitle>
              <CardDescription>
                إدارة القرارات والتصويت على مسائل الشركات المستثمر بها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">موافقة على الميزانية السنوية</h4>
                    <Badge variant="outline">قيد التصويت</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    التصويت على ميزانية الشركة للعام القادم
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">عرض التفاصيل</Button>
                    <Button size="sm">التصويت</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">تعيين مدير تنفيذي جديد</h4>
                    <Badge variant="secondary">مكتمل</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    نتيجة التصويت: موافقة بنسبة 78%
                  </p>
                  <Button size="sm" variant="outline">عرض النتائج</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentGateway;
