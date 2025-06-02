
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

const CompanyFinancials = () => {
  const financialData = {
    revenue: {
      current: 540000,
      previous: 485000,
      growth: 11.3
    },
    expenses: {
      current: 320000,
      previous: 295000,
      growth: 8.5
    },
    profit: {
      current: 220000,
      previous: 190000,
      growth: 15.8
    },
    cashFlow: {
      current: 180000,
      previous: 165000,
      growth: 9.1
    }
  };

  const quarterlyData = [
    { quarter: 'Q1 2024', revenue: 120000, expenses: 75000, profit: 45000 },
    { quarter: 'Q2 2024', revenue: 135000, expenses: 80000, profit: 55000 },
    { quarter: 'Q3 2024', revenue: 145000, expenses: 85000, profit: 60000 },
    { quarter: 'Q4 2024', revenue: 140000, expenses: 80000, profit: 60000 }
  ];

  const shareholders = [
    { name: 'أحمد محمد علي', percentage: 25, dividends: 12500 },
    { name: 'سارة أحمد حسن', percentage: 20, dividends: 10000 },
    { name: 'محمد حسن إبراهيم', percentage: 15, dividends: 7500 },
    { name: 'فاطمة علي محمد', percentage: 10, dividends: 5000 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">الوضع المالي للشركة</h3>
          <p className="text-sm text-muted-foreground">
            التقارير المالية والأداء للعام الحالي
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">تصدير التقرير</Button>
          <Button size="sm">إنشاء تقرير جديد</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              الإيرادات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.revenue.current.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{financialData.revenue.growth}%</span>
              <span className="text-muted-foreground">من العام الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.expenses.current.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-red-600" />
              <span className="text-red-600">+{financialData.expenses.growth}%</span>
              <span className="text-muted-foreground">من العام الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">صافي الربح</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.profit.current.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{financialData.profit.growth}%</span>
              <span className="text-muted-foreground">من العام الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">التدفق النقدي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialData.cashFlow.current.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{financialData.cashFlow.growth}%</span>
              <span className="text-muted-foreground">من العام الماضي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              الأداء الربعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quarterlyData.map((quarter, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium text-sm">{quarter.quarter}</p>
                    <p className="text-xs text-muted-foreground">
                      الإيرادات: ${quarter.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm text-green-600">
                      +${quarter.profit.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">صافي الربح</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع الأرباح على المساهمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                إجمالي الأرباح المخصصة للتوزيع: <span className="font-medium">$50,000</span>
              </div>
              {shareholders.map((shareholder, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium text-sm">{shareholder.name}</p>
                    <p className="text-xs text-muted-foreground">
                      نسبة الملكية: {shareholder.percentage}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      ${shareholder.dividends.toLocaleString()}
                    </p>
                    <Badge variant="outline" className="text-xs">محول</Badge>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4">توزيع الأرباح الفصلية</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>التقارير المالية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">قائمة الدخل</h4>
              <p className="text-sm text-muted-foreground mb-3">
                التقرير الشهري لإيرادات ومصروفات الشركة
              </p>
              <Button size="sm" variant="outline" className="w-full">تحميل PDF</Button>
            </div>
            
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">الميزانية العمومية</h4>
              <p className="text-sm text-muted-foreground mb-3">
                بيان بالأصول والخصوم ورأس المال
              </p>
              <Button size="sm" variant="outline" className="w-full">تحميل PDF</Button>
            </div>
            
            <div className="p-4 border rounded">
              <h4 className="font-medium mb-2">قائمة التدفق النقدي</h4>
              <p className="text-sm text-muted-foreground mb-3">
                تتبع التدفقات النقدية الداخلة والخارجة
              </p>
              <Button size="sm" variant="outline" className="w-full">تحميل PDF</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyFinancials;
