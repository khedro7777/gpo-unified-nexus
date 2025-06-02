
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, CheckCircle, XCircle, Users } from 'lucide-react';

const BoardVoting = () => {
  const proposals = [
    {
      id: 1,
      title: 'زيادة رأس المال بمبلغ 500,000 دولار',
      description: 'اقتراح لزيادة رأس المال لتمويل التوسع في السوق الأوروبي',
      proposer: 'أحمد محمد علي',
      createdDate: '2024-05-15',
      endDate: '2024-05-30',
      status: 'active',
      votesFor: 7,
      votesAgainst: 2,
      abstain: 1,
      totalVoters: 12,
      requiredMajority: 75
    },
    {
      id: 2,
      title: 'تعيين مدير تقني جديد',
      description: 'اقتراح تعيين مدير تقني للإشراف على فريق التطوير',
      proposer: 'سارة أحمد حسن',
      createdDate: '2024-05-18',
      endDate: '2024-06-02',
      status: 'active',
      votesFor: 5,
      votesAgainst: 1,
      abstain: 0,
      totalVoters: 12,
      requiredMajority: 51
    },
    {
      id: 3,
      title: 'اعتماد الميزانية السنوية للعام 2025',
      description: 'اعتماد الميزانية المقترحة للعام المالي 2025',
      proposer: 'محمد حسن إبراهيم',
      createdDate: '2024-05-10',
      endDate: '2024-05-25',
      status: 'passed',
      votesFor: 9,
      votesAgainst: 1,
      abstain: 2,
      totalVoters: 12,
      requiredMajority: 51
    }
  ];

  const getProposalStatus = (proposal: any) => {
    const votedCount = proposal.votesFor + proposal.votesAgainst + proposal.abstain;
    const approvalPercentage = (proposal.votesFor / votedCount) * 100;
    
    if (proposal.status === 'passed') return { status: 'passed', label: 'تم التمرير', color: 'default' };
    if (proposal.status === 'rejected') return { status: 'rejected', label: 'مرفوض', color: 'destructive' };
    if (votedCount === proposal.totalVoters) {
      return approvalPercentage >= proposal.requiredMajority 
        ? { status: 'passed', label: 'تم التمرير', color: 'default' }
        : { status: 'rejected', label: 'مرفوض', color: 'destructive' };
    }
    return { status: 'active', label: 'قيد التصويت', color: 'secondary' };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">التصويت ومجلس الإدارة</h3>
          <p className="text-sm text-muted-foreground">
            إدارة اقتراحات مجلس الإدارة والتصويت عليها
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Vote className="h-4 w-4" />
          اقتراح جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">الاقتراحات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">تحتاج تصويت</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">معدل المشاركة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">83%</div>
            <p className="text-xs text-green-600">أعلى من المعدل المطلوب</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">الاقتراحات المقبولة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {proposals.filter(p => p.status === 'passed').length}
            </div>
            <p className="text-xs text-muted-foreground">هذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal) => {
          const statusInfo = getProposalStatus(proposal);
          const votedCount = proposal.votesFor + proposal.votesAgainst + proposal.abstain;
          const participationRate = (votedCount / proposal.totalVoters) * 100;
          const approvalRate = votedCount > 0 ? (proposal.votesFor / votedCount) * 100 : 0;

          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-base mb-2">{proposal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>مقترح من: {proposal.proposer}</span>
                      <span>•</span>
                      <span>تاريخ الإنشاء: {proposal.createdDate}</span>
                      <span>•</span>
                      <span>تنتهي في: {proposal.endDate}</span>
                    </div>
                  </div>
                  <Badge variant={statusInfo.color as any}>{statusInfo.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>معدل الموافقة</span>
                      <span>{approvalRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={approvalRate} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      يتطلب {proposal.requiredMajority}% للموافقة
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>معدل المشاركة</span>
                      <span>{participationRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={participationRate} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      {votedCount} من {proposal.totalVoters} صوتوا
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>موافق: {proposal.votesFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>معارض: {proposal.votesAgainst}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span>ممتنع: {proposal.abstain}</span>
                  </div>
                </div>

                {proposal.status === 'active' && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                    <Button size="sm" className="flex-1">
                      موافق
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      معارض
                    </Button>
                    <Button size="sm" variant="secondary" className="flex-1">
                      ممتنع
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default BoardVoting;
