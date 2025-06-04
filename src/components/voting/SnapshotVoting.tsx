
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Vote, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VotingOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

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
  const { toast } = useToast();
  const [userVoted, setUserVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const [options, setOptions] = useState<VotingOption[]>([
    { id: 'yes', text: 'موافق', votes: 245, percentage: 68.5 },
    { id: 'no', text: 'غير موافق', votes: 89, percentage: 24.9 },
    { id: 'abstain', text: 'امتناع', votes: 23, percentage: 6.4 }
  ]);

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
  const timeRemaining = "2 يوم و 14 ساعة";

  const handleVote = (optionId: string) => {
    if (userVoted) return;

    setSelectedOption(optionId);
    setUserVoted(true);
    
    // محاكاة إضافة الصوت
    setOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );

    toast({
      title: "تم التصويت بنجاح",
      description: "تم تسجيل صوتك على Snapshot.js بدون رسوم غاز",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Vote className="h-5 w-5" />
                {title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeRemaining}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* خيارات التصويت */}
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Button
                    variant={selectedOption === option.id ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => handleVote(option.id)}
                    disabled={userVoted}
                  >
                    <span className="flex items-center gap-2">
                      {selectedOption === option.id && <CheckCircle className="h-4 w-4" />}
                      {option.text}
                    </span>
                    <span>{option.votes} صوت</span>
                  </Button>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{option.percentage}%</span>
                    <span>{option.votes} من {totalVotes}</span>
                  </div>
                  <Progress value={option.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>

          {/* حالة التصويت */}
          {userVoted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className="text-green-800 font-medium">تم تسجيل صوتك بنجاح</p>
              <p className="text-green-600 text-sm">
                صوتك محفوظ على Snapshot.js ولا يمكن تغييره
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <Vote className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-800 font-medium">اختر خيارك للتصويت</p>
              <p className="text-blue-600 text-sm">
                التصويت مجاني تماماً ولا يتطلب رسوم غاز
              </p>
            </div>
          )}

          {/* معلومات إضافية */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalVotes}</div>
              <div className="text-sm text-muted-foreground">إجمالي الأصوات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">0 ETH</div>
              <div className="text-sm text-muted-foreground">رسوم الغاز</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SnapshotVoting;
