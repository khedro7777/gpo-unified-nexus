
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TabSystem from '../tabs/TabSystem';

const activeProposal = {
  id: 1,
  title: 'تخصيص صندوق المجتمع',
  description: 'اقتراح لتخصيص 5% من أموال الخزينة لمشاريع تطوير المجتمع',
  status: 'active',
  votes: { yes: 23, no: 7, abstain: 3 },
  deadline: '2025-06-01',
  author: 'member1.eth',
  quorum: 66,
  requiredTokens: 100,
  votingPower: 1.5,
  documents: [
    { name: 'تفاصيل_الاقتراح.pdf', size: '1.2MB' },
    { name: 'ميزانية_المشروع.xlsx', size: '0.8MB' }
  ]
};

const pastVotings = [
  {
    id: 2,
    title: 'تكامل مورد جديد',
    description: 'إضافة XYZ Manufacturing كمورد معتمد للمشتريات التعاونية',
    status: 'completed',
    result: 'approved',
    votes: { yes: 34, no: 5, abstain: 2 },
    date: '2025-05-15'
  },
  {
    id: 3,
    title: 'تحديث قواعد العضوية',
    description: 'مراجعة معايير العضوية لتشمل التحقق من بيانات الاعتماد',
    status: 'completed',
    result: 'rejected',
    votes: { yes: 12, no: 25, abstain: 4 },
    date: '2025-04-30'
  }
];

type VotingTab = 'active' | 'past' | 'upcoming';

interface ProposalTabContent {
  id: string;
  title: string;
  content: React.ReactNode;
}

const GovernanceVoting = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<VotingTab>('active');
  const [openProposalTabs, setOpenProposalTabs] = useState<ProposalTabContent[]>([
    {
      id: '1',
      title: 'تخصيص صندوق المجتمع',
      content: <ProposalVotingCard proposal={activeProposal} />
    }
  ]);
  
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

  const addTab = () => {
    // Simulating adding a new proposal tab
    const newId = String(Date.now());
    setOpenProposalTabs(prev => [...prev, {
      id: newId,
      title: `اقتراح جديد ${newId.slice(-3)}`,
      content: (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">اقتراح جديد قيد الإنشاء</p>
          <Button className="mt-4">بدء إنشاء اقتراح</Button>
        </div>
      )
    }]);
  };

  const closeTab = (tabId: string) => {
    setOpenProposalTabs(prev => prev.filter(tab => tab.id !== tabId));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">التصويت والمقترحات</h2>
        <Button onClick={addTab}>إنشاء اقتراح جديد</Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as VotingTab)}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">تصويتات نشطة</TabsTrigger>
          <TabsTrigger value="past">تصويتات سابقة</TabsTrigger>
          <TabsTrigger value="upcoming">تصويتات قادمة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md flex gap-3 items-start">
            <AlertTriangle className="text-amber-500 mt-1" size={18} />
            <div>
              <p className="text-sm font-medium text-amber-800">تنبيه مهم</p>
              <p className="text-xs text-amber-700">
                تتطلب المشاركة في التصويت امتلاك ما لا يقل عن 100 رمز GPO. تحقق من رصيدك قبل المشاركة.
              </p>
            </div>
          </div>
          
          <TabSystem 
            tabs={openProposalTabs}
            onCloseTab={closeTab}
            onAddTab={addTab}
          />
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-4">
            {pastVotings.map(voting => (
              <Card key={voting.id} className={`border-l-4 ${
                voting.result === 'approved' ? 'border-l-green-500' : 'border-l-red-500'}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{voting.title}</CardTitle>
                    <Badge variant={voting.result === 'approved' ? 'outline' : 'secondary'}>
                      {voting.result === 'approved' ? 'تمت الموافقة' : 'مرفوض'}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <FileText size={14} /> تم التصويت بتاريخ {voting.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{voting.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users size={14} />
                    <span>{voting.votes.yes + voting.votes.no + voting.votes.abstain} مشارك</span>
                    <span className="flex items-center gap-1"><ThumbsUp size={14} /> {voting.votes.yes}</span>
                    <span className="flex items-center gap-1"><ThumbsDown size={14} /> {voting.votes.no}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-end">
                  <Button size="sm" variant="outline">عرض التفاصيل</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="p-8 text-center">
            <p className="text-muted-foreground">لا توجد تصويتات قادمة حاليًا</p>
            <Button className="mt-4" variant="outline">جدولة تصويت جديد</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProposalVotingCardProps {
  proposal: typeof activeProposal;
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

export default GovernanceVoting;
