
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, ThumbsUp, ThumbsDown, MessageCircle, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoomioVote {
  id: string;
  title: string;
  description: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  deadline: Date;
  status: 'active' | 'closed' | 'pending';
  groupId: string;
}

interface LoomioIntegrationProps {
  groupId: string;
}

const LoomioIntegration: React.FC<LoomioIntegrationProps> = ({ groupId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [votes, setVotes] = useState<LoomioVote[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  useEffect(() => {
    setVotes([
      {
        id: '1',
        title: isRTL ? 'اختيار المورد للمشروع' : 'Supplier Selection for Project',
        description: isRTL ? 'يجب اختيار أفضل مورد لمشروعنا القادم' : 'We need to select the best supplier for our upcoming project',
        options: [
          { id: '1', text: isRTL ? 'الشركة أ' : 'Company A', votes: 15 },
          { id: '2', text: isRTL ? 'الشركة ب' : 'Company B', votes: 8 },
          { id: '3', text: isRTL ? 'الشركة ج' : 'Company C', votes: 12 }
        ],
        totalVotes: 35,
        deadline: new Date(Date.now() + 86400000 * 3), // 3 days from now
        status: 'active',
        groupId
      },
      {
        id: '2',
        title: isRTL ? 'ميزانية التسويق' : 'Marketing Budget',
        description: isRTL ? 'تحديد ميزانية الحملة التسويقية القادمة' : 'Determine budget for upcoming marketing campaign',
        options: [
          { id: '1', text: '$5,000', votes: 20 },
          { id: '2', text: '$10,000', votes: 25 },
          { id: '3', text: '$15,000', votes: 10 }
        ],
        totalVotes: 55,
        deadline: new Date(Date.now() + 86400000 * 5), // 5 days from now
        status: 'active',
        groupId
      }
    ]);
  }, [groupId, isRTL]);

  const handleVote = async (voteId: string, optionId: string) => {
    setLoading(true);
    try {
      // Simulate API call to Loomio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVotes(prev => prev.map(vote => {
        if (vote.id === voteId) {
          return {
            ...vote,
            options: vote.options.map(option => ({
              ...option,
              votes: option.id === optionId ? option.votes + 1 : option.votes
            })),
            totalVotes: vote.totalVotes + 1
          };
        }
        return vote;
      }));
    } catch (error) {
      console.error('Voting error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return isRTL ? `${days} أيام متبقية` : `${days} days left`;
    } else if (hours > 0) {
      return isRTL ? `${hours} ساعات متبقية` : `${hours} hours left`;
    } else {
      return isRTL ? 'انتهت المهلة' : 'Expired';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-5 w-5" />
          {isRTL ? 'تصويت المجموعة - Loomio' : 'Group Voting - Loomio'}
        </h3>
        <Button size="sm">
          {isRTL ? 'إنشاء تصويت جديد' : 'Create New Vote'}
        </Button>
      </div>

      {votes.map((vote) => (
        <Card key={vote.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{vote.title}</CardTitle>
                <CardDescription className="mt-2">{vote.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={vote.status === 'active' ? 'default' : 'secondary'}>
                  {vote.status === 'active' ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'مغلق' : 'Closed')}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {getTimeRemaining(vote.deadline)}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {vote.totalVotes} {isRTL ? 'صوت' : 'votes'}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {isRTL ? 'مناقشة نشطة' : 'Active discussion'}
              </span>
            </div>

            <div className="space-y-3">
              {vote.options.map((option) => {
                const percentage = vote.totalVotes > 0 ? (option.votes / vote.totalVotes) * 100 : 0;
                
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {option.votes} {isRTL ? 'صوت' : 'votes'} ({percentage.toFixed(1)}%)
                        </span>
                        {vote.status === 'active' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleVote(vote.id, option.id)}
                            disabled={loading}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {isRTL ? 'صوت' : 'Vote'}
                          </Button>
                        )}
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoomioIntegration;
