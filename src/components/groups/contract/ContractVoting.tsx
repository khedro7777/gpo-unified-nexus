
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Vote, Check, X, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContractVotingProps {
  groupId: string;
  onVotingComplete: () => void;
}

const ContractVoting: React.FC<ContractVotingProps> = ({ groupId, onVotingComplete }) => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<'approve' | 'reject' | null>(null);

  // Mock voting data
  const votingData = {
    totalMembers: 8,
    votesReceived: 6,
    approvals: 5,
    rejections: 1,
    requiredApprovals: 6, // 75% majority
    deadline: '2024-01-20T23:59:59Z'
  };

  const approvalPercentage = (votingData.approvals / votingData.votesReceived) * 100;
  const progressPercentage = (votingData.votesReceived / votingData.totalMembers) * 100;

  const voters = [
    { name: 'أحمد محمد', vote: 'approve', timestamp: '2024-01-15 14:30' },
    { name: 'فاطمة علي', vote: 'approve', timestamp: '2024-01-15 15:45' },
    { name: 'محمد خالد', vote: 'reject', timestamp: '2024-01-15 16:20' },
    { name: 'سارة أحمد', vote: 'approve', timestamp: '2024-01-15 17:10' },
    { name: 'عبدالله حسن', vote: 'approve', timestamp: '2024-01-15 18:00' },
    { name: 'مريم محمد', vote: 'approve', timestamp: '2024-01-15 19:30' }
  ];

  const handleVote = (vote: 'approve' | 'reject') => {
    setUserVote(vote);
    
    toast({
      title: "تم تسجيل التصويت",
      description: `تم تسجيل ${vote === 'approve' ? 'موافقتك' : 'اعتراضك'} على العقد`,
    });

    // Check if voting is complete
    if (votingData.approvals >= votingData.requiredApprovals) {
      setTimeout(() => {
        onVotingComplete();
        toast({
          title: "تم اعتماد العقد",
          description: "حصل العقد على الأغلبية المطلوبة وتم اعتماده",
        });
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            تصويت على العقد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voting Progress */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">تقدم التصويت</span>
              <span className="text-sm text-muted-foreground">
                {votingData.votesReceived}/{votingData.totalMembers} أصوات
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{votingData.approvals}</div>
              <div className="text-sm text-green-600">موافقة</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{votingData.rejections}</div>
              <div className="text-sm text-red-600">رفض</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-600">
                {votingData.totalMembers - votingData.votesReceived}
              </div>
              <div className="text-sm text-gray-600">لم يصوت</div>
            </div>
          </div>

          {/* Approval Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              votingData.approvals >= votingData.requiredApprovals ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-sm">
              مطلوب {votingData.requiredApprovals} موافقة للاعتماد 
              ({votingData.approvals >= votingData.requiredApprovals ? 'تم الوصول' : `${votingData.requiredApprovals - votingData.approvals} متبقي`})
            </span>
          </div>

          {/* Voting Buttons */}
          {!userVote && (
            <div className="flex gap-3">
              <Button 
                onClick={() => handleVote('approve')}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                أوافق على العقد
              </Button>
              <Button 
                onClick={() => handleVote('reject')}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                أرفض العقد
              </Button>
            </div>
          )}

          {userVote && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Badge variant="default">
                {userVote === 'approve' ? 'تم التصويت بالموافقة' : 'تم التصويت بالرفض'}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voters List */}
      <Card>
        <CardHeader>
          <CardTitle>المصوتون</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {voters.map((voter, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{voter.name}</div>
                    <div className="text-xs text-muted-foreground">{voter.timestamp}</div>
                  </div>
                </div>
                <Badge variant={voter.vote === 'approve' ? 'default' : 'destructive'}>
                  {voter.vote === 'approve' ? 'موافق' : 'معارض'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractVoting;
