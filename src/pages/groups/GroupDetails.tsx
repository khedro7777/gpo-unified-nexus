
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Vote, 
  Gavel, 
  Brain,
  Eye,
  Crown,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Send,
  UserPlus,
  Settings,
  Star,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface GroupMember {
  id: string;
  name: string;
  role: 'founder' | 'admin' | 'member';
  joinedAt: string;
  isActive: boolean;
  avatar?: string;
}

interface SupplierOffer {
  id: string;
  supplierName: string;
  title: string;
  price: number;
  deliveryTime: string;
  validUntil: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  attachments?: string[];
}

interface Vote {
  id: string;
  title: string;
  description: string;
  options: { id: string; text: string; votes: number }[];
  deadline: string;
  status: 'active' | 'completed';
  userVoted: boolean;
}

const GroupDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userRole, setUserRole] = useState<'founder' | 'admin' | 'member'>('member');
  const [isGroupMember, setIsGroupMember] = useState(true);

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const groupData = {
    id: id || '1',
    name: 'مجموعة شراء أجهزة الكمبيوتر المحمولة',
    type: 'buying',
    country: 'السعودية',
    sector: 'تكنولوجيا',
    description: 'مجموعة لشراء أجهزة كمبيوتر محمولة عالية الجودة للشركات الناشئة والمستقلين بأسعار الجملة',
    phase: 'negotiation' as const,
    status: 'active',
    progress: 65,
    members: 24,
    maxMembers: 50,
    createdAt: '2024-01-15',
    requirements: [
      'معالج Intel Core i7 أو أحدث',
      'ذاكرة RAM 16GB على الأقل',
      'قرص SSD 512GB',
      'ضمان لمدة سنتين كامل'
    ],
    attachments: [
      { name: 'مواصفات_المطلوبة.pdf', size: '2.1 MB' },
      { name: 'شروط_التعاقد.docx', size: '450 KB' }
    ]
  };

  const members: GroupMember[] = [
    { id: '1', name: 'أحمد محمد', role: 'founder', joinedAt: '2024-01-15', isActive: true },
    { id: '2', name: 'سارة أحمد', role: 'admin', joinedAt: '2024-01-16', isActive: true },
    { id: '3', name: 'محمد علي', role: 'admin', joinedAt: '2024-01-17', isActive: true },
    { id: '4', name: 'فاطمة خالد', role: 'admin', joinedAt: '2024-01-18', isActive: true },
    { id: '5', name: 'عبدالله حسن', role: 'member', joinedAt: '2024-01-19', isActive: true },
  ];

  const offers: SupplierOffer[] = [
    {
      id: '1',
      supplierName: 'شركة التقنية المتقدمة',
      title: 'عرض أجهزة Dell Latitude',
      price: 45000,
      deliveryTime: '14 يوم',
      validUntil: '2024-02-15',
      description: 'أجهزة Dell Latitude 7420 بالمواصفات المطلوبة مع ضمان 3 سنوات',
      status: 'approved'
    },
    {
      id: '2',
      supplierName: 'مؤسسة الإلكترونيات الحديثة',
      title: 'عرض أجهزة HP EliteBook',
      price: 42000,
      deliveryTime: '10 أيام',
      validUntil: '2024-02-20',
      description: 'أجهزة HP EliteBook 840 G8 مع خدمات صيانة مجانية',
      status: 'pending'
    }
  ];

  const activeVotes: Vote[] = [
    {
      id: '1',
      title: 'اختيار أفضل عرض للموردين',
      description: 'التصويت على أفضل عرض من العروض المقدمة من الموردين',
      options: [
        { id: '1', text: 'شركة التقنية المتقدمة - 45,000 ريال', votes: 12 },
        { id: '2', text: 'مؤسسة الإلكترونيات الحديثة - 42,000 ريال', votes: 8 },
        { id: '3', text: 'رفض جميع العروض والبحث عن بديل', votes: 2 }
      ],
      deadline: '2024-02-10',
      status: 'active',
      userVoted: false
    }
  ];

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'founding': return 'التأسيس';
      case 'admin_election': return 'انتخاب المديرين';
      case 'negotiation': return 'التفاوض';
      case 'voting': return 'التصويت';
      case 'contracting': return 'العقود';
      case 'completed': return 'مكتملة';
      default: return phase;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founder': return <Crown className="h-4 w-4 text-purple-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'founder':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">مؤسس</Badge>;
      case 'admin':
        return <Badge variant="default" className="bg-blue-500">مدير</Badge>;
      default:
        return <Badge variant="outline">عضو</Badge>;
    }
  };

  const AdminControls = () => {
    if (userRole !== 'admin' && userRole !== 'founder') return null;

    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Shield className="h-5 w-5" />
            لوحة التحكم الإدارية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              موافقة الأعضاء
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              إدارة العروض
            </Button>
            <Button variant="outline" size="sm">
              <Vote className="h-4 w-4 mr-2" />
              بدء تصويت
            </Button>
            <Button variant="outline" size="sm">
              <Send className="h-4 w-4 mr-2" />
              إرسال إشعار
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <NewMainLayout>
      <div className="space-y-8">
        {/* Header */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant="default" className="bg-green-500">
                    {getPhaseText(groupData.phase)}
                  </Badge>
                  <Badge variant="outline">{groupData.country}</Badge>
                  <Badge variant="outline">{groupData.sector}</Badge>
                </div>
                
                <CardTitle className="text-2xl lg:text-3xl mb-3">
                  {groupData.name}
                </CardTitle>
                
                <CardDescription className="text-base leading-relaxed">
                  {groupData.description}
                </CardDescription>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{groupData.members}/{groupData.maxMembers} عضو</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    رسالة للمجموعة
                  </Button>
                  <Button>
                    <Eye className="h-4 w-4 mr-2" />
                    دخول المجموعة
                  </Button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>تقدم المجموعة</span>
                <span className="font-medium">{groupData.progress}%</span>
              </div>
              <Progress value={groupData.progress} className="h-3" />
            </div>
          </CardHeader>
        </Card>

        {/* Admin Controls */}
        <AdminControls />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-12">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="contract">العقد</TabsTrigger>
            <TabsTrigger value="orda">ORDA</TabsTrigger>
            <TabsTrigger value="mcp">MCP</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>متطلبات المجموعة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {groupData.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المرفقات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {groupData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">أعضاء المجموعة ({members.length})</h3>
              {(userRole === 'admin' || userRole === 'founder') && (
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  دعوة عضو جديد
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="font-medium">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-xs text-gray-500">انضم في {member.joinedAt}</p>
                        </div>
                      </div>
                      {getRoleIcon(member.role)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {getRoleBadge(member.role)}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">عروض الموردين ({offers.length})</h3>
              {(userRole === 'admin' || userRole === 'founder') && (
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  طلب عروض جديدة
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {offers.map((offer) => (
                <Card key={offer.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="font-semibold text-lg">{offer.title}</h4>
                          <Badge variant={offer.status === 'approved' ? 'default' : 'secondary'}>
                            {offer.status === 'approved' ? 'موافق عليه' : 'قيد المراجعة'}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{offer.supplierName}</p>
                        <p className="text-sm mb-4">{offer.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">السعر:</span>
                            <p className="font-medium">{offer.price.toLocaleString()} ريال</p>
                          </div>
                          <div>
                            <span className="text-gray-500">التسليم:</span>
                            <p className="font-medium">{offer.deliveryTime}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">صالح حتى:</span>
                            <p className="font-medium">{offer.validUntil}</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {offer.status === 'approved' && (
                        <div className="text-right">
                          <Star className="h-5 w-5 text-yellow-500 mb-2" />
                          <p className="text-sm text-green-600 font-medium">العرض المختار</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Voting Tab */}
          <TabsContent value="voting" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">التصويتات النشطة</h3>
              {(userRole === 'admin' || userRole === 'founder') && (
                <Button>
                  <Vote className="h-4 w-4 mr-2" />
                  إنشاء تصويت جديد
                </Button>
              )}
            </div>

            {activeVotes.map((vote) => (
              <Card key={vote.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{vote.title}</CardTitle>
                      <CardDescription className="mt-2">{vote.description}</CardDescription>
                    </div>
                    <Badge variant={vote.status === 'active' ? 'default' : 'secondary'}>
                      {vote.status === 'active' ? 'نشط' : 'مكتمل'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vote.options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium mb-1">{option.text}</p>
                          <div className="flex items-center gap-2">
                            <Progress value={(option.votes / 24) * 100} className="flex-1 h-2" />
                            <span className="text-sm text-gray-600">{option.votes} صوت</span>
                          </div>
                        </div>
                        {!vote.userVoted && vote.status === 'active' && (
                          <Button variant="outline" size="sm" className="mr-4">
                            اختيار
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>ينتهي في: {vote.deadline}</span>
                      </div>
                      {vote.userVoted && (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>تم التصويت</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Contract Tab */}
          <TabsContent value="contract" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  عقد المجموعة
                </CardTitle>
                <CardDescription>
                  الاتفاقية النهائية والشروط والأحكام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">مسودة العقد</h4>
                      <p className="text-sm text-gray-600">آخر تحديث: 2024-02-01</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        تحميل
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        معاينة
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">حالة التوقيعات</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>الأعضاء الموافقين</span>
                        <span>18/24</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORDA Tab */}
          <TabsContent value="orda" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  نظام التحكيم ORDA
                </CardTitle>
                <CardDescription>
                  تقديم طلبات التحكيم وحل النزاعات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Gavel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium mb-2">لا توجد نزاعات نشطة</h3>
                  <p className="text-gray-600 mb-4">
                    يمكنك تقديم طلب تحكيم في حالة وجود نزاع مع أحد الأعضاء أو الموردين
                  </p>
                  <Button variant="outline">
                    <Gavel className="h-4 w-4 mr-2" />
                    تقديم طلب تحكيم
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MCP Tab */}
          <TabsContent value="mcp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  التحليل الذكي MCP
                </CardTitle>
                <CardDescription>
                  مساعد ذكي لتحليل البيانات والمساعدة في اتخاذ القرارات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">توصيات ذكية</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• عرض "مؤسسة الإلكترونيات الحديثة" يقدم أفضل قيمة مقابل السعر</li>
                      <li>• يُنصح بالتفاوض على فترة ضمان أطول</li>
                      <li>• 87% من المجموعات المشابهة اختارت عروض مماثلة</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-2">تحذيرات</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• انتباه: موعد انتهاء التصويت خلال 3 أيام</li>
                      <li>• يُنصح بمراجعة شروط التسليم بعناية</li>
                    </ul>
                  </div>
                  
                  <Button className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    طلب تحليل مفصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default GroupDetails;
