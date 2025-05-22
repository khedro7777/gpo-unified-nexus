
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileText, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface ProposalDocument {
  name: string;
  size: string;
}

export interface ProposalVotes {
  yes: number;
  no: number;
  abstain: number;
}

export interface ProposalType {
  id: number;
  title: string;
  description: string;
  status: string;
  votes: ProposalVotes;
  deadline: string;
  author: string;
  quorum: number;
  requiredTokens: number;
  votingPower: number;
  documents: ProposalDocument[];
}

interface ProposalVotingCardProps {
  proposal: ProposalType;
}

const ProposalVotingCard: React.FC<ProposalVotingCardProps> = ({ proposal }) => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'vote' | 'details' | 'documents'>('vote');
  
  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "خطأ",
        description: "يرجى تحديد خيار للتصويت",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم تقديم التصويت",
      description: "تم تسجيل تصويتك بنجاح",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{proposal.title}</CardTitle>
            <CardDescription className="mt-1">
              {proposal.description}
            </CardDescription>
          </div>
          <Badge>نشط</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs value={activeSection} onValueChange={(value) => setActiveSection(value as 'vote' | 'details' | 'documents')}>
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="vote">التصويت</TabsTrigger>
            <TabsTrigger value="details">تفاصيل المقترح</TabsTrigger>
            <TabsTrigger value="documents">المستندات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vote" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>نعم ({proposal.votes.yes} تصويت)</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>لا ({proposal.votes.no} تصويت)</span>
                <span>21%</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>امتناع ({proposal.votes.abstain} تصويت)</span>
                <span>9%</span>
              </div>
              <Progress value={9} className="h-2" />
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">ادلي بصوتك:</h4>
              <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">موافق</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">رفض</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="abstain" id="abstain" />
                  <Label htmlFor="abstain">امتناع</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold">صاحب المقترح</h4>
                  <p className="text-sm text-muted-foreground">{proposal.author}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">الموعد النهائي</h4>
                  <p className="text-sm text-muted-foreground">{proposal.deadline}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">النصاب المطلوب</h4>
                  <p className="text-sm text-muted-foreground">{proposal.quorum}%</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">قوة التصويت الخاصة بك</h4>
                  <p className="text-sm text-muted-foreground">x{proposal.votingPower}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-2">تفاصيل إضافية</h4>
                <p className="text-sm text-muted-foreground">
                  هذا المقترح يهدف إلى تخصيص 5% من أموال الخزينة لتمويل مشاريع تطوير المجتمع. 
                  سيتم استخدام هذه الأموال لتمويل مبادرات مجتمعية تساعد في نمو وتطوير المنظومة ككل.
                  ستتم إدارة الصندوق من قبل لجنة منتخبة من المجتمع، وسيتم تقديم تقارير دورية عن استخدام الأموال.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="space-y-2">
              {proposal.documents.map((doc, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                  <span className="text-sm">{doc.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{doc.size}</span>
                    <Button variant="outline" size="sm">تحميل</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4 mt-2">
        <div className="text-xs text-muted-foreground">
          تحتاج إلى {proposal.requiredTokens} رمز GPO للتصويت
        </div>
        <Button onClick={handleVote} disabled={!selectedOption}>إرسال التصويت</Button>
      </CardFooter>
    </Card>
  );
};

export default ProposalVotingCard;
