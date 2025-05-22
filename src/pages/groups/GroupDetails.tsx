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
  CheckCircle, ArrowUpRight, FileCheck, Clock, ThumbsUp, ArrowRight
} from 'lucide-react';
import LoomioVoting from '@/components/voting/LoomioVoting';
import SnapshotVoting from '@/components/voting/SnapshotVoting';

// Sample data for the group details page
const groupData = {
  id: 'group-1',
  title: 'مجموعة شراء إلكترونيات',
  description: 'مجموعة لشراء أجهزة إلكترونية بكميات كبيرة للحصول على خصم جماعي. هدفنا تأمين أحدث الأجهزة بأفضل الأسعار.',
  type: 'buying',
  status: 'active',
  creator: 'شركة التقنية الحديثة',
  createdAt: '2025-04-10',
  dueDate: '2025-06-15',
  members: 12,
  target: 'شراء 100 جهاز كمبيوتر محمول',
  groupValue: '120,000 ريال',
  progress: 65,
  isAdmin: false,
  country: 'السعودية',
  location: 'الرياض',
  files: [
    { id: 'file-1', name: 'مواصفات_الأجهزة.pdf', type: 'pdf', size: '1.2MB' },
    { id: 'file-2', name: 'عقد_الشراء.docx', type: 'docx', size: '540KB' }
  ],
  timeline: [
    { id: 1, title: 'إنشاء المجموعة', date: '10 أبريل 2025', completed: true },
    { id: 2, title: 'استقبال العروض', date: '25 أبريل 2025', completed: true },
    { id: 3, title: 'تقييم العروض والتصويت', date: '5 مايو 2025', completed: false, current: true },
    { id: 4, title: 'توقيع العقد', date: '20 مايو 2025', completed: false },
    { id: 5, title: 'استلام المنتجات', date: '15 يونيو 2025', completed: false }
  ],
  suppliers: [
    { id: 's1', name: 'شركة العالمية للإلكترونيات', offer: '115,000 ريال', rating: 4.8 },
    { id: 's2', name: 'مؤسسة التقنية الذكية', offer: '118,000 ريال', rating: 4.6 }
  ],
  supportsVoting: true,
  votingSystem: 'loomio'
};

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [isJoining, setIsJoining] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  
  const handleJoinGroup = () => {
    setIsJoining(true);
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      setIsJoined(true);
    }, 1000);
  };
  
  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Hero section */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-300"></div>
          <CardHeader className="pb-2">
            <div className="flex flex-wrap justify-between gap-4 items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>
                    {groupData.type === 'buying' && 'شراء جماعي'}
                  </Badge>
                  <Badge variant="outline">{groupData.country}</Badge>
                </div>
                <CardTitle className="text-2xl mb-1">{groupData.title}</CardTitle>
                <CardDescription className="text-sm">
                  أنشئت بواسطة: {groupData.creator} • {groupData.createdAt}
                </CardDescription>
              </div>
              <div className="flex gap-3">
                {isJoined ? (
                  <Button variant="outline" className="flex gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" /> 
                    تم الانضمام
                  </Button>
                ) : (
                  <Button onClick={handleJoinGroup} disabled={isJoining}>
                    {isJoining ? 'جاري التنفيذ...' : 'انضم للمجموعة'}
                  </Button>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      مشاركة
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>مشاركة المجموعة</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      <p className="text-muted-foreground">يمكنك مشاركة رابط هذه المجموعة مع الآخرين:</p>
                      <div className="flex mt-4">
                        <Input 
                          readOnly 
                          value={`https://gpo.platform/groups/${groupId}`} 
                          className="rounded-r-none"
                        />
                        <Button className="rounded-l-none">نسخ</Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{groupData.description}</p>
            
            {/* Progress section */}
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">تقدم المشروع</span>
                <span className="text-sm text-muted-foreground">{groupData.progress}%</span>
              </div>
              <Progress value={groupData.progress} className="h-2" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">تاريخ الاستحقاق</p>
                  <p className="font-medium">{groupData.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">الأعضاء</p>
                  <p className="font-medium">{groupData.members} عضو</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">القيمة الإجمالية</p>
                  <p className="font-medium">{groupData.groupValue}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1 hidden sm:block" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs sm:text-sm">
              <Users className="h-4 w-4 mr-1 hidden sm:block" />
              الأعضاء
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="text-xs sm:text-sm">
              <Briefcase className="h-4 w-4 mr-1 hidden sm:block" />
              العروض
            </TabsTrigger>
            <TabsTrigger value="voting" className="text-xs sm:text-sm">
              <ThumbsUp className="h-4 w-4 mr-1 hidden sm:block" />
              التصويت
            </TabsTrigger>
            <TabsTrigger value="files" className="text-xs sm:text-sm">
              <FileCheck className="h-4 w-4 mr-1 hidden sm:block" />
              الملفات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">جدول الزمني للمشروع</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-muted">
                  {groupData.timeline.map((item, index) => (
                    <li className="mb-6 ml-4" key={item.id}>
                      <div className={`absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border ${
                        item.completed ? 'bg-green-500 border-green-500' : 
                        item.current ? 'bg-blue-500 border-blue-500' : 
                        'bg-muted border-muted'
                      }`}></div>
                      <div className="flex items-start">
                        <div>
                          <h3 className={`font-medium flex items-center ${
                            item.completed ? 'text-green-600' : 
                            item.current ? 'text-blue-600' : 
                            'text-muted-foreground'
                          }`}>
                            {item.title}
                            {item.completed && <CheckCircle className="h-4 w-4 ml-2" />}
                            {item.current && <Clock className="h-4 w-4 ml-2" />}
                          </h3>
                          <time className="block text-sm text-muted-foreground">
                            {item.date}
                          </time>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="members" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">أعضاء المجموعة</CardTitle>
                <CardDescription>الأعضاء المشاركين في هذه المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Sample members content would go here */}
                <p>قائمة الأعضاء سيتم عرضها هنا</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suppliers" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">العروض المقدمة</CardTitle>
                  <CardDescription>عروض الموردين للمنتجات المطلوبة</CardDescription>
                </div>
                <Button>تقديم عرض جديد</Button>
              </CardHeader>
              <CardContent>
                {groupData.suppliers.map(supplier => (
                  <Card key={supplier.id} className="mb-4 overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{supplier.name}</CardTitle>
                        <Badge variant="outline">{supplier.rating} ★</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">قيمة العرض</p>
                          <p className="font-medium text-lg">{supplier.offer}</p>
                        </div>
                        <Button size="sm">
                          تفاصيل العرض
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="voting" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">التصويت على القرارات</CardTitle>
                <CardDescription>صوت على القرارات المتاحة في هذه المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                {groupData.supportsVoting && (
                  groupData.votingSystem === 'loomio' ? (
                    <LoomioVoting />
                  ) : (
                    <SnapshotVoting />
                  )
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="files" className="mt-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">الملفات والمستندات</CardTitle>
                <CardDescription>المستندات المرفقة بهذه المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groupData.files.map(file => (
                    <div key={file.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-md hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center">
                        <div className="mr-3 bg-primary/10 text-primary p-2 rounded">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">تنزيل</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

// A simple Input component for the copy functionality
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default GroupDetails;
