
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target,
  DollarSign, 
  PieChart, 
  Users
} from 'lucide-react';

/**
 * Investment Overview Component
 * Contains quick actions and recent activity
 */
const InvestmentOverview = () => {
  return (
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
  );
};

export default InvestmentOverview;
