import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Users, CheckCircle, FileText, Vote, MessageSquare, Clock, UploadCloud } from 'lucide-react';

// Sample group data (in a real app, would be fetched based on groupId)
const groupData = {
  id: 'group-1',
  title: 'مجموعة شراء إلكترونيات',
  type: 'buying',
  status: 'active',
  description: 'مجموعة لشراء أجهزة إلكترونية بكميات كبيرة للحصول على خصم. تهدف المجموعة للتفاوض مع الموردين للحصول على أفضل الأسعار والشروط.',
  members: [
    { id: 'user1', name: 'أحمد محمد', role: 'admin', avatar: '' },
    { id: 'user2', name: 'سارة خالد', role: 'member', avatar: '' },
    { id: 'user3', name: 'محمد علي', role: 'member', avatar: '' },
  ],
  offers: [
    { id: 'offer1', supplier: 'شركة التقنية الحديثة', amount: 12000, status: 'pending' },
    { id: 'offer2', supplier: 'متجر الإلكترونيات', amount: 13500, status: 'rejected' },
  ],
  applications: [],
  votes: [
    { id: 'vote1', title: 'قبول عرض شركة التقنية الحديثة', approved: 2, rejected: 1, total: 3, deadline: '2025-05-25' }
  ],
  contract: null,
  files: [
    { id: 'file1', name: 'مواصفات المنتجات.pdf', type: 'pdf', uploadedBy: 'أحمد محمد', date: '2025-05-02' },
  ],
  timeline: [
    { id: 'event1', title: 'إنشاء المجموعة', date: '2025-05-01', type: 'create' },
    { id: 'event2', title: 'انضمام عضوين جدد', date: '2025-05-02', type: 'join' },
    { id: 'event3', title: 'استلام عرضين', date: '2025-05-10', type: 'offers' },
    { id: 'event4', title: 'بدء تصويت على العرض', date: '2025-05-15', type: 'vote' },
  ]
};

const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">{groupData.title}</h1>
              <Badge>{groupData.status === 'active' ? 'نشطة' : 'معلقة'}</Badge>
            </div>
            <p className="text-muted-foreground mt-2">
              {groupData.description.substring(0, 100)}...
            </p>
          </div>
          
          <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                الانضمام للمجموعة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>الانضمام للمجموعة</DialogTitle>
                <DialogDescription>
                  يرجى كتابة سبب رغبتك في الانضمام لهذه المجموعة
                </DialogDescription>
              </DialogHeader>
              <Textarea 
                placeholder="اكتب هنا سبب رغبتك في الانضمام..."
                className="min-h-[100px]"
                dir="rtl"
              />
              <DialogFooter>
                <Button type="submit">إرسال طلب الانضمام</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="border rounded-md">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex overflow-auto border-b bg-background">
              <TabsTrigger value="overview" className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>نظرة عامة</span>
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>الأعضاء</span>
              </TabsTrigger>
              <TabsTrigger value="offers" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>عروض الموردين</span>
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>طلبات المستقلين</span>
              </TabsTrigger>
              <TabsTrigger value="voting" className="flex items-center">
                <Vote className="h-4 w-4 mr-2" />
                <span>التصويت</span>
              </TabsTrigger>
              <TabsTrigger value="contract" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>العقد</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center">
                <UploadCloud className="h-4 w-4 mr-2" />
                <span>الملفات والإثباتات</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="p-4">
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">مسار المجموعة</h3>
                  <div className="space-y-4">
                    {groupData.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            {index + 1}
                          </div>
                          {index < groupData.timeline.length - 1 && (
                            <div className="w-0.5 bg-border h-full mt-2" />
                          )}
                        </div>
                        <div className="pt-1">
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{event.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
              
              {/* Members Tab */}
              <TabsContent value="members">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">أعضاء المجموعة ({groupData.members.length})</h3>
                  <div className="space-y-4">
                    {groupData.members.map(member => (
                      <div key={member.id} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.role === 'admin' ? 'مسؤول المجموعة' : 'عضو'}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">رسالة</Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      دعوة أعضاء جدد
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Other tab contents would follow the same pattern */}
              <TabsContent value="offers">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">عروض الموردين ({groupData.offers.length})</h3>
                  {groupData.offers.map(offer => (
                    <div key={offer.id} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{offer.supplier}</h4>
                        <Badge variant={offer.status === 'pending' ? 'outline' : 'secondary'}>
                          {offer.status === 'pending' ? 'قيد المراجعة' : 'مرفوض'}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold">{offer.amount} ريال</p>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">تفاصيل</Button>
                        <Button size="sm">مناقشة العرض</Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">
                    إضافة عرض جديد
                  </Button>
                </Card>
              </TabsContent>
              
              {/* Placeholder for other tabs */}
              <TabsContent value="applications">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">طلبات المستقلين</h3>
                  <p className="text-muted-foreground">لا توجد طلبات حالية</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="voting">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">التصويتات الحالية</h3>
                  {groupData.votes.map(vote => (
                    <div key={vote.id} className="border rounded-md p-4">
                      <h4 className="font-medium mb-2">{vote.title}</h4>
                      <div className="flex justify-between text-sm mb-1">
                        <span>التقدم: {vote.approved}/{vote.total} صوت</span>
                        <span>الموعد النهائي: {vote.deadline}</span>
                      </div>
                      <Progress value={(vote.approved / vote.total) * 100} className="h-2 mb-4" />
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm">رفض</Button>
                        <Button size="sm">موافقة</Button>
                      </div>
                    </div>
                  ))}
                </Card>
              </TabsContent>
              
              <TabsContent value="contract">
                <Card className="p-6 text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">لم يتم إنشاء عقد بعد</h3>
                  <p className="text-muted-foreground mb-6">سيتم إنشاء العقد تلقائيًا بعد الموافقة على العروض</p>
                </Card>
              </TabsContent>
              
              <TabsContent value="files">
                <Card className="p-6">
                  <h3 className="text-lg font-medium mb-4">الملفات والإثباتات</h3>
                  {groupData.files.map(file => (
                    <div key={file.id} className="border rounded-md p-4 mb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">تم الرفع بواسطة {file.uploadedBy} • {file.date}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">تحميل</Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    <UploadCloud className="h-4 w-4 mr-2" />
                    رفع ملف جديد
                  </Button>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default GroupDetails;
