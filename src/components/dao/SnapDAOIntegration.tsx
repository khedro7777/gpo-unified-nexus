
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vote, 
  Users, 
  Coins, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed' | 'pending';
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
  endDate: string;
  proposer: string;
  type: 'governance' | 'treasury' | 'technical';
}

interface DAOStats {
  totalMembers: number;
  activeProposals: number;
  treasuryBalance: number;
  votingPower: number;
}

const SnapDAOIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('proposals');
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  const daoStats: DAOStats = {
    totalMembers: 234,
    activeProposals: 5,
    treasuryBalance: 125000,
    votingPower: 1500
  };

  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'تحديث آلية توزيع الأرباح',
      description: 'اقتراح لتعديل نظام توزيع الأرباح ليكون أكثر عدالة للأعضاء الجدد والقدامى',
      status: 'active',
      votes: { for: 156, against: 23, abstain: 12 },
      endDate: '2024-02-01',
      proposer: 'أحمد محمد',
      type: 'governance'
    },
    {
      id: '2',
      title: 'استثمار في مشروع التكنولوجيا الجديد',
      description: 'اقتراح لاستثمار 50,000 ريال من خزينة DAO في مشروع تقني واعد',
      status: 'active',
      votes: { for: 89, against: 67, abstain: 18 },
      endDate: '2024-01-28',
      proposer: 'فاطمة علي',
      type: 'treasury'
    },
    {
      id: '3',
      title: 'ترقية النظام التقني للمنصة',
      description: 'ترقية البنية التحتية وإضافة ميزات جديدة لتحسين تجربة المستخدم',
      status: 'passed',
      votes: { for: 198, against: 15, abstain: 8 },
      endDate: '2024-01-15',
      proposer: 'خالد أحمد',
      type: 'technical'
    }
  ];

  const getStatusColor = (status: Proposal['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Proposal['status']) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'passed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleVote = (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
    // Logic to submit vote to SnapDAO
    console.log(`Voting ${vote} on proposal ${proposalId}`);
  };

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? Math.round((votes / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* DAO Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
                <p className="text-xl font-bold">{daoStats.totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">المقترحات النشطة</p>
                <p className="text-xl font-bold">{daoStats.activeProposals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-600">رصيد الخزينة</p>
                <p className="text-xl font-bold">{daoStats.treasuryBalance.toLocaleString()} ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">قوة التصويت</p>
                <p className="text-xl font-bold">{daoStats.votingPower}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            إدارة DAO والتصويت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="proposals">المقترحات</TabsTrigger>
              <TabsTrigger value="governance">الحوكمة</TabsTrigger>
              <TabsTrigger value="treasury">الخزينة</TabsTrigger>
            </TabsList>

            <TabsContent value="proposals" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">المقترحات الحالية</h3>
                <Button>إنشاء مقترح جديد</Button>
              </div>

              <div className="space-y-4">
                {proposals.map((proposal) => {
                  const totalVotes = proposal.votes.for + proposal.votes.against + proposal.votes.abstain;
                  const userVote = userVotes[proposal.id];

                  return (
                    <Card key={proposal.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{proposal.title}</h4>
                            <p className="text-gray-600 mb-3">{proposal.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>مقترح من: {proposal.proposer}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                ينتهي: {proposal.endDate}
                              </span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(proposal.status)} flex items-center gap-1`}>
                            {getStatusIcon(proposal.status)}
                            {proposal.status === 'active' && 'نشط'}
                            {proposal.status === 'passed' && 'مُمرر'}
                            {proposal.status === 'failed' && 'مرفوض'}
                          </Badge>
                        </div>

                        {/* Voting Results */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>موافق: {proposal.votes.for} ({getVotePercentage(proposal.votes.for, totalVotes)}%)</span>
                            <span>معارض: {proposal.votes.against} ({getVotePercentage(proposal.votes.against, totalVotes)}%)</span>
                            <span>ممتنع: {proposal.votes.abstain} ({getVotePercentage(proposal.votes.abstain, totalVotes)}%)</span>
                          </div>
                          
                          <div className="w-full bg-gray-200 rounded-full h-3 flex">
                            <div 
                              className="bg-green-500 h-3 rounded-l-full" 
                              style={{ width: `${getVotePercentage(proposal.votes.for, totalVotes)}%` }}
                            ></div>
                            <div 
                              className="bg-red-500 h-3" 
                              style={{ width: `${getVotePercentage(proposal.votes.against, totalVotes)}%` }}
                            ></div>
                            <div 
                              className="bg-gray-400 h-3 rounded-r-full" 
                              style={{ width: `${getVotePercentage(proposal.votes.abstain, totalVotes)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Voting Buttons */}
                        {proposal.status === 'active' && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant={userVote === 'for' ? 'default' : 'outline'}
                              onClick={() => handleVote(proposal.id, 'for')}
                              className="flex-1"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              موافق
                            </Button>
                            <Button 
                              size="sm" 
                              variant={userVote === 'against' ? 'destructive' : 'outline'}
                              onClick={() => handleVote(proposal.id, 'against')}
                              className="flex-1"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              معارض
                            </Button>
                            <Button 
                              size="sm" 
                              variant={userVote === 'abstain' ? 'secondary' : 'outline'}
                              onClick={() => handleVote(proposal.id, 'abstain')}
                              className="flex-1"
                            >
                              <Clock className="h-4 w-4 mr-1" />
                              ممتنع
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="governance" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">قواعد الحوكمة</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">نصاب التصويت</h4>
                        <p className="text-gray-600">يتطلب تمرير المقترح موافقة 51% من الأعضاء المصوتين كحد أدنى</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">مدة التصويت</h4>
                        <p className="text-gray-600">مدة التصويت على المقترحات 7 أيام من تاريخ النشر</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">حقوق التصويت</h4>
                        <p className="text-gray-600">قوة التصويت تعتمد على عدد الأسهم المملوكة في DAO</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="treasury" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">إدارة الخزينة</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">الرصيد الحالي</h4>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {daoStats.treasuryBalance.toLocaleString()} ر.س
                        </div>
                        <p className="text-gray-600">متاح للاستثمار والمشاريع</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">آخر المعاملات</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>استثمار مشروع تقني</span>
                            <span className="text-red-600">-25,000 ر.س</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>أرباح شهر يناير</span>
                            <span className="text-green-600">+15,000 ر.س</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>رسوم إدارية</span>
                            <span className="text-red-600">-2,500 ر.س</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SnapDAOIntegration;
