
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
import { 
  ArrowLeft, Users, Check, Clock, FileText, Info, UserPlus, 
  Vote, Shield, MessageCircle, FileUp, Settings, StarIcon
} from 'lucide-react';
import GroupRounds from '@/components/groups/GroupRounds';
import { useToast } from '@/hooks/use-toast';

// Model data for groups
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
    groupType: 'dao',
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
      },
      {
        id: 4,
        type: 'contract',
        title: 'توقيع عقد',
        description: 'تم توقيع العقد وحفظه على IPFS',
        date: '2025-05-08'
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
    ],
    ipfsHash: 'Qm1234567890abcdef1234567890abcdef1234567890abcdef'
  },
  {
    id: 'group-marketing-campaign',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    category: 'collective',
    groupType: 'dao',
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
    currentProposals: [],
    ipfsHash: 'Qm9876543210fedcba9876543210fedcba9876543210fedcba'
  },
  {
    id: 'solo-freelancer-web',
    title: 'خدمات تطوير الويب',
    type: 'freelancers',
    category: 'individual',
    groupType: 'solo',
    members: 1,
    country: 'الإمارات',
    votesRequired: 0,
    votesReceived: 0,
    daysLeft: 0,
    description: 'خدمات تطوير مواقع الويب والتطبيقات للشركات الصغيرة والمتوسطة',
    createdAt: '2025-05-05',
    endDate: '',
    status: 'active',
    admin: 'محمد علي',
    requirements: [],
    goals: [
      'تقديم خدمات تطوير الويب عالية الجودة',
      'بناء محفظة مشاريع متنوعة',
      'تكوين علاقات عمل طويلة الأمد مع العملاء'
    ],
    recentActivities: [
      {
        id: 1,
        type: 'contract',
        title: 'عقد جديد',
        description: 'تم الحصول على مشروع جديد لتطوير موقع إلكتروني',
        date: '2025-05-18'
      }
    ],
    activeMembers: [
      { id: 1, name: 'محمد علي', avatar: '', role: 'مستقل' }
    ],
    currentProposals: [],
    skills: [
      'React', 'Node.js', 'TypeScript', 'UI/UX Design'
    ],
    completedProjects: 12,
    rating: 4.8
  }
];

const GroupDetails: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [activeTab, setActiveTab] = useState<'info' | 'members' | 'proposals' | 'activities' | 'rounds'>('info');
  const { toast } = useToast();
  
  // Find the group by ID
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
  
  const votingProgress = group.votesRequired > 0 ? (group.votesReceived / group.votesRequired) * 100 : 100;
  
  const handleJoinRequest = () => {
    toast({
      title: "تم إرسال طلب الانضمام",
      description: "سيتم إشعارك عند قبول طلبك",
    });
  };

  const handleContactAdmin = () => {
    toast({
      title: "تم إرسال رسالة",
      description: "تم إرسال رسالتك إلى مسؤول المجموعة",
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/"><ArrowLeft className="h-4 w-4" /> رجوع</Link>
              </Button>
              <Badge variant={group.category === 'collective' ? 'default' : 'secondary'} className="mr-2">
                {group.category === 'collective' ? 'جماعي' : 'فردي'}
              </Badge>
              {group.groupType === 'dao' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">DAO</Badge>
              )}
              {group.groupType === 'solo' && (
                <Badge variant="outline">فردي</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mt-2">{group.title}</h1>
            <p className="text-muted-foreground mt-1">{group.description}</p>
            
            {group.groupType === 'solo' && group.skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {group.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">{skill}</Badge>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {group.groupType === 'dao' && group.daysLeft > 0 && (
              <Button variant="outline" onClick={handleJoinRequest}>
                <UserPlus className="h-4 w-4 ml-2" /> طلب انضمام
              </Button>
            )}
            <Button onClick={handleContactAdmin}>
              <MessageCircle className="h-4 w-4 ml-2" /> تواصل مع المسؤول
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
                  <Shield className="h-5 w-5 ml-2 text-primary" /> {group.admin}
                </span>
              </div>
              
              {group.groupType === 'dao' ? (
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
              ) : (
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">التقييم</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-semibold mr-2">{group.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-5 w-5 ${i < Math.floor(group.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {group.ipfsHash && (
              <div className="mt-6 p-2 bg-muted/30 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileUp className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">تم توثيق العقد على IPFS</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">{group.ipfsHash.substring(0, 20)}...</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="info">معلومات المجموعة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="proposals">المقترحات والتصويت</TabsTrigger>
            <TabsTrigger value="rounds">جولات المجموعة</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            {group.groupType === 'dao' && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>متطلبات الانضمام</CardTitle>
                    <CardDescription>الشروط الواجب توافرها للانضمام إلى المجموعة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {group.requirements && group.requirements.length > 0 ? (
                      <ul className="space-y-2">
                        {group.requirements.map((req, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-primary ml-2" /> {req}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">لا توجد متطلبات خاصة للانضمام</p>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
            
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
            
            {group.groupType === 'dao' ? (
              group.daysLeft > 0 ? (
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
              )
            ) : (
              group.completedProjects && (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>مزود خدمة موثوق</AlertTitle>
                  <AlertDescription>
                    أكمل هذا المستقل {group.completedProjects} مشروعًا بنجاح، بمعدل تقييم {group.rating} من 5.
                  </AlertDescription>
                </Alert>
              )
            )}
            
            <div className="flex justify-between gap-4">
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/">رجوع</Link>
              </Button>
              {group.groupType === 'dao' && group.daysLeft > 0 ? (
                <Button className="flex-1" onClick={handleJoinRequest}>
                  انضم للمجموعة
                </Button>
              ) : group.groupType === 'dao' ? (
                <Button className="flex-1" disabled>
                  اكتمل التصويت
                </Button>
              ) : (
                <Button className="flex-1">
                  طلب خدمة
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
                {group.groupType === 'dao' && group.daysLeft > 0 && (
                  <Button onClick={handleJoinRequest}>
                    <UserPlus className="h-4 w-4 ml-2" /> طلب انضمام
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="proposals">
            <div className="space-y-6">
              {group.groupType === 'dao' && group.currentProposals && group.currentProposals.length > 0 ? (
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
                  <p className="text-sm text-muted-foreground mb-6">
                    {group.groupType === 'dao' ? 
                      "لا توجد مقترحات قيد التصويت حالياً لهذه المجموعة" : 
                      "المجموعات الفردية لا تتطلب مقترحات للتصويت"}
                  </p>
                  {group.groupType === 'dao' && group.daysLeft > 0 && (
                    <Button>
                      إنشاء مقترح جديد
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rounds">
            {group.id && <GroupRounds groupId={group.id} />}
          </TabsContent>
          
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>آخر الأنشطة</CardTitle>
                <CardDescription>سجل أنشطة المجموعة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.recentActivities && group.recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <div className={`rounded-full p-2 ${
                        activity.type === 'vote' ? 'bg-blue-100' : 
                        activity.type === 'member' ? 'bg-green-100' : 
                        activity.type === 'contract' ? 'bg-yellow-100' :
                        'bg-purple-100'
                      }`}>
                        {activity.type === 'vote' ? 
                          <Vote className="h-5 w-5 text-blue-600" /> : 
                          activity.type === 'member' ? 
                            <UserPlus className="h-5 w-5 text-green-600" /> : 
                            activity.type === 'contract' ? 
                              <FileUp className="h-5 w-5 text-yellow-600" /> :
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
