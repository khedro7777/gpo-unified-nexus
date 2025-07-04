
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

/**
 * Investment Governance Component
 * Handles governance and voting functionality
 */
const InvestmentGovernance = () => {
  return (
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
  );
};

export default InvestmentGovernance;
