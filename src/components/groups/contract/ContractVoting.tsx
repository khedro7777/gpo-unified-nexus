
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, XCircle, MinusCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContractVotingProps {
  groupId: string;
  onVotingComplete: () => void;
}

interface VoteData {
  id: string;
  name: string;
  vote: 'approve' | 'reject' | 'abstain' | null;
  timestamp?: string;
}

const ContractVoting: React.FC<ContractVotingProps> = ({ groupId, onVotingComplete }) => {
  const { toast } = useToast();
  const [userVote, setUserVote] = useState<'approve' | 'reject' | 'abstain' | null>(null);
  const [votes, setVotes] = useState<VoteData[]>([
    { id: '1', name: 'أحمد محمد', vote: 'approve', timestamp: '2024-01-15 10:30' },
    { id: '2', name: 'فاطمة علي', vote: 'approve', timestamp: '2024-01-15 11:15' },
    { id: '3', name: 'خالد أحمد', vote: null },
    { id: '4', name: 'سارة حسن', vote: 'abstain', timestamp: '2024-01-15 12:00' },
    { id: '5', name: 'محمد عبدالله', vote: null },
  ]);

  const totalVoters = votes.length;
  const votedCount = votes.filter(v => v.vote !== null).length;
  const approveCount = votes.filter(v => v.vote === 'approve').length;
  const rejectCount = votes.filter(v => v.vote === 'reject').length;
  const abstainCount = votes.filter(v => v.vote === 'abstain').length;

  const approvePercentage = (approveCount / totalVoters) * 100;
  const rejectPercentage = (rejectCount / totalVoters) * 100;
  const abstainPercentage = (abstainCount / totalVoters) * 100;

  const handleVote = (voteType: 'approve' | 'reject' | 'abstain') => {
    if (userVote) {
      toast({
        title: "تم التصويت مسبقاً",
        description: "لا يمكن تغيير التصويت بعد الإرسال",
        variant: "destructive",
      });
      return;
    }

    setUserVote(voteType);
    // محاكاة إضافة صوت المستخدم الحالي
    setVotes(prev => 
      prev.map(v => 
        v.id === '3' ? { ...v, vote: voteType, timestamp: new Date().toLocaleString('ar-SA') } : v
      )
    );

    toast({
      title: "تم التصويت بنجاح",
      description: `تم تسجيل صوتك: ${voteType === 'approve' ? 'موافق' : voteType === 'reject' ? 'رفض' : 'امتناع'}`,
    });

    // إذا وصل التصويت للنصاب المطلوب
    if (votedCount + 1 >= Math.ceil(totalVoters * 0.6)) {
      setTimeout(() => {
        onVotingComplete();
        toast({
          title: "انتهى التصويت",
          description: "تم الوصول للنصاب المطلوب وإقرار العقد",
        });
      }, 2000);
    }
  };

  const getVoteIcon = (vote: string | null) => {
    switch (vote) {
      case 'approve':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'reject':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'abstain':
        return <MinusCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVoteText = (vote: string | null) => {
    switch (vote) {
      case 'approve': return 'موافق';
      case 'reject': return 'رفض';
      case 'abstain': return 'امتناع';
      default: return 'لم يصوت';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>التصويت على العقد</CardTitle>
          <div className="text-sm text-muted-foreground">
            صوت {votedCount} من {totalVoters} أعضاء • النصاب المطلوب: {Math.ceil(totalVoters * 0.6)} أصوات
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* نتائج التصويت */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-green-600">موافق ({approveCount})</span>
                <span className="text-sm text-green-600">{approvePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={approvePercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-red-600">رفض ({rejectCount})</span>
                <span className="text-sm text-red-600">{rejectPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={rejectPercentage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-yellow-600">امتناع ({abstainCount})</span>
                <span className="text-sm text-yellow-600">{abstainPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={abstainPercentage} className="h-2" />
            </div>
          </div>

          {/* أزرار التصويت */}
          {!userVote && (
            <div className="flex gap-3">
              <Button 
                onClick={() => handleVote('approve')}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                موافق
              </Button>
              <Button 
                onClick={() => handleVote('reject')}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                رفض
              </Button>
              <Button 
                onClick={() => handleVote('abstain')}
                variant="outline"
                className="flex-1"
              >
                <MinusCircle className="h-4 w-4 mr-2" />
                امتناع
              </Button>
            </div>
          )}

          {userVote && (
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-blue-800">
                تم تسجيل صوتك: <strong>{getVoteText(userVote)}</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* قائمة المصوتين */}
      <Card>
        <CardHeader>
          <CardTitle>أعضاء المجموعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {votes.map((voter) => (
              <div key={voter.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{voter.name}</p>
                    {voter.timestamp && (
                      <p className="text-xs text-muted-foreground">{voter.timestamp}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getVoteIcon(voter.vote)}
                  <Badge variant={voter.vote ? "default" : "outline"}>
                    {getVoteText(voter.vote)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractVoting;
