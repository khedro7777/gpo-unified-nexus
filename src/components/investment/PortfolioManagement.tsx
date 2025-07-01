
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from 'lucide-react';

/**
 * Portfolio Management Component
 * Displays and manages user's investment portfolio
 * Features: Performance tracking, investment overview, detailed analytics
 */
const PortfolioManagement = () => {
  // Sample portfolio data
  const portfolioData = {
    totalValue: 125000,
    totalInvested: 100000,
    totalReturn: 25000,
    returnPercentage: 25,
    activeInvestments: 8,
    completedInvestments: 3
  };

  const investments = [
    {
      id: 'port-001',
      title: 'صندوق التكنولوجيا المالية',
      amount: 45000,
      currentValue: 58500,
      return: 13500,
      returnPercentage: 30,
      status: 'نشط',
      duration: '18 شهر',
      riskLevel: 'متوسط'
    },
    {
      id: 'port-002',
      title: 'مشروع التجارة الإلكترونية',
      amount: 25000,
      currentValue: 31000,
      return: 6000,
      returnPercentage: 24,
      status: 'نشط',
      duration: '12 شهر',
      riskLevel: 'عالي'
    },
    {
      id: 'port-003',
      title: 'صندوق العقارات',
      amount: 30000,
      currentValue: 35500,
      return: 5500,
      returnPercentage: 18.3,
      status: 'مكتمل',
      duration: '24 شهر',
      riskLevel: 'منخفض'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">إجمالي المحفظة</p>
              <p className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</p>
            </div>
            <PieChart className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">المبلغ المستثمر</p>
              <p className="text-2xl font-bold">${portfolioData.totalInvested.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">إجمالي الأرباح</p>
              <p className="text-2xl font-bold text-green-600">
                +${portfolioData.totalReturn.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">نسبة العائد</p>
              <p className="text-2xl font-bold text-green-600">
                +{portfolioData.returnPercentage}%
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Portfolio Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            أداء المحفظة
          </CardTitle>
          <CardDescription>
            إجمالي الأداء: {portfolioData.activeInvestments} استثمارات نشطة، {portfolioData.completedInvestments} مكتملة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>تقدم المحفظة</span>
                <span>{portfolioData.returnPercentage}%</span>
              </div>
              <Progress value={portfolioData.returnPercentage} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-700">الاستثمارات الرابحة</p>
                <p className="text-2xl font-bold text-green-600">85%</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="font-semibold text-blue-700">متوسط العائد</p>
                <p className="text-2xl font-bold text-blue-600">22%</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="font-semibold text-purple-700">أفضل استثمار</p>
                <p className="text-2xl font-bold text-purple-600">30%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Details */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الاستثمارات</CardTitle>
          <CardDescription>جميع استثماراتك النشطة والمكتملة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{investment.title}</h3>
                      <Badge variant={investment.status === 'نشط' ? 'default' : 'secondary'}>
                        {investment.status}
                      </Badge>
                      <Badge variant="outline" className={`${
                        investment.riskLevel === 'عالي' ? 'text-red-600 border-red-200' :
                        investment.riskLevel === 'متوسط' ? 'text-yellow-600 border-yellow-200' :
                        'text-green-600 border-green-200'
                      }`}>
                        {investment.riskLevel}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">المبلغ المستثمر: </span>
                        <span className="font-medium">${investment.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">القيمة الحالية: </span>
                        <span className="font-medium">${investment.currentValue.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الربح: </span>
                        <span className="font-medium text-green-600">
                          +${investment.return.toLocaleString()} ({investment.returnPercentage}%)
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">المدة: </span>
                        <span className="font-medium">{investment.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                    {investment.status === 'نشط' && (
                      <Button size="sm">
                        إدارة الاستثمار
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>الرسم البياني للأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">سيتم عرض الرسم البياني للأداء هنا</p>
              <Badge variant="secondary" className="mt-2">قريباً</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioManagement;
