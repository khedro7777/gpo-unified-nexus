
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, Wallet, ExternalLink, Archive } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SnapshotProposal {
  id: string;
  title: string;
  description: string;
  author: string;
  choices: string[];
  scores: number[];
  votes: number;
  quorum: number;
  start: number;
  end: number;
  state: 'active' | 'closed' | 'pending';
  space: string;
}

interface SnapshotIntegrationProps {
  spaceId: string;
}

const SnapshotIntegration: React.FC<SnapshotIntegrationProps> = ({ spaceId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [proposals, setProposals] = useState<SnapshotProposal[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  useEffect(() => {
    setProposals([
      {
        id: '1',
        title: isRTL ? 'اقتراح تحديث البروتوكول' : 'Protocol Upgrade Proposal',
        description: isRTL ? 'اقتراح لتحديث البروتوكول إلى الإصدار 2.0' : 'Proposal to upgrade protocol to version 2.0',
        author: '0x742d35Cc6e59b4eb2b01E8b3e7B8c9a3f4c5d6e7f8',
        choices: [isRTL ? 'موافق' : 'Yes', isRTL ? 'رفض' : 'No', isRTL ? 'امتناع' : 'Abstain'],
        scores: [850, 150, 50],
        votes: 1050,
        quorum: 1000,
        start: Date.now() - 86400000 * 2,
        end: Date.now() + 86400000 * 5,
        state: 'active',
        space: spaceId
      },
      {
        id: '2',
        title: isRTL ? 'توزيع الخزانة' : 'Treasury Distribution',
        description: isRTL ? 'اقتراح لتوزيع أموال الخزانة على المشاريع' : 'Proposal for treasury fund distribution to projects',
        author: '0x123a35Cc6e59b4eb2b01E8b3e7B8c9a3f4c5d6e7f9',
        choices: [isRTL ? 'الخيار أ' : 'Option A', isRTL ? 'الخيار ب' : 'Option B', isRTL ? 'الخيار ج' : 'Option C'],
        scores: [400, 600, 200],
        votes: 1200,
        quorum: 1000,
        start: Date.now() - 86400000 * 7,
        end: Date.now() - 86400000 * 1,
        state: 'closed',
        space: spaceId
      }
    ]);
  }, [spaceId, isRTL]);

  const handleVote = async (proposalId: string, choiceIndex: number) => {
    setLoading(true);
    try {
      // Simulate Snapshot voting
      console.log(`Voting on proposal ${proposalId}, choice ${choiceIndex}`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update local state
      setProposals(prev => prev.map(proposal => {
        if (proposal.id === proposalId) {
          const newScores = [...proposal.scores];
          newScores[choiceIndex] += 1;
          return {
            ...proposal,
            scores: newScores,
            votes: proposal.votes + 1
          };
        }
        return proposal;
      }));
    } catch (error) {
      console.error('Snapshot voting error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeRemaining = (endTime: number) => {
    const now = Date.now();
    const diff = endTime - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diff <= 0) {
      return isRTL ? 'انتهت' : 'Ended';
    } else if (days > 0) {
      return isRTL ? `${days} أيام متبقية` : `${days} days left`;
    } else {
      return isRTL ? `${hours} ساعات متبقية` : `${hours} hours left`;
    }
  };

  const getTotalScore = (scores: number[]) => {
    return scores.reduce((sum, score) => sum + score, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {isRTL ? 'حوكمة DAO - Snapshot' : 'DAO Governance - Snapshot'}
        </h3>
        <Button size="sm" className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4" />
          {isRTL ? 'فتح في Snapshot' : 'Open in Snapshot'}
        </Button>
      </div>

      {proposals.map((proposal) => {
        const totalScore = getTotalScore(proposal.scores);
        const quorumMet = proposal.votes >= proposal.quorum;
        
        return (
          <Card key={proposal.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {proposal.title}
                    {proposal.state === 'closed' && <Archive className="h-4 w-4 text-muted-foreground" />}
                  </CardTitle>
                  <CardDescription className="mt-2">{proposal.description}</CardDescription>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {isRTL ? 'المؤلف:' : 'Author:'} {proposal.author.slice(0, 10)}...
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={proposal.state === 'active' ? 'default' : 'secondary'}>
                    {proposal.state === 'active' ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'مغلق' : 'Closed')}
                  </Badge>
                  <Badge variant={quorumMet ? 'default' : 'destructive'} className="text-xs">
                    {isRTL ? 'النصاب:' : 'Quorum:'} {proposal.votes}/{proposal.quorum}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Wallet className="h-4 w-4" />
                  {proposal.votes} {isRTL ? 'صوت' : 'votes'}
                </span>
                <span>
                  {getTimeRemaining(proposal.end)}
                </span>
              </div>

              <div className="space-y-3">
                {proposal.choices.map((choice, index) => {
                  const score = proposal.scores[index];
                  const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{choice}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {score} {isRTL ? 'صوت' : 'votes'} ({percentage.toFixed(1)}%)
                          </span>
                          {proposal.state === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleVote(proposal.id, index)}
                              disabled={loading}
                            >
                              {loading ? (isRTL ? 'جاري...' : 'Voting...') : (isRTL ? 'صوت' : 'Vote')}
                            </Button>
                          )}
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>

              {proposal.state === 'active' && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {isRTL 
                      ? 'يتم حفظ النتائج على IPFS وتوثيقها في البلوك تشين'
                      : 'Results are stored on IPFS and documented on blockchain'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SnapshotIntegration;
