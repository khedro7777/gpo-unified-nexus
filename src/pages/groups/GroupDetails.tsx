
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { 
  Users, FileText, Settings, Calendar, MessageSquare, Briefcase, 
  CheckCircle, ArrowUpRight, FileCheck, Clock, ThumbsUp, ThumbsDown, ArrowRight
} from 'lucide-react';
import LoomioVoting from '@/components/voting/LoomioVoting';
import SnapshotVoting from '@/components/voting/SnapshotVoting';

// Sample data for the group details page
const groupData = {
  id: "group-123",
  title: "شراء أجهزة كمبيوتر",
  description: "مجموعة لشراء أجهزة كمبيوتر للموظفين الجدد في الشركة.",
  type: "buying", // buying or marketing
  status: "active", // active or closed
  creator: "أحمد محمد",
  createdAt: "2025-05-01",
  location: "الرياض",
  country: "السعودية",
  dueDate: "2025-06-30",
  target: "100 جهاز",
  groupValue: "120,000 ريال",
  progress: 60,
  members: 12,
  isAdmin: true
};

const GroupDetails = () => {
  const { groupId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [votingSystem, setVotingSystem] = useState('loomio'); // loomio or snapshot
  
  // State for managing the sheet (modal) visibility
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to open the sheet
  const openSheet = () => setIsSheetOpen(true);

  // Function to close the sheet
  const closeSheet = () => setIsSheetOpen(false);
  
  // Sample proposal data for voting components
  const proposalData = {
    proposalId: "prop-123",
    title: "شراء أجهزة كمبيوتر من شركة أمازون",
    description: "التصويت على قبول عرض الأسعار المقدم من شركة أمازون لشراء 100 جهاز لابتوب بسعر إجمالي قدره 120,000 ريال سعودي",
    options: [
      { id: "opt1", title: "موافق", votes: 8 },
      { id: "opt2", title: "غير موافق", votes: 2 },
      { id: "opt3", title: "امتناع", votes: 1 }
    ],
    createdBy: "أحمد محمد",
    createdAt: "2025-05-10T10:00:00Z",
    endDate: "2025-05-17T10:00:00Z",
    minTokens: 100,
    deadline: "2025-05-17T10:00:00Z",
    totalVotes: 11,
    spaceId: "gpo-buying-123",
    voters: [
      { id: "user1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Ahmed", vote: "agree" },
      { id: "user2", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Sarah", vote: "disagree" },
      { id: "user3", name: "محمد علي", avatar: "https://api.dicebear.com/7.x/personas/svg?seed=Mohammed", vote: "abstain" }
    ]
  };

  // Event handlers for voting components
  const handleVote = (option: string) => {
    console.log(`تم التصويت: ${option}`);
    // معالجة التصويت حسب الاحتياج
  };

  const handleComment = (comment: string) => {
    console.log(`تعليق جديد: ${comment}`);
    // إضافة التعليق إلى قائمة التعليقات
  };

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Group Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{groupData.title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{groupData.type === 'buying' ? 'مجموعة شراء' : 'مجموعة تسويق'}</Badge>
              <Badge variant={groupData.status === 'active' ? 'secondary' : 'outline'}>
                {groupData.status === 'active' ? 'نشطة' : 'مغلقة'}
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/my-groups">العودة للمجموعات</Link>
            </Button>
            {groupData.isAdmin && (
              <Button variant="default">
                <Settings className="mr-2 h-4 w-4" />
                إدارة المجموعة
              </Button>
            )}
          </div>
        </div>
        
        {/* Group Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 md:w-fit">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="contract">العقد</TabsTrigger>
            <TabsTrigger value="files">الملفات</TabsTrigger>
            <TabsTrigger value="chat">المحادثات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>تفاصيل المجموعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{groupData.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">المؤسس</p>
                      <p className="font-medium">{groupData.creator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الإنشاء</p>
                      <p className="font-medium">{groupData.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الموقع</p>
                      <p className="font-medium">{groupData.location}، {groupData.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ الانتهاء</p>
                      <p className="font-medium">{groupData.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الهدف</p>
                      <p className="font-medium">{groupData.target}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">القيمة الإجمالية</p>
                      <p className="font-medium">{groupData.groupValue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>الحالة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">نسبة الاكتمال</span>
                      <span className="text-sm font-bold">{groupData.progress}%</span>
                    </div>
                    <Progress value={groupData.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">عدد الأعضاء</span>
                      <span>{groupData.members}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">الوقت المتبقي</span>
                      <span>25 يوم</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">المرحلة الحالية</span>
                      <Badge>جمع العروض</Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">الانضمام للمجموعة</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>المراحل</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">إنشاء المجموعة</p>
                        <p className="text-sm text-muted-foreground">تم إنشاء المجموعة وتحديد الهدف</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-full p-1">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">جمع الأعضاء</p>
                        <p className="text-sm text-muted-foreground">انضم 12 عضو من أصل 20 مطلوب</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 border border-primary rounded-full p-1">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">جمع العروض</p>
                        <p className="text-sm text-muted-foreground">تم استلام 3 عروض حتى الآن</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="border rounded-full p-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div className="text-muted-foreground">
                        <p className="font-medium">التصويت النهائي</p>
                        <p className="text-sm">اختيار العرض النهائي</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="border rounded-full p-1 text-muted-foreground">
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div className="text-muted-foreground">
                        <p className="font-medium">توقيع العقد</p>
                        <p className="text-sm">توقيع العقد النهائي مع المورّد</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>آخر النشاطات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-1 rounded">
                        <ArrowUpRight className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">استلام عرض جديد</p>
                        <p className="text-sm text-muted-foreground">تم استلام عرض جديد من شركة التقنية الحديثة</p>
                        <p className="text-xs text-muted-foreground">قبل ساعتين</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 p-1 rounded">
                        <Users className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">انضمام عضو جديد</p>
                        <p className="text-sm text-muted-foreground">انضم محمد علي إلى المجموعة</p>
                        <p className="text-xs text-muted-foreground">أمس</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-50 p-1 rounded">
                        <MessageSquare className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">تعليق جديد</p>
                        <p className="text-sm text-muted-foreground">علّق أحمد خالد على العرض الأول</p>
                        <p className="text-xs text-muted-foreground">قبل 3 أيام</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    عرض كل النشاطات
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-6">
            {/* محتوى علامة تبويب الأعضاء */}
            <Card>
              <CardHeader>
                <CardTitle>أعضاء المجموعة (12)</CardTitle>
                <CardDescription>قائمة بالأعضاء المشاركين في المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                {/* هنا يمكن وضع قائمة الأعضاء */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offers" className="space-y-6">
            {/* محتوى علامة تبويب العروض */}
            <Card>
              <CardHeader>
                <CardTitle>العروض المستلمة (3)</CardTitle>
                <CardDescription>عروض الموردين للمنتجات المطلوبة</CardDescription>
              </CardHeader>
              <CardContent>
                {/* هنا يمكن وضع قائمة العروض */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="voting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>التصويت على العروض</CardTitle>
                <CardDescription>
                  يمكنك المشاركة في التصويت لاختيار أفضل عرض للمجموعة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* نظام التصويت */}
                <Tabs value={votingSystem} onValueChange={setVotingSystem} className="mb-6">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="loomio">نظام Loomio</TabsTrigger>
                    <TabsTrigger value="snapshot">نظام Snapshot</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="loomio">
                    <LoomioVoting 
                      proposalId={proposalData.proposalId}
                      title={proposalData.title}
                      description={proposalData.description}
                      options={proposalData.options}
                      deadline={proposalData.deadline}
                      totalVotes={proposalData.totalVotes}
                      voters={proposalData.voters}
                      onVote={handleVote}
                      onComment={handleComment}
                    />
                  </TabsContent>
                  
                  <TabsContent value="snapshot">
                    <SnapshotVoting 
                      proposalId={proposalData.proposalId}
                      title={proposalData.title}
                      description={proposalData.description}
                      options={proposalData.options}
                      deadline={proposalData.deadline}
                      spaceId={proposalData.spaceId}
                      totalVotes={proposalData.totalVotes}
                      onVote={handleVote}
                      verifiable={true}
                    />
                  </TabsContent>
                </Tabs>
                
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" /> مع (8)
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4" /> ضد (2)
                  </Button>
                  <Button variant="outline">امتناع (1)</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contract" className="space-y-6">
            {/* محتوى علامة تبويب العقد */}
            <Card>
              <CardHeader>
                <CardTitle>العقد النهائي</CardTitle>
                <CardDescription>
                  تفاصيل العقد النهائي بين المجموعة والمورّد
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* هنا يمكن وضع تفاصيل العقد */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="space-y-6">
            {/* محتوى علامة تبويب الملفات */}
            <Card>
              <CardHeader>
                <CardTitle>ملفات المجموعة</CardTitle>
                <CardDescription>
                  جميع الملفات والوثائق المرتبطة بالمجموعة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* هنا يمكن وضع قائمة الملفات */}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-6">
            {/* محتوى علامة تبويب المحادثات */}
            <Card>
              <CardHeader>
                <CardTitle>محادثات المجموعة</CardTitle>
                <CardDescription>
                  التواصل بين أعضاء المجموعة
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* هنا يمكن وضع نظام المحادثات */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default GroupDetails;
