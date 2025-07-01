
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Vote, 
  FileText, 
  PieChart,
  Target,
  BarChart3,
  Shield
} from 'lucide-react';
import InvestmentForm from './InvestmentForm';
import PortfolioManagement from './PortfolioManagement';

/**
 * Investment Gateway Component
 * Main interface for investment and company management
 * Features: Investment creation, portfolio management, governance
 */
const InvestmentGateway = () => {
  const [investmentType, setInvestmentType] = useState<'individual' | 'group'>('group');
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'governance'>('create');

  // Sample investment opportunities
  const investmentOpportunities = [
    {
      id: 'inv-001',
      title: 'صندوق التكنولوجيا المالية',
      description: 'استثمار في الشركات الناشئة في مجال التكنولوجيا المالية',
      targetAmount: 500000,
      currentAmount: 340000,
      investors: 24,
      expectedReturn: '15-25%',
      duration: '3-5 سنوات',
      riskLevel: 'متوسط',
      status: 'مفتوح'
    },
    {
      id: 'inv-002',
      title: 'مشروع التجارة الإلكترونية',
      description: 'منصة تجارة إلكترونية متخصصة في المنتجات المحلية',
      targetAmount: 250000,
      currentAmount: 180000,
      investors: 15,
      expectedReturn: '20-30%',
      duration: '2-3 سنوات',
      riskLevel: 'عالي',
      status: 'مفتوح'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Investment type selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card 
          className={`cursor-pointer transition-all ${investmentType === 'individual' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setInvestmentType('individual')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5" />
              استثمار فردي
            </CardTitle>
            <CardDescription>إنشاء وإدارة استثمارات فردية مع إمكانية إضافة شركاء لاحقاً</CardDescription>
          </CardHeader>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${investmentType === 'group' ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setInvestmentType('group')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" />
              استثمار جماعي
            </CardTitle>
            <CardDescription>تجميع رؤوس الأموال من عدة مستثمرين مع نظام حوكمة متقدم</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Main tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            إنشاء استثمار
          </TabsTrigger>
          <TabsTrigger value="manage" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            إدارة المحفظة
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center gap-2">
            <Vote className="h-4 w-4" />
            الحوكمة والتصويت
          </TabsTrigger>
        </TabsList>

        {/* Create Investment Tab */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold">نمو متوقع</h3>
              <p className="text-sm text-muted-foreground">15-30% سنوياً</p>
            </Card>
            <Card className="p-4 text-center">
              <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold">حماية المستثمرين</h3>
              <p className="text-sm text-muted-foreground">ضمانات قانونية</p>
            </Card>
            <Card className="p-4 text-center">
              <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold">تنويع المحفظة</h3>
              <p className="text-sm text-muted-foreground">قطاعات متعددة</p>
            </Card>
            <Card className="p-4 text-center">
              <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold">شفافية كاملة</h3>
              <p className="text-sm text-muted-foreground">تقارير دورية</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>إنشاء فرصة استثمارية جديدة</CardTitle>
              <CardDescription>
                أدخل تفاصيل الاستثمار المطلوب إنشاؤه
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentForm investmentType={investmentType} />
            </CardContent>
          </Card>

          {/* Investment opportunities */}
          <div>
            <h3 className="text-xl font-bold mb-4">الفرص الاستثمارية المتاحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investmentOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {opportunity.description}
                        </CardDescription>
                      </div>
                      <Badge variant={opportunity.status === 'مفتوح' ? 'default' : 'secondary'}>
                        {opportunity.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>التقدم</span>
                          <span>{Math.round((opportunity.currentAmount / opportunity.targetAmount) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${(opportunity.currentAmount / opportunity.targetAmount) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>${opportunity.currentAmount.toLocaleString()}</span>
                          <span>${opportunity.targetAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Investment details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">المستثمرون: </span>
                          <span className="font-medium">{opportunity.investors}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">العائد المتوقع: </span>
                          <span className="font-medium text-green-600">{opportunity.expectedReturn}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المدة: </span>
                          <span className="font-medium">{opportunity.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المخاطر: </span>
                          <Badge variant="outline" className={`text-xs ${
                            opportunity.riskLevel === 'عالي' ? 'text-red-600 border-red-200' :
                            opportunity.riskLevel === 'متوسط' ? 'text-yellow-600 border-yellow-200' :
                            'text-green-600 border-green-200'
                          }`}>
                            {opportunity.riskLevel}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <DollarSign className="h-4 w-4 mr-2" />
                          استثمر الآن
                        </Button>
                        <Button variant="outline">
                          عرض التفاصيل
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Portfolio Management Tab */}
        <TabsContent value="manage">
          <PortfolioManagement />
        </TabsContent>

        {/* Governance Tab */}
        <TabsContent value="governance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                حوكمة المحفظة الاستثمارية
              </CardTitle>
              <CardDescription>
                إدارة التصويت واتخاذ القرارات الاستثمارية الجماعية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">نظام الحوكمة المتقدم</h3>
                <p className="text-muted-foreground mb-4">
                  سيتم دمج نظام التصويت مع Snapshot.js و Loomio لاتخاذ القرارات الاستثمارية
                </p>
                <Badge variant="secondary">قريباً</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestmentGateway;
