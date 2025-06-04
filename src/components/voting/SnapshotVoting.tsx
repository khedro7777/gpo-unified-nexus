
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SnapshotVotingProps {
  proposalId: string;
  title: string;
  description: string;
  endTime: string;
}

const SnapshotVoting: React.FC<SnapshotVotingProps> = ({
  proposalId,
  title,
  description,
  endTime
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [userVote, setUserVote] = useState<'for' | 'against' | null>(null);

  // Mock voting data
  const votingData = {
    totalVotes: 24,
    forVotes: 18,
    againstVotes: 6,
    quorum: 20,
    status: 'active' as 'active' | 'ended' | 'pending'
  };

  const forPercentage = (votingData.forVotes / votingData.totalVotes) * 100;
  const againstPercentage = (votingData.againstVotes / votingData.totalVotes) * 100;
  const quorumReached = votingData.totalVotes >= votingData.quorum;

  const handleVote = (option: 'for' | 'against') => {
    setUserVote(option);
    // Here you would integrate with actual Snapshot.js voting
    console.log(`Voted ${option} on proposal ${proposalId}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5" />
            {isRTL ? 'تصويت المجتمع' : 'Community Voting'}
          </CardTitle>
          <Badge variant={votingData.status === 'active' ? 'default' : 'secondary'}>
            {votingData.status === 'active' 
              ? (isRTL ? 'نشط' : 'Active')
              : (isRTL ? 'منتهي' : 'Ended')
            }
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Voting Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>{isRTL ? 'النتائج الحالية' : 'Current Results'}</span>
            <span>{votingData.totalVotes} {isRTL ? 'صوت' : 'votes'}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{isRTL ? 'موافق' : 'For'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{votingData.forVotes}</span>
                <span className="text-xs text-muted-foreground">({forPercentage.toFixed(1)}%)</span>
              </div>
            </div>
            <Progress value={forPercentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">{isRTL ? 'معارض' : 'Against'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{votingData.againstVotes}</span>
                <span className="text-xs text-muted-foreground">({againstPercentage.toFixed(1)}%)</span>
              </div>
            </div>
            <Progress value={againstPercentage} className="h-2" />
          </div>
        </div>

        {/* Quorum Status */}
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${quorumReached ? 'bg-green-500' : 'bg-yellow-500'}`} />
          <span>
            {isRTL ? 'النصاب القانوني' : 'Quorum'}: {votingData.totalVotes}/{votingData.quorum}
            {quorumReached 
              ? (isRTL ? ' (تم الوصول)' : ' (Reached)')
              : (isRTL ? ' (لم يتم الوصول)' : ' (Not Reached)')
            }
          </span>
        </div>

        {/* Time Remaining */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            {isRTL ? 'ينتهي في' : 'Ends in'} 2 {isRTL ? 'أيام' : 'days'}
          </span>
        </div>

        {/* Voting Buttons */}
        {votingData.status === 'active' && (
          <div className="flex gap-3">
            <Button 
              onClick={() => handleVote('for')}
              variant={userVote === 'for' ? 'default' : 'outline'}
              className="flex-1"
              disabled={userVote !== null}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isRTL ? 'موافق' : 'Vote For'}
            </Button>
            <Button 
              onClick={() => handleVote('against')}
              variant={userVote === 'against' ? 'destructive' : 'outline'}
              className="flex-1"
              disabled={userVote !== null}
            >
              <XCircle className="h-4 w-4 mr-2" />
              {isRTL ? 'معارض' : 'Vote Against'}
            </Button>
          </div>
        )}

        {userVote && (
          <div className="text-center text-sm text-muted-foreground">
            {isRTL ? 'تم تسجيل صوتك بنجاح' : 'Your vote has been recorded'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SnapshotVoting;
