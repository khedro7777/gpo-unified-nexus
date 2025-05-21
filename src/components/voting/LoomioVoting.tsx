
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, ThumbsUp, Vote, ThumbsDown, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VoteOption {
  id: string;
  title: string;
  description?: string;
  votes: number;
}

interface VotingProps {
  proposalId: string;
  title: string;
  description: string;
  options: VoteOption[];
  deadline: string;
  totalVotes: number;
  voters: {
    id: string;
    name: string;
    avatar: string;
    vote: string;
  }[];
  onVote?: (optionId: string) => void;
  onComment?: (comment: string) => void;
}

const LoomioVoting: React.FC<VotingProps> = ({
  proposalId,
  title,
  description,
  options,
  deadline,
  totalVotes,
  voters,
  onVote,
  onComment,
}) => {
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('voting');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "اختيار مطلوب",
        description: "يرجى اختيار أحد الخيارات قبل التصويت",
        variant: "destructive"
      });
      return;
    }
    
    if (onVote) {
      onVote(selectedOption);
    }
    
    toast({
      title: "تم التصويت بنجاح",
      description: "تم تسجيل صوتك بنجاح",
    });
  };
  
  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast({
        title: "التعليق فارغ",
        description: "يرجى كتابة تعليق قبل الإرسال",
        variant: "destructive"
      });
      return;
    }
    
    if (onComment) {
      onComment(comment);
    }
    
    toast({
      title: "تم إضافة التعليق",
      description: "تم إضافة تعليقك بنجاح",
    });
    
    setComment('');
  };
  
  // Calculate time remaining until deadline
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const timeRemaining = deadlineDate.getTime() - now.getTime();
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>
              التصويت #{proposalId}
            </CardDescription>
          </div>
          <div className="flex items-center text-sm bg-muted px-3 py-1 rounded-md">
            <Timer className="h-4 w-4 mr-2" />
            {daysRemaining > 0 ? (
              <span>متبقي {daysRemaining} يوم{daysRemaining !== 1 ? '' : ''} و {hoursRemaining} ساعة</span>
            ) : (
              hoursRemaining > 0 ? (
                <span>متبقي {hoursRemaining} ساعة</span>
              ) : (
                <span className="text-destructive">انتهى التصويت</span>
              )
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">{description}</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="comments">المناقشة</TabsTrigger>
            <TabsTrigger value="voters">المصوتون ({voters.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="voting" className="pt-4">
            <div className="space-y-4">
              {options.map((option) => (
                <div 
                  key={option.id} 
                  className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                    selectedOption === option.id ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full border mr-2 ${
                        selectedOption === option.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                      }`}></div>
                      <h4 className="font-medium">{option.title}</h4>
                    </div>
                    <span className="text-sm">{option.votes} صوت</span>
                  </div>
                  {option.description && <p className="text-sm text-muted-foreground">{option.description}</p>}
                  <Progress 
                    value={(option.votes / totalVotes) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
              ))}
              
              <Button 
                className="w-full mt-4" 
                disabled={!selectedOption || daysRemaining < 0 && hoursRemaining < 0}
                onClick={handleVote}
              >
                <Vote className="mr-2 h-4 w-4" />
                تأكيد التصويت
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="comments" className="pt-4">
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium">أضف تعليقًا للمناقشة:</h4>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب رأيك هنا..."
                  className="min-h-[100px]"
                />
                <Button className="mt-2" onClick={handleCommentSubmit}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  إرسال التعليق
                </Button>
              </div>
              
              {/* Sample Comments */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Ahmed" />
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="font-medium">أحمد محمد</h5>
                      <span className="text-xs text-muted-foreground">منذ ساعتين</span>
                    </div>
                    <p className="text-sm mt-1">أعتقد أن الخيار الأول هو الأفضل لأنه يوفر لنا المرونة في التفاوض مع الموردين على السعر.</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" /> 5
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" /> رد
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/personas/svg?seed=Sarah" />
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h5 className="font-medium">سارة خالد</h5>
                      <span className="text-xs text-muted-foreground">منذ 45 دقيقة</span>
                    </div>
                    <p className="text-sm mt-1">يجب أن ننظر أيضًا في الخيار الثالث، فهو يمنحنا ميزة إضافية من حيث الجودة.</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" /> 2
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                        <MessageCircle className="h-3 w-3 mr-1" /> رد
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="voters" className="pt-4">
            <div className="space-y-3">
              {voters.map((voter) => (
                <div key={voter.id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={voter.avatar} />
                      <AvatarFallback>{voter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{voter.name}</span>
                  </div>
                  <div className="flex items-center">
                    {voter.vote === 'agree' ? (
                      <div className="flex items-center text-green-500">
                        <ThumbsUp className="h-4 w-4 mr-1" /> موافق
                      </div>
                    ) : voter.vote === 'disagree' ? (
                      <div className="flex items-center text-red-500">
                        <ThumbsDown className="h-4 w-4 mr-1" /> معارض
                      </div>
                    ) : (
                      <div className="text-muted-foreground">امتناع</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
        <span>تم إنشاؤه بواسطة نظام Loomio</span>
        <span>{totalVotes} صوت حتى الآن</span>
      </CardFooter>
    </Card>
  );
};

export default LoomioVoting;
