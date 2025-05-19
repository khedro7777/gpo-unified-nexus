
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Users, Check, Clock, FileText, Info, UserPlus, Vote } from 'lucide-react';

// نموذج بيانات للمجموعات النشطة - نفس البيانات من المكون السابق مع بيانات إضافية
const groupsData = [
  {
    id: 'group-purchase-electronics',
    title: 'مجموعة شراء الإلكترونيات',
    type: 'purchasing',
    category: 'collective',
    members: 28,
    country: 'السعودية',
    votesRequired: 15,
    votesReceived: 12,
    daysLeft: 5,
    description: 'مجموعة تعاونية لشراء أجهزة إلكترونية بكميات كبيرة للحصول على أسعار تفضيلية',
    createdAt: '2025-05-01',
    endDate: '2025-06-15',
    status: 'active',
    admin: 'أحمد محمد',
    requirements: [
      'عضوية في الغرفة التجارية',
      'سجل تجاري ساري المفعول',
      'خبرة سابقة في مجال الإلكترونيات',
      'القدرة على المساهمة بمبلغ لا يقل عن 10,000 ر.س'
    ],
    goals: [
      'الحصول على أسعار تفضيلية من خلال زيادة كمية الطلب',
      'توحيد المواصفات الفنية للأجهزة المطلوبة',
      'تقليل تكاليف الشحن والتخليص الجمركي'
    ],
    recentActivities: [
      {
        id: 1,
        type: 'vote',
        title: 'تصويت على مورد جديد',
        description: 'تم إضافة مورد جديد للتصويت',
        date: '2025-05-15'
      },
      {
        id: 2,
        type: 'member',
        title: 'انضمام عضو جديد',
        description: 'انضمام شركة النور للتقنية إلى المجموعة',
        date: '2025-05-12'
      },
      {
        id: 3,
        type: 'proposal',
        title: 'اقتراح جديد',
        description: 'تم تقديم اقتراح لإضافة أجهزة جديدة إلى قائمة المشتريات',
        date: '2025-05-10'
      }
    ],
    activeMembers: [
      { id: 1, name: 'شركة الأفق للتقنية', avatar: '', role: 'مؤسس' },
      { id: 2, name: 'مؤسسة التقنية الحديثة', avatar: '', role: 'عضو' },
      { id: 3, name: 'شركة النور للتجارة', avatar: '', role: 'عضو' },
      { id: 4, name: 'مؤسسة الابتكار', avatar: '', role: 'عضو' }
    ],
    currentProposals: [
      {
        id: 1,
        title: 'اختيار المورد الرئيسي',
        description: 'التصويت على اختيار المورد الرئيسي للأجهزة الإلكترونية',
        endDate: '2025-05-25',
        votesReceived: 10,
        votesRequired: 15
      },
      {
        id: 2,
        title: 'إضافة أجهزة لوحية',
        description: 'التصويت على إضافة أجهزة لوحية إلى قائمة المشتريات',
        endDate: '2025-05-28',
        votesReceived: 8,
        votesRequired: 15
      }
    ]
  },
  {
    id: 'group-marketing-campaign',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    category: 'collective',
    members: 12,
    country: 'مصر',
    votesRequired: 8,
    votesReceived: 8,
    daysLeft: 0,
    description: 'حملة تسويقية مشتركة بين عدة شركات في قطاع التجزئة',
    createdAt: '2025-04-15',
    endDate: '2025-05-30',
    status: 'active',
    admin: 'سارة أحمد',
    requirements: [
      'شركة مسجلة في قطاع التجزئة',
      'لديها منتجات تناسب الحملة التسويقية',
      'القدرة على المساهمة بمبلغ لا يقل عن 5,000 ج.م'
    ],
    goals: [
      'زيادة الوعي بالعلامات التجارية المشاركة',
      'خفض تكاليف الحملات الإعلانية من خلال المشاركة',
      'استهداف شريحة أكبر من العملاء'
    ],
    recentActivities: [
      {
        id: 1,
        type: 'vote',
        title: 'اكتمال التصويت',
        description: 'تم اكتمال التصويت على تصميم الحملة',
        date: '2025-05-10'
      }
    ],
    activeMembers: [
      { id: 1, name: 'شركة النيل للتسويق', avatar: '', role: 'مؤسس' },
      { id: 2, name: 'متاجر القاهرة', avatar: '', role: 'عضو' },
      { id: 3, name: 'شركة الإسكندرية للتجزئة', avatar: '', role: 'عضو' }
    ],
    currentProposals: []
  },
  // نضيف باقي البيانات من المجموعات السابقة
];

const GroupDetails: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'info' | 'members' | 'proposals' | 'activities'>('info');
  
  // البحث عن المجموعة المطلوبة باستخدام المعرف
  const group = groupsData.find(g => g.id === groupId);
  
  if (!group) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-semibold mb-4">لم يتم العثور على المجموعة</h2>
          <p className="text-muted-foreground mb-8">المجموعة المطلوبة غير موجودة أو تم حذفها</p>
          <Button asChild>
            <Link to="/"><ArrowLeft className="ml-2 h-4 w-4" /> العودة للصفحة الرئيسية</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  const votingProgress = (group.votesReceived / group.votesRequired) * 100;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/"><ArrowLeft className="h-4 w-4" /> رجوع</Link>
              </Button>
              <Badge variant={group.category === 'collective' ? 'default' : 'secondary'}>
                {group.category === 'collective' ? 'جماعي' : 'فردي'}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mt-2">{group.title}</h1>
            <p className="text-muted-foreground mt-1">{group.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 ml-2" /> طلب انضمام
            </Button>
            <Button>
              <Info className="h-4 w-4 ml-2" /> تواصل مع المسؤول
            </Button>
          </div>
        </div>
      
        <Card>
          <CardHeader>
            <CardTitle>حالة المجموعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">الأعضاء</span>
                <span className="text-2xl font-semibold flex items-center">
                  <Users className="h-5 w-5 ml-2 text-primary" /> {group.members}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">تاريخ الإنشاء</span>
                <span className="text-2xl font-semibold flex items-center">
                  <Clock className="h-5 w-5 ml-2 text-primary" /> {new Date(group.createdAt).toLocaleDateString('ar-SA')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">المسؤول</span>
                <span className="text-2xl font-semibold flex items-center">
                  {group.admin}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">حالة التصويت</span>
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{group.votesReceived}/{group.votesRequired}</span>
                    <span>{group.daysLeft > 0 ? `${group.daysLeft} أيام متبقية` : 'مكتمل'}</span>
                  </div>
                  <Progress value={votingProgress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="info">معلومات المجموعة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="proposals">المقترحات والتصويت</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>متطلبات الانضمام</CardTitle>
                <CardDescription>الشروط الواجب توافرها للانضمام إلى المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {group.requirements.map((req, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary ml-2" /> {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>أهداف المجموعة</CardTitle>
                <CardDescription>الأهداف التي تسعى المجموعة لتحقيقها</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {group.goals.map((goal, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary ml-2" /> {goal}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {group.daysLeft > 0 ? (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>معلومات هامة</AlertTitle>
                <AlertDescription>
                  هذه المجموعة لا تزال في مرحلة جمع الأعضاء والتصويت. يمكنك الانضمام والمشاركة في التصويت قبل {group.daysLeft} أيام.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertTitle>تم اكتمال التصويت</AlertTitle>
                <AlertDescription>
                  اكتمل التصويت المطلوب لهذه المجموعة وهي الآن في مرحلة التنفيذ.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-between gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/">رجوع</Link>
              </Button>
              {group.daysLeft > 0 ? (
                <Button className="flex-1">
                  انضم للمجموعة
                </Button>
              ) : (
                <Button className="flex-1" disabled>
                  اكتمل التصويت
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>أعضاء المجموعة ({group.activeMembers.length})</CardTitle>
                <CardDescription>الأعضاء النشطين في المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.activeMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        عرض الملف
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                {group.daysLeft > 0 && (
                  <Button>
                    <UserPlus className="h-4 w-4 ml-2" /> طلب انضمام
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="proposals">
            <div className="space-y-6">
              {group.currentProposals.length > 0 ? (
                group.currentProposals.map(proposal => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <CardTitle>{proposal.title}</CardTitle>
                      <CardDescription>{proposal.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col">
                        <div className="flex justify-between text-sm mb-1">
                          <span>التصويت: {proposal.votesReceived}/{proposal.votesRequired}</span>
                          <span>ينتهي في: {new Date(proposal.endDate).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <Progress value={(proposal.votesReceived / proposal.votesRequired) * 100} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" className="ml-2">عرض التفاصيل</Button>
                      {group.daysLeft > 0 && (
                        <Button>
                          <Vote className="h-4 w-4 ml-2" /> صوّت
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">لا توجد مقترحات حالية</h3>
                  <p className="text-sm text-muted-foreground mb-6">لا توجد مقترحات قيد التصويت حالياً لهذه المجموعة</p>
                  {group.daysLeft > 0 && (
                    <Button>
                      إنشاء مقترح جديد
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>آخر الأنشطة</CardTitle>
                <CardDescription>سجل أنشطة المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <div className={`rounded-full p-2 ${
                        activity.type === 'vote' ? 'bg-blue-100' : 
                        activity.type === 'member' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'vote' ? 
                          <Vote className="h-5 w-5 text-blue-600" /> : 
                          activity.type === 'member' ? 
                            <UserPlus className="h-5 w-5 text-green-600" /> : 
                            <FileText className="h-5 w-5 text-purple-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString('ar-SA')}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GroupDetails;
