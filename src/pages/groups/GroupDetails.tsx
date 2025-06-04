import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  Vote, 
  Upload,
  Calendar,
  DollarSign,
  Target,
  MessageSquare
} from 'lucide-react';
import ContractNegotiationPanel from '@/components/contracts/ContractNegotiationPanel';
import SnapDAOIntegration from '@/components/dao/SnapDAOIntegration';
import ContractManagement from '@/components/groups/contract/ContractManagement';

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من API
  const groupData = {
    id: id,
    name: 'مجموعة شراء الإلكترونيات',
    type: 'buying',
    status: 'active',
    description: 'مجموعة لشراء الأجهزة الإلكترونية بأسعار مخفضة من خلال الشراء الجماعي',
    targetAmount: 50000,
    currentAmount: 35000,
    membersCount: 23,
    deadline: '2024-02-15',
    category: 'الإلكترونيات',
    createdDate: '2024-01-01'
  };

  const members = [
    { id: 1, name: 'أحمد محمد', role: 'منشئ المجموعة', joinDate: '2024-01-01', contribution: 5000 },
    { id: 2, name: 'فاطمة علي', role: 'عضو', joinDate: '2024-01-05', contribution: 3000 },
    { id: 3, name: 'خالد أحمد', role: 'عضو', joinDate: '2024-01-08', contribution: 2500 },
    // ... المزيد من الأعضاء
  ];

  const offers = [
    {
      id: 1,
      supplier: 'شركة التقنية المتقدمة',
      product: 'أجهزة لابتوب HP - 10 قطع',
      price: 25000,
      status: 'pending',
      deliveryTime: '14 يوم',
      warranty: 'سنتان'
    },
    {
      id: 2,
      supplier: 'مؤسسة الإلكترونيات الحديثة',
      product: 'أجهزة لابتوب Dell - 10 قطع',
      price: 28000,
      status: 'approved',
      deliveryTime: '10 أيام',
      warranty: 'سنة واحدة'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = (groupData.currentAmount / groupData.targetAmount) * 100;

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Group Header */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{groupData.name}</h1>
                  <Badge className={getStatusColor(groupData.status)}>
                    {groupData.status === 'active' ? 'نشطة' : 'منتهية'}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{groupData.description}</p>
              </div>
              <div className="flex gap-2">
                <Button>انضمام للمجموعة</Button>
                <Button variant="outline">مشاركة</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-2xl font-bold">{groupData.membersCount}</span>
                </div>
                <p className="text-sm text-muted-foreground">عضو</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-2xl font-bold">{groupData.currentAmount.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground">ر.س مجمع</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
                  <Target className="h-4 w-4" />
                  <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                </div>
                <p className="text-sm text-muted-foreground">مكتمل</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-2xl font-bold">12</span>
                </div>
                <p className="text-sm text-muted-foreground">يوم متبقي</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>التقدم: {groupData.currentAmount.toLocaleString()} / {groupData.targetAmount.toLocaleString()} ر.س</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="members">الأعضاء</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="contract">العقد</TabsTrigger>
            <TabsTrigger value="voting">التصويت</TabsTrigger>
            <TabsTrigger value="chat">النقاش</TabsTrigger>
            <TabsTrigger value="files">الملفات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل المجموعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium">النوع: </span>
                    <span>شراء تعاوني</span>
                  </div>
                  <div>
                    <span className="font-medium">الفئة: </span>
                    <span>{groupData.category}</span>
                  </div>
                  <div>
                    <span className="font-medium">تاريخ الإنشاء: </span>
                    <span>{groupData.createdDate}</span>
                  </div>
                  <div>
                    <span className="font-medium">الموعد النهائي: </span>
                    <span>{groupData.deadline}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>آخر التحديثات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <p className="text-sm font-medium">انضمام عضو جديد</p>
                      <p className="text-xs text-muted-foreground">منذ ساعتين</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-sm font-medium">وصول عرض جديد من مورد</p>
                      <p className="text-xs text-muted-foreground">منذ 5 ساعات</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <p className="text-sm font-medium">بدء التصويت على العرض</p>
                      <p className="text-xs text-muted-foreground">منذ يوم واحد</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  أعضاء المجموعة ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{member.contribution.toLocaleString()} ر.س</p>
                        <p className="text-sm text-muted-foreground">انضم في {member.joinDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  عروض الموردين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {offers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{offer.product}</h4>
                          <p className="text-sm text-muted-foreground">{offer.supplier}</p>
                        </div>
                        <Badge className={getStatusColor(offer.status)}>
                          {offer.status === 'pending' ? 'قيد المراجعة' : 'موافق عليه'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">السعر: </span>
                          <span>{offer.price.toLocaleString()} ر.س</span>
                        </div>
                        <div>
                          <span className="font-medium">التسليم: </span>
                          <span>{offer.deliveryTime}</span>
                        </div>
                        <div>
                          <span className="font-medium">الضمان: </span>
                          <span>{offer.warranty}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm">قبول العرض</Button>
                        <Button size="sm" variant="outline">طلب تفاوض</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contract" className="space-y-4">
            <ContractManagement groupId={id!} />
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <SnapDAOIntegration />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  نقاش المجموعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">نقاش تفاعلي</h3>
                  <p className="text-muted-foreground mb-4">
                    منصة نقاش متقدمة مدعومة بـ Loomio للحوار البناء
                  </p>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    بدء النقاش
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  الملفات والوثائق
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">اسحب الملفات هنا أو اضغط للتحميل</p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    تحميل ملف
                  </Button>
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">الملفات المحملة:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>مواصفات المنتج.pdf</span>
                      </div>
                      <Button size="sm" variant="outline">تحميل</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>شروط التسليم.docx</span>
                      </div>
                      <Button size="sm" variant="outline">تحميل</Button>
                    </div>
                  </div>
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
