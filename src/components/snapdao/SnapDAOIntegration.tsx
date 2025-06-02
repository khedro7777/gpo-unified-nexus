
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ExternalLink, Vote, Clock, CheckCircle } from 'lucide-react';

const SnapDAOIntegration = () => {
  const [connectedSpaces, setConnectedSpaces] = useState([
    {
      id: 'gpo-tech-llc',
      name: 'GPO Technology LLC',
      members: 12,
      proposals: 3,
      votingPower: 2500,
      status: 'active'
    }
  ]);

  const activeProposals = [
    {
      id: 'prop-001',
      title: 'زيادة رأس المال إلى 500,000 دولار',
      description: 'اقتراح لزيادة رأس المال لتمويل التوسع',
      author: 'ahmed.eth',
      created: '2024-05-20',
      end: '2024-05-27',
      votesFor: 1850,
      votesAgainst: 450,
      totalVotingPower: 2500,
      quorum: 51,
      status: 'active'
    },
    {
      id: 'prop-002', 
      title: 'تعديل النظام الأساسي للشركة',
      description: 'تعديل بعض بنود النظام الأساسي',
      author: 'sara.eth',
      created: '2024-05-18',
      end: '2024-05-25',
      votesFor: 1200,
      votesAgainst: 200,
      totalVotingPower: 2500,
      quorum: 75,
      status: 'active'
    }
  ];

  const getProposalProgress = (proposal: any) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    const supportPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
    const participationPercentage = (totalVotes / proposal.totalVotingPower) * 100;
    return { supportPercentage, participationPercentage };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">تكامل SnapDAO</h3>
          <p className="text-sm text-muted-foreground">
            إدارة التصويت اللامركزي والحوكمة عبر Snapshot
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          زيارة Snapshot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">المساحات المتصلة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedSpaces.length}</div>
            <p className="text-xs text-green-600">متصل ونشط</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">قوة التصويت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500</div>
            <p className="text-xs text-muted-foreground">إجمالي الرموز</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">الاقتراحات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProposals.length}</div>
            <p className="text-xs text-yellow-600">تحتاج تصويت</p>
          </CardContent>
        </Card>
      </div>

      {connectedSpaces.map((space) => (
        <Card key={space.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base">{space.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {space.members} عضو • {space.proposals} اقتراح نشط
                </p>
              </div>
              <Badge variant="default">متصل</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">قوة التصويت الخاصة بك</p>
                <p className="text-2xl font-bold">{space.votingPower.toLocaleString()}</p>
              </div>
              <Button variant="outline" size="sm">
                إدارة المساحة
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="space-y-4">
        <h4 className="text-lg font-medium">الاقتراحات النشطة</h4>
        {activeProposals.map((proposal) => {
          const { supportPercentage, participationPercentage } = getProposalProgress(proposal);
          const isQuorumMet = participationPercentage >= proposal.quorum;
          
          return (
            <Card key={proposal.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-base mb-2">{proposal.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>بواسطة: {proposal.author}</span>
                      <span>•</span>
                      <span>تم الإنشاء: {proposal.created}</span>
                      <span>•</span>
                      <span>ينتهي: {proposal.end}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    نشط
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>نسبة الموافقة</span>
                      <span>{supportPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={supportPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>موافق: {proposal.votesFor.toLocaleString()}</span>
                      <span>معارض: {proposal.votesAgainst.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>نسبة المشاركة</span>
                      <span>{participationPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={participationPercentage} 
                      className={`h-2 ${isQuorumMet ? 'text-green-600' : 'text-yellow-600'}`}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {isQuorumMet ? (
                        <span className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          تم الوصول للنصاب ({proposal.quorum}%)
                        </span>
                      ) : (
                        <span className="text-yellow-600">
                          يتطلب {proposal.quorum}% للنصاب
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                  <Button size="sm" className="flex-1">
                    <Vote className="h-4 w-4 mr-2" />
                    صوت موافق
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    صوت معارض
                  </Button>
                  <Button size="sm" variant="secondary" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    عرض في Snapshot
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إنشاء اقتراح جديد</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            يمكنك إنشاء اقتراح جديد للتصويت عليه من قبل أعضاء DAO
          </p>
          <Button>إنشاء اقتراح</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SnapDAOIntegration;
