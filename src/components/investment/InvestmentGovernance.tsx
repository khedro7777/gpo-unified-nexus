
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Vote, FileText, Users, ExternalLink } from 'lucide-react';

/**
 * Investment Governance Component
 * Handles governance and voting functionality
 */
const InvestmentGovernance = () => {
  const navigate = useNavigate();

  const activeVotes = [
    {
      id: 1,
      title: 'موافقة على الميزانية السنوية',
      description: 'التصويت على ميزانية الشركة للعام القادم',
      status: 'active',
      deadline: '2024-01-15',
      action: () => navigate('/governance?vote=budget-2024')
    },
    {
      id: 2,
      title: 'تعيين مدير تنفيذي جديد',
      description: 'نتيجة التصويت: موافقة بنسبة 78%',
      status: 'completed',
      result: '78% موافقة',
      action: () => navigate('/governance?vote=ceo-appointment')
    }
  ];

  const governanceActions = [
    {
      title: 'إنشاء اقتراح جديد',
      description: 'تقديم اقتراح للتصويت من المساهمين',
      icon: FileText,
      action: () => navigate('/governance?action=create-proposal')
    },
    {
      title: 'عرض جميع التصويتات',
      description: 'مراجعة تاريخ القرارات والتصويتات',
      icon: Vote,
      action: () => navigate('/governance')
    },
    {
      title: 'إدارة المساهمين',
      description: 'عرض وإدارة قائمة المساهمين',
      icon: Users,
      action: () => navigate('/groups?tab=members')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Governance Header */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {governanceActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-right"
                onClick={action.action}
              >
                <action.icon className="h-5 w-5 mb-2 text-primary" />
                <div className="font-medium">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Votes */}
      <Card>
        <CardHeader>
          <CardTitle>التصويتات النشطة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeVotes.map((vote) => (
              <div key={vote.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{vote.title}</h4>
                  <Badge variant={vote.status === 'active' ? 'default' : 'secondary'}>
                    {vote.status === 'active' ? 'قيد التصويت' : 'مكتمل'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {vote.description}
                </p>
                {vote.result && (
                  <p className="text-sm font-medium text-green-600 mb-3">
                    النتيجة: {vote.result}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" onClick={vote.action}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {vote.status === 'active' ? 'التصويت' : 'عرض النتائج'}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/governance')}>
                    عرض التفاصيل
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {activeVotes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">لا توجد تصويتات نشطة حالياً</p>
              <Button onClick={() => navigate('/governance?action=create-proposal')}>
                إنشاء اقتراح جديد
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentGovernance;
