
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Target,
  DollarSign, 
  PieChart, 
  Users,
  TrendingUp,
  Building2
} from 'lucide-react';

/**
 * Investment Overview Component
 * Contains quick actions and recent activity
 */
const InvestmentOverview = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: DollarSign,
      label: 'إنشاء استثمار جديد',
      description: 'بدء مشروع استثماري فردي أو جماعي',
      action: () => navigate('/create-group/investment'),
      color: 'text-green-600'
    },
    {
      icon: PieChart,
      label: 'عرض محفظتي',
      description: 'مراجعة الاستثمارات الحالية والأداء',
      action: () => navigate('/wallet'),
      color: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'انضمام لاستثمار جماعي',
      description: 'العثور على فرص استثمارية مشتركة',
      action: () => navigate('/groups?filter=investment'),
      color: 'text-purple-600'
    },
    {
      icon: Building2,
      label: 'تأسيس شركة',
      description: 'إنشاء كيان قانوني للاستثمار',
      action: () => navigate('/company-formation'),
      color: 'text-orange-600'
    }
  ];

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
          {quickActions.map((action, index) => (
            <Button 
              key={index}
              className="w-full justify-start h-auto p-4" 
              variant="outline"
              onClick={action.action}
            >
              <action.icon className={`h-5 w-5 mr-3 ${action.color}`} />
              <div className="text-right flex-1">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">استثمار في شركة التقنية المتقدمة</p>
                <p className="text-xs text-muted-foreground">منذ ساعتين</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate('/groups')}>
                عرض
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">توزيع أرباح من الشركة الصناعية</p>
                <p className="text-xs text-muted-foreground">أمس</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate('/wallet')}>
                عرض
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">تصويت على قرار مجلس الإدارة</p>
                <p className="text-xs text-muted-foreground">منذ 3 أيام</p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => navigate('/governance')}>
                عرض
              </Button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full" onClick={() => navigate('/notifications')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              عرض جميع الأنشطة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentOverview;
