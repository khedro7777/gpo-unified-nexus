
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  Calendar,
  Download
} from 'lucide-react';

const PortfolioManagement = () => {
  const portfolioData = [
    {
      id: 1,
      name: 'شركة التقنية المتقدمة',
      sector: 'تقنية',
      investment: 25000,
      currentValue: 32500,
      return: 30,
      status: 'نشط',
      lastUpdate: '2024-01-15'
    },
    {
      id: 2,
      name: 'المشروع الصناعي الأخضر',
      sector: 'طاقة',
      investment: 15000,
      currentValue: 17700,
      return: 18,
      status: 'نشط',
      lastUpdate: '2024-01-10'
    },
    {
      id: 3,
      name: 'سلسلة مطاعم صحية',
      sector: 'غذاء',
      investment: 8000,
      currentValue: 9200,
      return: 15,
      status: 'مكتمل',
      lastUpdate: '2023-12-20'
    }
  ];

  const totalInvestment = portfolioData.reduce((sum, item) => sum + item.investment, 0);
  const totalCurrentValue = portfolioData.reduce((sum, item) => sum + item.currentValue, 0);
  const totalReturn = ((totalCurrentValue - totalInvestment) / totalInvestment) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الاستثمار</p>
                <p className="text-2xl font-bold">${totalInvestment.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">القيمة الحالية</p>
                <p className="text-2xl font-bold text-green-600">${totalCurrentValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي العائد</p>
                <p className="text-2xl font-bold text-green-600">+{totalReturn.toFixed(1)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عدد الاستثمارات</p>
                <p className="text-2xl font-bold">{portfolioData.length}</p>
              </div>
              <PieChart className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="investments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="investments">استثماراتي</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="investments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>محفظة الاستثمارات</CardTitle>
              <CardDescription>تفاصيل جميع استثماراتك النشطة والمكتملة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.map((investment) => (
                  <div key={investment.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{investment.name}</h4>
                        <p className="text-sm text-muted-foreground">{investment.sector}</p>
                      </div>
                      <Badge variant={investment.status === 'نشط' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">المبلغ المستثمر</p>
                        <p className="font-semibold">${investment.investment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">القيمة الحالية</p>
                        <p className="font-semibold text-green-600">${investment.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">العائد</p>
                        <p className="font-semibold text-green-600">+{investment.return}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">آخر تحديث</p>
                        <p className="font-semibold text-sm">{investment.lastUpdate}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">عرض التفاصيل</Button>
                      <Button size="sm" variant="outline">تقرير الأداء</Button>
                      {investment.status === 'نشط' && (
                        <Button size="sm" variant="outline">زيادة الاستثمار</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أداء المحفظة</CardTitle>
              <CardDescription>تحليل أداء استثماراتك عبر الوقت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Performance by Sector */}
                <div>
                  <h4 className="font-semibold mb-4">الأداء حسب القطاع</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>تقنية</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20" />
                        <span className="text-green-600 font-semibold">+30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>طاقة</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20" />
                        <span className="text-green-600 font-semibold">+18%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>غذاء</span>
                      <div className="flex items-center gap-2">
                        <Progress value={50} className="w-20" />
                        <span className="text-green-600 font-semibold">+15%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Monthly Performance */}
                <div>
                  <h4 className="font-semibold mb-4">الأداء الشهري</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded">
                      <p className="text-sm text-muted-foreground">هذا الشهر</p>
                      <p className="text-lg font-bold text-green-600">+5.2%</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-sm text-muted-foreground">الشهر السابق</p>
                      <p className="text-lg font-bold text-green-600">+3.8%</p>
                    </div>
                    <div className="text-center p-3 border rounded">
                      <p className="text-sm text-muted-foreground">آخر 3 شهور</p>
                      <p className="text-lg font-bold text-green-600">+12.1%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                التقارير والوثائق
              </CardTitle>
              <CardDescription>تحميل التقارير المالية ووثائق الاستثمار</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-semibold">التقرير الشهري</p>
                        <p className="text-sm text-muted-foreground">يناير 2024</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-semibold">تقرير الأداء السنوي</p>
                        <p className="text-sm text-muted-foreground">2023</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-semibold">كشف حساب تفصيلي</p>
                        <p className="text-sm text-muted-foreground">آخر 6 شهور</p>
                      </div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5" />
                      <div className="text-left">
                        <p className="font-semibold">وثائق الاستثمار</p>
                        <p className="text-sm text-muted-foreground">جميع العقود</p>
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioManagement;
